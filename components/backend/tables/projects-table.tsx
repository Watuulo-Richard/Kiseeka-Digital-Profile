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
import { baseUrl } from '@/types/type';
import { Project } from '@prisma/client';

export default function ProjectsTable({ title, projects }: {
  title: string;
  projects: Project[]
}) {

  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;
  const router = useRouter()

  // Filter Education Background based on search query
  const filteredEducationBackgrounds = useMemo(() => {
    if (!searchQuery.trim()) return projects;

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query)
        // || project.url.toLowerCase().includes(query)
        // || educationBackground.description.toLowerCase().includes(query)
    );
  }, [projects, searchQuery]);

  // Handle edit click
  // async function handleEditClick (meal: MealPropTypes) {
  //   setIsAddingNew(false);
  //   router.push(`/dashboard/meals/${meal.slug}`)
  //   setIsModalOpen(true);
  // };

  // Handle add new click
  const handleAddNewClick = () => {
    setIsAddingNew(true);
  };

  // Handle delete click
  async function handleDeleteClick(projectId: string) {
    try {
      if (projectId) {
        setIsDeleting(projectId);
      }
      const response = await fetch(
        `${baseUrl}/api/v1/projectsAPI/${projectId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      console.log(response), 'Jesus';
      if (response.ok) {
        setIsDeleting(null);
        toast.success('Project Deleted Successfully...✅');
        console.log(response);
        router.push('/dashboard/dashboard/view-projects')
      } else {
        setIsDeleting(null);
        toast.error('Failed To Delete Project...!!!🥺');
        console.log(response);
      }
    } catch (error) {
      setIsDeleting(null);
      toast.error('Internet Connect Error...', {
        description:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredEducationBackgrounds.length / itemsPerPage);

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
              {projects.length}{' '}
              {projects.length === 1 ? 'Project' : 'Projects'}
            </p>
          </div>
          <Button className='' onClick={handleAddNewClick}>
            {/* <Plus className={clsx('mr-2 h-4 w-4')} /> */}
            <Link href='/dashboard/work-experience'>
                Add Project
            </Link>
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
                placeholder="Search projects..."
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
                <TableHead>Project Title</TableHead>
                <TableHead>Project Link</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.url}</TableCell>
                    <TableCell>{formatDate(project.createdAt)}</TableCell>
                    <TableCell>{formatDate(project.updatedAt)}</TableCell>
                    <TableCell className={clsx('text-right')}>
                      <div className={clsx('flex justify-end gap-2')}>
                        <Link href={`/dashboard/projects-form/${project.id}`}>
                          <Button 
                            variant="outline"
                            size="icon"
                              // onClick={() => handleEditClick(project.id)}
                            title="Edit Work Experience"
                          >
                            <Edit className={clsx('h-4 w-4')} />
                            
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          className={clsx('text-destructive')}
                          onClick={() => handleDeleteClick(project.id)}
                          disabled={isDeleting === project.id}
                          title="Delete Project"
                        >
                          {isDeleting === project.id ? (
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
                    {searchQuery
                      ? 'No matching projects found'
                      : 'No education project found'}
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
