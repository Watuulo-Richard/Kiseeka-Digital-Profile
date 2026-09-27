"use client";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import { toast } from "sonner";
import {
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Eye,
  FileSpreadsheet,
  Loader2,
  MoreVertical,
  Pencil,
  RefreshCw,
  Search,
  Trash2,
  X,
  Briefcase,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useWorkExperiences } from "@/hooks/use-work-experiences";
import { WorkExperienceBaseType } from "@/types/work-experience";
import { WorkExperienceForm } from "@/components/backend/tables/work-experience/work-experience-form";
import WorkExperienceDetailDialog from "./work-experience-detail";

/* Sort types */
type SortField = "position" | "company" | "date";
type SortDirection = "asc" | "desc" | null;

interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

function SortableHead({
  field,
  label,
  sortState,
  onSort,
  className,
}: {
  field: SortField;
  label: string;
  sortState: SortState;
  onSort: (field: SortField) => void;
  className?: string;
}) {
  const isActive = sortState.field === field;
  const direction = isActive ? sortState.direction : null;

  return (
    <TableHead
      className={clsx(
        "cursor-pointer select-none whitespace-nowrap text-xs font-medium uppercase text-gray-500 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90",
        className,
      )}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        <span className="ml-1 flex flex-col">
          {direction === "asc" ? (
            <ChevronUp className="h-4 w-4 text-[#F2B5A0]" />
          ) : direction === "desc" ? (
            <ChevronDown className="h-4 w-4 text-[#F2B5A0]" />
          ) : (
            <ArrowUpDown className="h-4 w-4 text-[#c0543a] opacity-60" />
          )}
        </span>
      </div>
    </TableHead>
  );
}

