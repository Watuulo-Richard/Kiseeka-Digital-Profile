'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { baseUrl, BlogPostCommentTypes } from '@/types/type';
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import clsx from 'clsx';
import {
  Edit,
  Eye,
  FileSpreadsheet,
  Loader2,
  Search,
  Trash2,
  X,
} from 'lucide-react';

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
  const [selectedPost, setSelectedPost] = useState<BlogPostCommentTypes | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter posts based on search query
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

  // Handle view detail click
  const handleViewDetail = (post: BlogPostCommentTypes) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true);
  };

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

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

  const paginatedBlogPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUserBlogPosts.slice(startIndex, endIndex);
  }, [filteredUserBlogPosts, currentPage, itemsPerPage]);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredUserBlogPosts.length / itemsPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
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
          className={clsx('flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4')}
        >
          <div>
            <CardTitle className={clsx('text-xl sm:text-2xl')}>{title}</CardTitle>
            <p className={clsx('text-muted-foreground mt-1 text-sm')}>
              {userBlogPosts.length}{' '}
              {userBlogPosts.length === 1 ? 'Blog-Post' : 'Blog-Posts'}
            </p>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleAddNewClick}>
            <Link href="/dashboard/blog-posts-form">Add Blog-Posts</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search and Export */}
          <div className={clsx('flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4')}>
            <div className={clsx('relative w-full sm:max-w-sm')}>
              <Search
                className={clsx(
                  'absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground',
                )}
              />
              <Input
                placeholder="Search blog-post..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={clsx('pl-8 w-full')}
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
              disabled={isExporting}
              className="w-full sm:w-auto"
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

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {paginatedBlogPosts.length > 0 ? (
              paginatedBlogPosts.map((userBlogPost) => (
                <Card key={userBlogPost.id} className="overflow-hidden">
                  <div className="flex gap-4 p-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20 rounded object-cover"
                        src={userBlogPost.image || '/placeholder.svg'}
                        alt={userBlogPost.title}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">
                        {userBlogPost.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {userBlogPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{formatDate(userBlogPost.publishDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2 py-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetail(userBlogPost)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Link
                      href={`/dashboard/blog-posts-form/${userBlogPost.slug}`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteClick(userBlogPost.id)}
                      disabled={isDeleting === userBlogPost.id}
                    >
                      {isDeleting === userBlogPost.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center text-muted-foreground">
                {searchQuery ? 'No matching posts found' : 'No post found'}
              </Card>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead className="min-w-[150px]">Title</TableHead>
                  <TableHead className="min-w-[200px]">Excerpt</TableHead>
                  <TableHead className="min-w-[120px]">Publish Date</TableHead>
                  <TableHead className="min-w-[120px]">Updated At</TableHead>
                  <TableHead className="text-right min-w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBlogPosts.length > 0 ? (
                  paginatedBlogPosts.map((userBlogPost) => (
                    <TableRow key={userBlogPost.id}>
                      <TableCell className={clsx('font-medium')}>
                        <div className="w-12 h-12 rounded overflow-hidden">
                          <img
                            className="h-full w-full object-cover"
                            src={userBlogPost.image || '/placeholder.svg'}
                            alt={userBlogPost.title}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="max-w-[200px] truncate">
                          {userBlogPost.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[250px] truncate">
                          {userBlogPost.excerpt}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(userBlogPost.publishDate)}
                      </TableCell>
                      <TableCell>{formatDate(userBlogPost.updatedAt)}</TableCell>
                      <TableCell className={clsx('text-right')}>
                        <div className={clsx('flex justify-end gap-2')}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetail(userBlogPost)}
                            title="View Details"
                          >
                            <Eye className={clsx('h-4 w-4')} />
                          </Button>
                          <Link
                            href={`/dashboard/blog-posts-form/${userBlogPost.slug}`}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              title="Edit Blog-Post"
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
                            title="Delete Blog-Post"
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
                    <TableCell colSpan={6} className={clsx('text-center py-6')}>
                      {searchQuery ? 'No matching posts found' : 'No post found'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={clsx('mt-4')}>
              <Pagination>
                <PaginationContent className="flex-wrap">
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
                      <PaginationItem key={`ellipsis-${index}`} className="hidden sm:block">
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

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Blog Post Details</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
              <div className="space-y-6">
                {/* Image */}
                {selectedPost.image && (
                  <div className="w-full aspect-video rounded-lg overflow-hidden">
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Title */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Title
                  </h3>
                  <p className="text-lg font-semibold">{selectedPost.title}</p>
                </div>

                {/* Slug */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Slug
                  </h3>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {selectedPost.slug}
                  </p>
                </div>

                {/* Excerpt */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Excerpt
                  </h3>
                  <p className="text-sm">{selectedPost.excerpt}</p>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Publish Date
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedPost.publishDate)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Last Updated
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedPost.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* ID */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Post ID
                  </h3>
                  <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
                    {selectedPost.id}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Link
                    href={`/dashboard/blog-posts-form/${selectedPost.slug}`}
                    className="flex-1"
                  >
                    <Button variant="default" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Post
                    </Button>
                  </Link>
                  <DialogClose asChild>
                    <Button variant="outline" className="flex-1">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}