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
import { Progress } from '@/components/ui/progress';
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
import { Skill } from '@prisma/client';

export default function SkillsTable({ title, skills }: {
  title: string;
  skills: Skill[]
}) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter skills based on search query
  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return skills;

    const query = searchQuery.toLowerCase();
    return skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(query) ||
        (skill.level !== null && skill.level.toString().includes(query))
    );
  }, [skills, searchQuery]);

  // Handle view detail click
  const handleViewDetail = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsDetailModalOpen(true);
  };

  // Handle add new click
  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setIsModalOpen(true);
  };

  // Handle delete click
  async function handleDeleteClick(skillId: string) {
    try {
      if (skillId) {
        setIsDeleting(skillId);
      }
      const response = await fetch(
        `${baseUrl}/api/v1/skillsAPI/${skillId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      
      if (response.ok) {
        setIsDeleting(null);
        toast.success('Skill Deleted Successfully...✅');
        console.log(response);
        router.push('/dashboard/view-skills');
      } else {
        setIsDeleting(null);
        toast.error('Failed To Delete Skill...!!!🥺');
        console.log(response);
      }
    } catch (error) {
      setIsDeleting(null);
      toast.error('Internet Connection Error...!!!', {
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
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);

  // Format date function
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

  const paginatedSkills = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSkills.slice(startIndex, endIndex);
  }, [filteredSkills, currentPage, itemsPerPage]);

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
              {skills.length}{' '}
              {skills.length === 1 ? 'skill' : 'skills'}
            </p>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleAddNewClick}>
            <Link href='/dashboard/skills-form'>
                Add Skill
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
                placeholder="Search skill..."
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
            {paginatedSkills.length > 0 ? (
              paginatedSkills.map((skill) => (
                <Card key={skill.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-base">
                        {skill.name}
                      </h3>
                      <span className="text-sm font-medium text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2 mb-3" />
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Created:</span>{" "}
                        {formatDate(skill.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2 py-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetail(skill)}
                    >
                      <Eye className="h-4 w-4 mr-1 text-[#c0543a] dark:text-primary" />
                      View
                    </Button>
                    <Link
                      href={`/dashboard/skills-form/${skill.id}`}
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
                      onClick={() => handleDeleteClick(skill.id)}
                      disabled={isDeleting === skill.id}
                    >
                      {isDeleting === skill.id ? (
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
                  ? 'No matching skills found'
                  : 'No skill found'}
              </Card>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Name</TableHead>
                  <TableHead className="min-w-[150px]">Level</TableHead>
                  <TableHead className="min-w-[120px]">Created At</TableHead>
                  <TableHead className="min-w-[120px]">Updated At</TableHead>
                  <TableHead className="text-right min-w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSkills.length > 0 ? (
                  paginatedSkills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell className="font-medium">
                        <div className="max-w-[250px] truncate">
                          {skill.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={skill.level} className="h-2 w-24" />
                          <span className="text-sm font-medium min-w-[3rem]">
                            {skill.level}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(skill.createdAt)}</TableCell>
                      <TableCell>{formatDate(skill.updatedAt)}</TableCell>
                      <TableCell className={clsx('text-right')}>
                        <div className={clsx('flex justify-end gap-2')}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetail(skill)}
                            title="View Details"
                          >
                            <Eye className={clsx('h-4 w-4 text-[#c0543a] dark:text-primary')} />
                          </Button>
                          <Link href={`/dashboard/skills-form/${skill.id}`}>
                            <Button 
                              variant="outline"
                              size="icon"
                              title="Edit Skill"
                            >
                              <Edit className={clsx('h-4 w-4 text-[#c0543a] dark:text-primary')} />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            className={clsx('text-destructive')}
                            onClick={() => handleDeleteClick(skill.id)}
                            disabled={isDeleting === skill.id}
                            title="Delete Skill"
                          >
                            {isDeleting === skill.id ? (
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
                        ? 'No matching skills found'
                        : 'No skill found'}
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
            <DialogTitle>Skill Details</DialogTitle>
          </DialogHeader>
          {selectedSkill && (
            <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
              <div className="space-y-6">
                {/* Skill Name */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Skill Name
                  </h3>
                  <p className="text-lg font-semibold">{selectedSkill.name}</p>
                </div>

                {/* Proficiency Level */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Proficiency Level
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Progress value={selectedSkill.level} className="h-3 flex-1 mr-4" />
                      <span className="text-2xl font-bold min-w-[4rem] text-right">
                        {selectedSkill.level}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedSkill.level as number >= 90 ? 'Expert' : 
                       selectedSkill.level as number >= 70 ? 'Advanced' :
                       selectedSkill.level as number >= 50 ? 'Intermediate' :
                       selectedSkill.level as number >= 30 ? 'Basic' : 'Beginner'}
                    </p>
                  </div>
                </div>

                {/* Category */}
                {/* {selectedSkill.category && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Category
                    </h3>
                    <p className="text-base">{selectedSkill.category}</p>
                  </div>
                )} */}

                {/* Description */}
                {selectedSkill.description && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Description
                    </h3>
                    <p className="text-sm leading-relaxed">{selectedSkill.description}</p>
                  </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Created At
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedSkill.createdAt)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Last Updated
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedSkill.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* ID */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Skill ID
                  </h3>
                  <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
                    {selectedSkill.id}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Link
                    href={`/dashboard/skills-form/${selectedSkill.id}`}
                    className="flex-1"
                  >
                    <Button variant="default" className="w-full">
                      <Edit className="mr-2 h-4 w-4 text-[#c0543a] dark:text-primary" />
                      Edit Skill
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