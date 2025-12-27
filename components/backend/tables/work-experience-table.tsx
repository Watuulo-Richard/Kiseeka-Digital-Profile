'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Eye,
  FileSpreadsheet,
  Loader2,
  Search,
  Trash2,
  X,
  Briefcase,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { baseUrl } from '@/types/type';
import { WorkExperience } from '@prisma/client';

export default function WorkExperienceTable({
  title,
  workExperiences,
}: {
  title: string;
  workExperiences: WorkExperience[];
}) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedWorkExperience, setSelectedWorkExperience] =
    useState<WorkExperience | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter work experiences based on search query
  const filteredMeals = useMemo(() => {
    if (!searchQuery.trim()) return workExperiences;

    const query = searchQuery.toLowerCase();
    return workExperiences.filter(
      (workExperience) =>
        workExperience.position.toLowerCase().includes(query) ||
        workExperience.company.toLowerCase().includes(query) ||
        workExperience.id.toLowerCase().includes(query)
    );
  }, [workExperiences, searchQuery]);

  // Handle view detail click
  const handleViewDetail = (workExperience: WorkExperience) => {
    setSelectedWorkExperience(workExperience);
    setIsDetailModalOpen(true);
  };

  // Handle add new click
  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setIsModalOpen(true);
  };

  // Handle delete click
  async function handleDeleteClick(workexperienceId: string) {
    try {
      if (workexperienceId) {
        setIsDeleting(workexperienceId);
      }
      const response = await fetch(
        `${baseUrl}/api/v1/workexperienceAPI/${workexperienceId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response), 'Jesus';
      if (response.ok) {
        setIsDeleting(null);
        toast.success('Work Experience Deleted successfully...✅');
        console.log(response);
        router.push('/dashboard/view-work-experiences');
      } else {
        setIsDeleting(null);
        toast.error('Failed To Delete Work Experience...!!!🥺');
        console.log(response);
      }
    } catch (error) {
      setIsDeleting(null);
      toast.error('Failed to Work Experience', {
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
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  // Get current page items
  const currentItems = filteredMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Format date function
  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Present';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

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
          className={clsx(
            'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
          )}
        >
          <div>
            <CardTitle className={clsx('text-xl sm:text-2xl')}>
              {title}
            </CardTitle>
            <p className={clsx('text-muted-foreground mt-1 text-sm')}>
              {workExperiences.length}{' '}
              {workExperiences.length === 1
                ? 'work experience'
                : 'work experiences'}
            </p>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleAddNewClick}>
            <Link href="/dashboard/work-experience">Add Experience</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search and Export */}
          <div
            className={clsx(
              'flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4'
            )}
          >
            <div className={clsx('relative w-full sm:max-w-sm')}>
              <Search
                className={clsx(
                  'absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground'
                )}
              />
              <Input
                placeholder="Search work experience..."
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

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>StartDate</TableHead>
                  <TableHead>EndDate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((workExperience) => (
                    <TableRow key={workExperience.id}>
                      <TableCell className="font-medium">
                        {workExperience.position}
                      </TableCell>
                      <TableCell>{workExperience.company}</TableCell>
                      <TableCell>
                        {formatDate(workExperience.startDate)}
                      </TableCell>
                      <TableCell>
                        {formatDate(workExperience.endDate as Date)}
                      </TableCell>
                      <TableCell className={clsx('text-right')}>
                        <div className={clsx('flex justify-end gap-2')}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetail(workExperience)}
                            title="View Details"
                          >
                            <Eye className={clsx('h-4 w-4')} />
                          </Button>
                          <Link
                            href={`/dashboard/work-experience/${workExperience.id}`}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              title="Edit Work Experience"
                            >
                              <Edit className={clsx('h-4 w-4')} />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            className={clsx('text-destructive')}
                            onClick={() => handleDeleteClick(workExperience.id)}
                            disabled={isDeleting === workExperience.id}
                            title="Delete Work Experience"
                          >
                            {isDeleting === workExperience.id ? (
                              <Loader2
                                className={clsx('h-4 w-4 animate-spin')}
                              />
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
                    <TableCell
                      colSpan={5}
                      className={clsx('text-center py-6')}
                    >
                      {searchQuery
                        ? 'No matching work experiences found'
                        : 'No work experiences found'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {currentItems.length > 0 ? (
              currentItems.map((workExperience) => (
                <Card key={workExperience.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg">
                          {workExperience.position}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {workExperience.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(workExperience.startDate)} -{' '}
                        {formatDate(workExperience.endDate as Date)}
                      </span>
                    </div>

                    {workExperience.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {workExperience.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetail(workExperience)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Link
                      href={`/dashboard/work-experience/${workExperience.id}`}
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
                      onClick={() => handleDeleteClick(workExperience.id)}
                      disabled={isDeleting === workExperience.id}
                    >
                      {isDeleting === workExperience.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8">
                <p className="text-center text-muted-foreground">
                  {searchQuery
                    ? 'No matching work experiences found'
                    : 'No work experiences found'}
                </p>
              </Card>
            )}
          </div>

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
                          : 'cursor-pointer'
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
                              : 'cursor-pointer'
                          )}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={clsx(
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Work Experience Details</DialogTitle>
          </DialogHeader>
          {selectedWorkExperience && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {selectedWorkExperience.position}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {selectedWorkExperience.company}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Start Date
                    </label>
                    <p className="text-base mt-1">
                      {formatDate(selectedWorkExperience.startDate)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      End Date
                    </label>
                    <p className="text-base mt-1">
                      {formatDate(selectedWorkExperience.endDate as Date)}
                    </p>
                  </div>
                </div>

                {selectedWorkExperience.description && (
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">
                      Description
                    </label>
                    <p className="text-base mt-1 whitespace-pre-wrap">
                      {selectedWorkExperience.description}
                    </p>
                  </div>
                )}

                {/* {selectedWorkExperience.responsibilities && (
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">
                      Responsibilities
                    </label>
                    <p className="text-base mt-1 whitespace-pre-wrap">
                      {selectedWorkExperience.responsibilities}
                    </p>
                  </div>
                )} */}

                {/* {selectedWorkExperience.achievements && (
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">
                      Achievements
                    </label>
                    <p className="text-base mt-1 whitespace-pre-wrap">
                      {selectedWorkExperience.achievements}
                    </p>
                  </div>
                )} */}

                <div className="pt-2 border-t">
                  <label className="text-sm font-semibold text-muted-foreground">
                    ID
                  </label>
                  <p className="text-base mt-1 font-mono text-sm break-all">
                    {selectedWorkExperience.id}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Link
                  href={`/dashboard/work-experience/${selectedWorkExperience.id}`}
                  className="flex-1"
                >
                  <Button variant="default" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Experience
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}