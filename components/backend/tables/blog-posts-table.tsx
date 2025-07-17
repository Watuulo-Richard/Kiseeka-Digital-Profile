'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import clsx from 'clsx';
import {
  Edit,
  FileSpreadsheet,
  Loader2,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { baseUrl, BlogPostCommentTypes } from '@/types/type';
import { BlogPostCategory } from '@prisma/client';

export default function BlogPostsTable({
  title,
  userBlogPosts,
}: {
  title: string;
  userBlogPosts: BlogPostCommentTypes[];
}) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter meals based on search query
  const filteredUserBlogPosts = useMemo(() => {
    if (!searchQuery.trim()) return userBlogPosts;

    const query = searchQuery.toLowerCase();
    return userBlogPosts.filter(
      (blogPost) =>
        blogPost.title.toLowerCase().includes(query) ||
        blogPost.slug.toLowerCase().includes(query) ||
        blogPost.id.toLowerCase().includes(query),
    );
  }, [userBlogPosts, searchQuery]);

  // Handle add new click
  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setIsModalOpen(true);
  };

  // Handle delete click
  async function handleDeleteClick(blogPostId: string) {
    try {
      if (blogPostId) {
        setIsDeleting(blogPostId);
      }
      const response = await fetch(
        `${baseUrl}/api/v1/blogPostsAPI/${blogPostId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.ok) {
        setIsDeleting(null);
        toast.success('Blog-Post Deleted Successfully');
        console.log(response);
        router.push('/dashboard/view-blog-posts');
      } else {
        setIsDeleting(null);
        toast.error('Failed To Delete Blog-Post...!!!🥺');
        console.log(response);
      }
    } catch (error) {
      setIsDeleting(null);
      toast.error(
        '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        {
          description:
            error instanceof Error ? error.message : 'Unknown error occurred',
        },
      );
    }
  }

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredUserBlogPosts.length / itemsPerPage);

  // Format date function
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, current page and neighbors, and last page
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Middle
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <Card className={clsx('w-full my-6')}>
        <CardHeader
          className={clsx('flex flex-row items-center justify-between')}
        >
          <div>
            <CardTitle className={clsx('text-2xl')}>{title}</CardTitle>
            <p className={clsx('text-muted-foreground mt-1')}>
              {userBlogPosts.length}{' '}
              {userBlogPosts.length === 1 ? 'Blog-Post' : 'Blog-Posts'}
            </p>
          </div>
          <Button className="" onClick={handleAddNewClick}>
            {/* <Plus className={clsx('mr-2 h-4 w-4')} /> */}
            <Link href="/dashboard/blog-posts-form">Add Blog-Posts</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search and Export */}
          <div className={clsx('flex items-center justify-between mb-4')}>
            <div className={clsx('relative max-w-sm')}>
              <Search
                className={clsx(
                  'absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground',
                )}
              />
              <Input
                placeholder="Search blog-post..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={clsx('pl-8 w-full md:w-80')}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx('absolute right-1 top-1.5 h-6 w-6')}
                  onClick={() => setSearchQuery('')}
                >
                  <X className={clsx('h-4 w-4')} />
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              //   onClick={exportToExcel}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className={clsx('mr-2 h-4 w-4 animate-spin')} />
                  Exporting...
                </>
              ) : (
                <>
                  <FileSpreadsheet className={clsx('mr-2 h-4 w-4')} />
                  Export to Excel
                </>
              )}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Excerpt</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>publishDate</TableHead>
                <TableHead>UpdatedAt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBlogPosts.length > 0 ? (
                userBlogPosts.map((userBlogPost) => (
                  <TableRow key={userBlogPost.id}>
                    <TableCell className={clsx('font-medium')}>
                      <Card className="w-12 h-auto rounded overflow-hidden shadow-lg">
                        <img
                          className="h-full w-full object-fit-contain overflow-hidden"
                          src={userBlogPost.image || '/placeholder.svg'}
                          alt={userBlogPost.title}
                        />
                      </Card>
                    </TableCell>
                    <TableCell>
                      {userBlogPost.title}
                    </TableCell>
                    <TableCell>
                      {userBlogPost.excerpt.trim().substring(0, 10) + '...'}
                    </TableCell>
                    <TableCell>
                      {userBlogPost.category.title}
                    </TableCell>
                    <TableCell>
                      {formatDate(userBlogPost.publishDate)}
                    </TableCell>
                    <TableCell>{formatDate(userBlogPost.updatedAt)}</TableCell>
                    <TableCell className={clsx('text-right')}>
                      <div className={clsx('flex justify-end gap-2')}>
                        <Link
                          href={`/dashboard/blog-posts-form/${userBlogPost.id}`}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            // onClick={() => handleEditClick(meal.slug)}
                            title="Edit Blog-Post Category"
                          >
                            <Edit className={clsx('h-4 w-4')} />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          className={clsx('text-destructive')}
                          onClick={() => handleDeleteClick(userBlogPost.id)}
                          disabled={isDeleting === userBlogPost.id}
                          title="Delete Testimonial"
                        >
                          {isDeleting === userBlogPost.id ? (
                            <Loader2 className={clsx('h-4 w-4 animate-spin')} />
                          ) : (
                            <Trash2 className={clsx('h-4 w-4')} />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className={clsx('text-center py-6')}>
                    {searchQuery ? 'No matching posts found' : 'No post found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className={clsx('mt-4')}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={clsx(
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer',
                      )}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, index) =>
                    page === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-${page}`}>
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          className={clsx(
                            currentPage === page
                              ? 'bg-primary text-primary-foreground'
                              : 'cursor-pointer',
                          )}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={clsx(
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer',
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sales Person Modal (for both Edit and Add) */}
      {/* <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!isSaving) {
            setIsModalOpen(open);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? 'Add New Sales Person' : 'Edit Sales Person'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter sales person's name"
                        {...field}
                        disabled={isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+25676xxxxxx"
                        {...field}
                        disabled={isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@domain.com"
                        type="email"
                        {...field}
                        disabled={isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isSaving}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isAddingNew ? 'Adding...' : 'Saving...'}
                    </>
                  ) : isAddingNew ? (
                    'Add Sales Person'
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