export default function WorkExperienceTable({
  title,
  userId,
}: {
  title: string;
  userId: string;
}) {
  const {
    listWorkExperiences,
    isLoading,
    error,
    refetch,
    deleteWorkExperience,
    isDeleting,
    deletingId,
  } = useWorkExperiences();

  const [isRefetching, setIsRefetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortState, setSortState] = useState<SortState>({
    field: null,
    direction: null,
  });

  // Add / Edit dialog
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Detail dialog
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);

  // Delete confirmation dialog
  const [deleteTarget, setDeleteTarget] = useState<WorkExperienceBaseType | null>(
    null,
  );

  const itemsPerPage = 10;

  function handleSort(field: SortField) {
    setSortState((prev) => {
      if (prev.field !== field) return { field, direction: "asc" };
      if (prev.direction === "asc") return { field, direction: "desc" };
      if (prev.direction === "desc") return { field: null, direction: null };
      return { field, direction: "asc" };
    });
    setCurrentPage(1);
  }

  const filteredWorkExperiences = useMemo(() => {
    if (!searchQuery.trim()) return listWorkExperiences;
    const query = searchQuery.toLowerCase();
    return listWorkExperiences.filter(
      (workExperience) =>
        workExperience.position.toLowerCase().includes(query) ||
        workExperience.id.toLowerCase().includes(query) ||
        workExperience.company.toLowerCase().includes(query),
    );
  }, [listWorkExperiences, searchQuery]);

  const sortedWorkExperiences = useMemo(() => {
    if (!sortState.field || !sortState.direction) return filteredWorkExperiences;

    return [...filteredWorkExperiences].sort((a, b) => {
      let aVal = "";
      let bVal = "";

      switch (sortState.field) {
        case "position":
          aVal = a.position;
          bVal = b.position;
          break;
        case "company":
          aVal = a.company;
          bVal = b.company;
          break;
        case "date":
          aVal = new Date(a.startDate).toISOString();
          bVal = new Date(b.startDate).toISOString();
          break;
      }

      const cmp = aVal.localeCompare(bVal);
      return sortState.direction === "asc" ? cmp : -cmp;
    });
  }, [filteredWorkExperiences, sortState]);

  const paginatedWorkExperiences = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedWorkExperiences.slice(start, start + itemsPerPage);
  }, [sortedWorkExperiences, currentPage]);

  const totalPages = Math.ceil(sortedWorkExperiences.length / itemsPerPage);

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Present";
    const d = typeof date === "string" ? new Date(date) : date;
    return format(d, "MMM dd, yyyy");
  };

  async function handleRefetch() {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
    toast.success("Work experiences refreshed...✅");
  }

  const exportToCsv = async () => {
    const rows = [
      ["Position", "Company", "Start Date", "End Date"],
      ...sortedWorkExperiences.map((workExperience) => [
        workExperience.position,
        workExperience.company,
        formatDate(workExperience.startDate),
        formatDate(workExperience.endDate),
      ]),
    ];
    const csvContent = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    try {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `WorkExperiences_${format(new Date(), "yyyy-MM-dd")}.csv`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      toast.success("Export Successful", {
        description: "Work experiences exported to CSV.",
      });
    } catch (err) {
      toast.error("Export Failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  function handleAddClick() {
    setEditingId(null);
    setFormOpen(true);
  }

  function handleEditClick(workExperience: WorkExperienceBaseType) {
    setEditingId(workExperience.id);
    setFormOpen(true);
  }

  function handleViewClick(workExperience: WorkExperienceBaseType) {
    setDetailId(workExperience.id);
    setDetailOpen(true);
  }

  function handleConfirmDelete() {
    if (!deleteTarget || isDeleting) return;
    deleteWorkExperience(deleteTarget.id, {
      onSuccess: (response) => {
        if (response.success) {
          setDeleteTarget(null);
          toast.success(response.message || "Work Experience Deleted Successfully...✅");
        } else {
          setDeleteTarget(null);
          toast.error(response.message || "Failed To Delete Work Experience...🥺");
        }
      },
      onError: (error) => {
        setDeleteTarget(null);
        toast.error(
          "❌ Error! Something went wrong while processing your request. ⚠️",
        );
        console.error(error);
      },
    });
  }

  const handlePageChange = (page: number) => setCurrentPage(page);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("ellipsis");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("ellipsis");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("ellipsis");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  if (isLoading) {
    return (
      <Card className="my-0 w-full max-w-none overflow-hidden rounded-2xl border border-[#F2B5A0]/30 bg-[#fff8f4] shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-7 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-white/5" />
              <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-white/5" />
            </div>
            <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200 dark:bg-white/5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-white/5"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="my-0 w-full max-w-none overflow-hidden rounded-2xl border border-[#F2B5A0]/30 bg-[#fff8f4] shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
        <CardContent className="flex items-center justify-center py-16">
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="my-0 w-full max-w-none overflow-hidden rounded-2xl border border-[#F2B5A0]/30 bg-[#fff8f4] shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
        <CardHeader className="flex flex-col items-start justify-between gap-6 border-b border-[#F2B5A0]/20 px-5 py-6 dark:border-gray-800 sm:flex-row sm:items-center sm:px-6">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
              {title}
            </CardTitle>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {sortedWorkExperiences.length}{" "}
              {sortedWorkExperiences.length === 1 ? "work experience" : "work experiences"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefetch}
              disabled={isRefetching}
              title="Refresh work experiences"
              className="rounded-lg border-gray-200 bg-white shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-transparent dark:hover:bg-white/5"
            >
              <RefreshCw
                className={clsx(
                  "h-4 w-4 text-[#c0543a] dark:text-primary",
                  isRefetching && "animate-spin",
                )}
              />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button
              onClick={handleAddClick}
              className="rounded-lg bg-[#F2B5A0] text-white shadow hover:bg-rose-300"
            >
              <Briefcase className="h-4 w-4" />
              Add Work Experience
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-6 sm:px-6">
          <div className="mb-6 flex flex-col items-stretch justify-between gap-4 border-b border-[#F2B5A0]/20 py-5 dark:border-gray-800 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c0543a] dark:text-primary" />
              <Input
                placeholder="Search by position, company, or ID..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 w-full rounded-lg border-gray-200 bg-white pl-9 pr-10 text-sm shadow-sm dark:border-gray-800 dark:bg-transparent dark:text-white/90"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={exportToCsv}
              disabled={sortedWorkExperiences.length === 0}
              className="h-10 w-full shrink-0 rounded-lg border-gray-200 bg-white px-4 text-sm text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5 sm:w-auto"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4 text-[#c0543a] dark:text-primary" />
              <span className="hidden sm:inline">Export to CSV</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>

          {/* ── Desktop Table ── */}
          <div className="hidden md:block">
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#F2B5A0]/15 hover:bg-transparent dark:border-gray-800">
                    <SortableHead
                      field="position"
                      label="Position"
                      sortState={sortState}
                      onSort={handleSort}
                    />
                    <SortableHead
                      field="company"
                      label="Company"
                      sortState={sortState}
                      onSort={handleSort}
                    />
                    <SortableHead
                      field="date"
                      label="Start Date"
                      sortState={sortState}
                      onSort={handleSort}
                    />
                    <TableHead className="whitespace-nowrap text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      End Date
                    </TableHead>
                    <TableHead className="text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedWorkExperiences.length > 0 ? (
                    paginatedWorkExperiences.map((workExperience: WorkExperienceBaseType) => (
                      <TableRow
                        key={workExperience.id}
                        className="border-[#F2B5A0]/15 dark:border-gray-800"
                      >
                        <TableCell className="max-w-[320px] truncate text-sm text-gray-700 dark:text-gray-300">
                          {workExperience.position || "—"}
                        </TableCell>
                        <TableCell className="max-w-[260px] truncate text-sm text-gray-700 dark:text-gray-300">
                          {workExperience.company || "—"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(workExperience.startDate)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(workExperience.endDate)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                              >
                                <MoreVertical className="h-4 w-4 text-[#c0543a] dark:text-primary" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-xl border-gray-200 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-[#0F0F12]"
                            >
                              <DropdownMenuItem
                                className="cursor-pointer text-sm text-gray-700 focus:text-gray-900 dark:text-gray-300 dark:focus:text-white"
                                onClick={() => handleViewClick(workExperience)}
                              >
                                <Eye className="mr-2 h-4 w-4 text-[#c0543a] dark:text-primary" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-sm text-gray-700 focus:text-gray-900 dark:text-gray-300 dark:focus:text-white"
                                onClick={() => handleEditClick(workExperience)}
                              >
                                <Pencil className="mr-2 h-4 w-4 text-[#c0543a] dark:text-primary" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-sm text-destructive focus:text-destructive"
                                onClick={() => setDeleteTarget(workExperience)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        {searchQuery
                          ? "No matching work experiences found"
                          : "No work experiences found"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* ── Mobile Card View ── */}
          <div className="space-y-3 md:hidden">
            {paginatedWorkExperiences.length > 0 ? (
              paginatedWorkExperiences.map((workExperience: WorkExperienceBaseType) => (
                <Card
                  key={workExperience.id}
                  className="rounded-2xl border border-gray-200 p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#F2B5A0]/30 bg-[#F2B5A0]/10">
                        <Briefcase className="h-6 w-6 text-[#f2957a]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-gray-800 dark:text-white/90">
                          {workExperience.position || "Work experience"}
                        </div>
                        <div className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {workExperience.company || "—"}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(workExperience.startDate)} — {formatDate(workExperience.endDate)}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 shrink-0 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                          <MoreVertical className="h-4 w-4 text-[#c0543a] dark:text-primary" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="rounded-xl border-gray-200 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-[#0F0F12]"
                      >
                        <DropdownMenuItem
                          className="cursor-pointer text-sm text-gray-700 focus:text-gray-900 dark:text-gray-300 dark:focus:text-white"
                          onClick={() => handleViewClick(workExperience)}
                        >
                          <Eye className="mr-2 h-4 w-4 text-[#c0543a] dark:text-primary" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-sm text-gray-700 focus:text-gray-900 dark:text-gray-300 dark:focus:text-white"
                          onClick={() => handleEditClick(workExperience)}
                        >
                          <Pencil className="mr-2 h-4 w-4 text-[#c0543a] dark:text-primary" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-sm text-destructive focus:text-destructive"
                          onClick={() => setDeleteTarget(workExperience)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="rounded-2xl border border-gray-200 p-6 text-center dark:border-gray-800 dark:bg-white/[0.03]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery
                    ? "No matching work experiences found"
                    : "No work experiences found"}
                </p>
              </Card>
            )}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent className="flex-wrap justify-center gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {getPageNumbers().map((page, index) =>
                    page === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-${page}`}>
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          className={
                            currentPage === page
                              ? "cursor-pointer bg-[#F2B5A0] text-white shadow hover:bg-rose-300"
                              : "cursor-pointer text-gray-600 dark:text-gray-400"
                          }
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
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit dialog */}
      <WorkExperienceForm
        userId={userId}
        workExperienceId={editingId ?? undefined}
        open={formOpen}
        onOpenChange={(open: boolean) => {
          setFormOpen(open);
          if (!open) setEditingId(null);
        }}
      />

      {/* Detail dialog */}
      {detailId && (
        <WorkExperienceDetailDialog
          workExperienceId={detailId}
          open={detailOpen}
          onOpenChange={setDetailOpen}
        />
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent className="max-w-sm rounded-2xl border-gray-200 bg-white shadow-lg dark:border-[#1F1F23] dark:bg-[#0F0F12]">
          <DialogHeader className="text-left">
            <DialogTitle className="text-gray-900 dark:text-white">
              Delete work experience?
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              This permanently removes &quot;
              {deleteTarget?.position || "this position"}&quot; at {deleteTarget?.company || "this company"} from your portfolio. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-lg border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 dark:border-[#1F1F23] dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5 sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="w-full rounded-lg sm:w-auto"
            >
              {isDeleting ? (
                <>
                  <span>Deleting...</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}