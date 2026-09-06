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
  ExternalLink,
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        (project.url && project.url.toLowerCase().includes(query))
    );
  }, [projects, searchQuery]);

  // Handle view detail click
  const handleViewDetail = (project: Project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

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
      
      if (response.ok) {
        setIsDeleting(null);
        toast.success('Project Deleted Successfully...✅');
        console.log(response);
        router.push('/dashboard/view-projects');
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
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  // Format date function
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage, itemsPerPage]);

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
      <Card
        className={clsx(
          'w-full my-6 overflow-hidden rounded-2xl border border-[#F2B5A0]/30 bg-[#fff8f4] shadow-sm dark:border-gray-800 dark:bg-white/[0.03]'
        )}
      >
        <CardHeader
          className={clsx(
            'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F2B5A0]/20 pb-5'
          )}
        >
          <div>
            <CardTitle className={clsx('text-xl sm:text-2xl')}>{title}</CardTitle>
            <p className={clsx('text-muted-foreground mt-1 text-sm')}>
              {projects.length}{' '}
              {projects.length === 1 ? 'Project' : 'Projects'}
            </p>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleAddNewClick}>
            <Link href='/dashboard/projects-form'>
                Add Project
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search and Export */}
          <div className={clsx('flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4')}>
            <div className={clsx('relative w-full sm:max-w-sm')}>
              <Search
                className={clsx(
                  'absolute left-2.5 top-2.5 h-4 w-4 text-[#c0543a] dark:text-primary',
                )}
              />
              <Input
                placeholder="Search projects..."
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
                  <X className={clsx('h-4 w-4 text-[#c0543a] dark:text-primary')} />
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
                  <Loader2 className={clsx('mr-2 h-4 w-4 animate-spin text-[#c0543a] dark:text-primary')} />
                  Exporting...
                </>
              ) : (
                <>
                  <FileSpreadsheet className={clsx('mr-2 h-4 w-4 text-[#c0543a] dark:text-primary')} />
                  Export to Excel
                </>
              )}
            </Button>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {paginatedProjects.length > 0 ? (
              paginatedProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-2">
                      {project.title}
                    </h3>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1 mb-3"
                      >
                        <span className="truncate">{project.url}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    )}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Created:</span>{" "}
                        {formatDate(project.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 p-4 pt-0 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetail(project)}
                    >
                      <Eye className="h-4 w-4 mr-1 text-[#c0543a] dark:text-primary" />
                      View
                    </Button>
                    <Link
                      href={`/dashboard/projects-form/${project.id}`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-1 text-[#c0543a] dark:text-primary" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteClick(project.id)}
                      disabled={isDeleting === project.id}
                    >
                      {isDeleting === project.id ? (
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
                {searchQuery
                  ? 'No matching projects found'
                  : 'No projects found'}
              </Card>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Project Title</TableHead>
                  <TableHead className="min-w-[250px]">Project Link</TableHead>
                  <TableHead className="min-w-[120px]">Created At</TableHead>
                  <TableHead className="min-w-[120px]">Updated At</TableHead>
                  <TableHead className="text-right min-w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        <div className="max-w-[250px] truncate">
                          {project.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        {project.url ? (
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1 max-w-[300px]"
                          >
                            <span className="truncate">{project.url}</span>
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(project.createdAt)}</TableCell>
                      <TableCell>{formatDate(project.updatedAt)}</TableCell>
                      <TableCell className={clsx('text-right')}>
                        <div className={clsx('flex justify-end gap-2')}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetail(project)}
                            title="View Details"
                          >
                            <Eye className={clsx('h-4 w-4 text-[#c0543a] dark:text-primary')} />
                          </Button>
                          <Link href={`/dashboard/projects-form/${project.id}`}>
                            <Button 
                              variant="outline"
                              size="icon"
                              title="Edit Project"
                            >
                              <Edit className={clsx('h-4 w-4 text-[#c0543a] dark:text-primary')} />
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
                    <TableCell colSpan={5} className={clsx('text-center py-6')}>
                      {searchQuery
                        ? 'No matching projects found'
                        : 'No projects found'}
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
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Project Title
                  </h3>
                  <p className="text-lg font-semibold">{selectedProject.title}</p>
                </div>

                {/* URL/Link */}
                {selectedProject.url && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Project Link
                    </h3>
                    <a 
                      href={selectedProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2 break-all"
                    >
                      {selectedProject.url}
                      <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    </a>
                  </div>
                )}

                {/* Image */}
                {/* {selectedProject.image && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Project Image
                    </h3>
                    <div className="w-full aspect-video rounded-lg overflow-hidden border">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )} */}

                {/* Description */}
                {selectedProject.description && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Description
                    </h3>
                    <p className="text-sm leading-relaxed">{selectedProject.description}</p>
                  </div>
                )}

                {/* Technologies */}
                {/* {selectedProject.technologies && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Technologies Used
                    </h3>
                    <p className="text-sm">{selectedProject.technologies}</p>
                  </div>
                )} */}

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Created At
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedProject.createdAt)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Last Updated
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedProject.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* ID */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Project ID
                  </h3>
                  <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
                    {selectedProject.id}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Link
                    href={`/dashboard/projects-form/${selectedProject.id}`}
                    className="flex-1"
                  >
                    <Button variant="default" className="w-full">
                      <Edit className="mr-2 h-4 w-4 text-[#c0543a] dark:text-primary" />
                      Edit Project
                    </Button>
                  </Link>
                  {selectedProject.url && (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4 text-[#c0543a] dark:text-primary" />
                        Visit Project
                      </Button>
                    </a>
                  )}
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