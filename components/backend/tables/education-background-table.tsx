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
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { baseUrl } from '@/types/type';
import { Education } from '@prisma/client';

export default function EducationBackgroundTable({ title, educationBackgrounds }: {
  title: string;
  educationBackgrounds: Education[]
}) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter education backgrounds based on search query
  const filteredEducationBackgrounds = useMemo(() => {
    if (!searchQuery.trim()) return educationBackgrounds;

    const query = searchQuery.toLowerCase();
    return educationBackgrounds.filter(
      (educationBackground) =>
        educationBackground.institution.toLowerCase().includes(query) ||
        educationBackground.educationLevel.toLowerCase().includes(query)
    );
  }, [educationBackgrounds, searchQuery]);

  // Handle view detail click
  const handleViewDetail = (education: Education) => {
    setSelectedEducation(education);
    setIsDetailModalOpen(true);
  };

  // Handle add new click
  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setIsModalOpen(true);
  };

  // Handle delete click
  async function handleDeleteClick(educationBackgroundId: string) {
    try {
      if (educationBackgroundId) {
        setIsDeleting(educationBackgroundId);
      }
      const response = await fetch(
        `${baseUrl}/api/v1/educationAPI/${educationBackgroundId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      
      if (response.ok) {
        setIsDeleting(null);
        toast.success('Education Background Deleted successfully...✅');
        console.log(response);
        router.push('/dashboard/view-education-backgrounds');
      } else {
        setIsDeleting(null);
        toast.error('Failed To Delete Education Background...!!!🥺');
        console.log(response);
      }
    } catch (error) {
      setIsDeleting(null);
      toast.error('Failed to Delete Education Background', {
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
  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Present';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

  const paginatedEducationBackgrounds = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEducationBackgrounds.slice(startIndex, endIndex);
  }, [filteredEducationBackgrounds, currentPage, itemsPerPage]);

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
              {educationBackgrounds.length}{' '}
              {educationBackgrounds.length === 1 ? 'Education Background' : 'Education Backgrounds'}
            </p>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleAddNewClick}>
            <Link href='/dashboard/education-form'>
                Add Education Background
            </Link>
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
                placeholder="Search education background..."
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
            {paginatedEducationBackgrounds.length > 0 ? (
              paginatedEducationBackgrounds.map((educationBackground) => (
                <Card key={educationBackground.id} className="overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-1">
                      {educationBackground.institution}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {educationBackground.educationLevel}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatDate(educationBackground.startDate)}</span>
                      <span>→</span>
                      <span>{formatDate(educationBackground.endDate)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2 py-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetail(educationBackground)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Link
                      href={`/dashboard/education-form/${educationBackground.id}`}
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
                      onClick={() => handleDeleteClick(educationBackground.id)}
                      disabled={isDeleting === educationBackground.id}
                    >
                      {isDeleting === educationBackground.id ? (
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
                  ? 'No matching education backgrounds found'
                  : 'No education background found'}
              </Card>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Institution</TableHead>
                  <TableHead className="min-w-[150px]">Education Level</TableHead>
                  <TableHead className="min-w-[120px]">Start Date</TableHead>
                  <TableHead className="min-w-[120px]">End Date</TableHead>
                  <TableHead className="text-right min-w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEducationBackgrounds.length > 0 ? (
                  paginatedEducationBackgrounds.map((educationBackground) => (
                    <TableRow key={educationBackground.id}>
                      <TableCell className="font-medium">
                        <div className="max-w-[250px] truncate">
                          {educationBackground.institution}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate">
                          {educationBackground.educationLevel}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(educationBackground.startDate)}</TableCell>
                      <TableCell>{formatDate(educationBackground.endDate)}</TableCell>
                      <TableCell className={clsx('text-right')}>
                        <div className={clsx('flex justify-end gap-2')}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetail(educationBackground)}
                            title="View Details"
                          >
                            <Eye className={clsx('h-4 w-4')} />
                          </Button>
                          <Link href={`/dashboard/education-form/${educationBackground.id}`}>
                            <Button 
                              variant="outline"
                              size="icon"
                              title="Edit Education Background"
                            >
                              <Edit className={clsx('h-4 w-4')} />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            className={clsx('text-destructive')}
                            onClick={() => handleDeleteClick(educationBackground.id)}
                            disabled={isDeleting === educationBackground.id}
                            title="Delete Education Background"
                          >
                            {isDeleting === educationBackground.id ? (
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
                        ? 'No matching education backgrounds found'
                        : 'No education background found'}
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
            <DialogTitle>Education Background Details</DialogTitle>
          </DialogHeader>
          {selectedEducation && (
            <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
              <div className="space-y-6">
                {/* Institution */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Institution
                  </h3>
                  <p className="text-lg font-semibold">{selectedEducation.institution}</p>
                </div>

                {/* Education Level */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Education Level
                  </h3>
                  <p className="text-base">{selectedEducation.educationLevel}</p>
                </div>

                {/* Degree/Field of Study */}
                {selectedEducation.educationLevel && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Degree / Field of Study
                    </h3>
                    <p className="text-base">{selectedEducation.educationLevel}</p>
                  </div>
                )}

                {/* Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Start Date
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedEducation.startDate)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      End Date
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedEducation.endDate)}
                    </p>
                  </div>
                </div>

                {/* Description/Details */}
                {selectedEducation.description && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Description
                    </h3>
                    <p className="text-sm leading-relaxed">{selectedEducation.description}</p>
                  </div>
                )}

                {/* ID */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Record ID
                  </h3>
                  <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
                    {selectedEducation.id}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Link
                    href={`/dashboard/education-form/${selectedEducation.id}`}
                    className="flex-1"
                  >
                    <Button variant="default" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Education
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