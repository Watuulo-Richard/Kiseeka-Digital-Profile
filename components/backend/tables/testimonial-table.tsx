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
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { baseUrl } from '@/types/type';
import { Testimonial } from '@prisma/client';

export default function TestimonialsTable({
  title,
  testimonials,
}: {
  title: string;
  testimonials: Testimonial[];
}) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter testimonials based on search query
  const filteredMeals = useMemo(() => {
    if (!searchQuery.trim()) return testimonials;

    const query = searchQuery.toLowerCase();
    return testimonials.filter(
      (testimonial) =>
        testimonial.fullName.toLowerCase().includes(query) ||
        testimonial.email.toLowerCase().includes(query) ||
        testimonial.id.toLowerCase().includes(query)
    );
  }, [testimonials, searchQuery]);

  // Handle view detail click
  const handleViewDetail = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDetailModalOpen(true);
  };

  // Handle add new click
  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setIsModalOpen(true);
  };

  // Handle delete click
  async function handleDeleteClick(testimonialId: string) {
    try {
      if (testimonialId) {
        setIsDeleting(testimonialId);
      }
      const response = await fetch(
        `${baseUrl}/api/v1/testimonialAPI/${testimonialId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response), 'Jesus';
      if (response.ok) {
        setIsDeleting(null);
        toast.success('Testimonial Deleted Successfully...✅');
        console.log(response);
        router.push('/dashboard/view-testimonials');
      } else {
        setIsDeleting(null);
        toast.error('Failed To Delete Testimonials...!!!🥺');
        console.log(response);
      }
    } catch (error) {
      setIsDeleting(null);
      toast.error(
        '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        {
          description:
            error instanceof Error ? error.message : 'Unknown error occurred',
        }
      );
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
  const formatDate = (date: Date | string) => {
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
              {testimonials.length}{' '}
              {testimonials.length === 1 ? 'testimonial' : 'testimonials'}
            </p>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleAddNewClick}>
            <Link href="/dashboard/testimonial-form">Add Testimonial</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search and Export */}
          <div className={clsx('flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4')}>
            <div className={clsx('relative w-full sm:max-w-sm')}>
              <Search
                className={clsx(
                  'absolute left-2.5 top-2.5 h-4 w-4 text-[#c0543a] dark:text-primary'
                )}
              />
              <Input
                placeholder="Search testimonial..."
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

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>FullName</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Profession</TableHead>
                  <TableHead>CreatedAt</TableHead>
                  <TableHead>UpdatedAt</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className={clsx('font-medium')}>
                        <Card className="w-12 h-12 rounded overflow-hidden shadow-lg">
                          <img
                            className="h-full w-full object-cover"
                            src={testimonial.image || '/placeholder.svg'}
                            alt={testimonial.fullName}
                          />
                        </Card>
                      </TableCell>
                      <TableCell>{testimonial.fullName}</TableCell>
                      <TableCell>{testimonial.email}</TableCell>
                      <TableCell>
                        {testimonial.profession.trim().substring(0, 15)}
                        {testimonial.profession.length > 15 ? '...' : ''}
                      </TableCell>
                      <TableCell>{formatDate(testimonial.createdAt)}</TableCell>
                      <TableCell>{formatDate(testimonial.updatedAt)}</TableCell>
                      <TableCell className={clsx('text-right')}>
                        <div className={clsx('flex justify-end gap-2')}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetail(testimonial)}
                            title="View Details"
                          >
                            <Eye className={clsx('h-4 w-4 text-[#c0543a] dark:text-primary')} />
                          </Button>
                          <Link
                            href={`/dashboard/testimonial-form/${testimonial.id}`}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              title="Edit Testimonial"
                            >
                              <Edit className={clsx('h-4 w-4 text-[#c0543a] dark:text-primary')} />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            className={clsx('text-destructive')}
                            onClick={() => handleDeleteClick(testimonial.id)}
                            disabled={isDeleting === testimonial.id}
                            title="Delete Testimonial"
                          >
                            {isDeleting === testimonial.id ? (
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
                        ? 'No matching testimonials found'
                        : 'No testimonial found'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {currentItems.length > 0 ? (
              currentItems.map((testimonial) => (
                <Card key={testimonial.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <Card className="w-16 h-16 flex-shrink-0 rounded overflow-hidden shadow-lg">
                      <img
                        className="h-full w-full object-cover"
                        src={testimonial.image || '/placeholder.svg'}
                        alt={testimonial.fullName}
                      />
                    </Card>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                        {testimonial.fullName}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {testimonial.email}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {testimonial.profession.trim().substring(0, 30)}
                        {testimonial.profession.length > 30 ? '...' : ''}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                        <span>Created: {formatDate(testimonial.createdAt)}</span>
                        <span>•</span>
                        <span>Updated: {formatDate(testimonial.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetail(testimonial)}
                    >
                      <Eye className="h-4 w-4 mr-1 text-[#c0543a] dark:text-primary" />
                      View
                    </Button>
                    <Link
                      href={`/dashboard/testimonial-form/${testimonial.id}`}
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
                      onClick={() => handleDeleteClick(testimonial.id)}
                      disabled={isDeleting === testimonial.id}
                    >
                      {isDeleting === testimonial.id ? (
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
                    ? 'No matching testimonials found'
                    : 'No testimonial found'}
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Testimonial Details</DialogTitle>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <Card className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4">
                  <img
                    className="h-full w-full object-cover"
                    src={selectedTestimonial.image || '/placeholder.svg'}
                    alt={selectedTestimonial.fullName}
                  />
                </Card>
                <h2 className="text-2xl font-bold text-center">
                  {selectedTestimonial.fullName}
                </h2>
                <p className="text-muted-foreground text-center">
                  {selectedTestimonial.profession}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">
                    Email
                  </label>
                  <p className="text-base mt-1">{selectedTestimonial.email}</p>
                </div>

                {selectedTestimonial.description && (
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">
                      Testimonial
                    </label>
                    <p className="text-base mt-1 whitespace-pre-wrap">
                      {selectedTestimonial.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">
                      Created At
                    </label>
                    <p className="text-base mt-1">
                      {formatDate(selectedTestimonial.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">
                      Updated At
                    </label>
                    <p className="text-base mt-1">
                      {formatDate(selectedTestimonial.updatedAt)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-muted-foreground">
                    ID
                  </label>
                  <p className="text-base mt-1 font-mono text-sm break-all">
                    {selectedTestimonial.id}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Link
                  href={`/dashboard/testimonial-form/${selectedTestimonial.id}`}
                  className="flex-1"
                >
                  <Button variant="default" className="w-full">
                    <Edit className="h-4 w-4 mr-2 text-[#c0543a] dark:text-primary" />
                    Edit Testimonial
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