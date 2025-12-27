"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import {
  Edit,
  Eye,
  FileSpreadsheet,
  Loader2,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { baseUrl } from "@/types/type";
import { BlogPostCategory } from "@prisma/client";

export default function BlogPostsCategoriesTable({
  title,
  userBlogPostsCategories,
}: {
  title: string;
  userBlogPostsCategories: BlogPostCategory[];
}) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BlogPostCategory | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter categories based on search query
  const filteredUserBlogPostsCategories = useMemo(() => {
    if (!searchQuery.trim()) return userBlogPostsCategories;

    const query = searchQuery.toLowerCase();
    return userBlogPostsCategories.filter(
      (category) =>
        category.title.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query) ||
        category.id.toLowerCase().includes(query)
    );
  }, [userBlogPostsCategories, searchQuery]);

  // Handle view detail click
  const handleViewDetail = (category: BlogPostCategory) => {
    setSelectedCategory(category);
    setIsDetailModalOpen(true);
  };

  // Handle add new click
  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setIsModalOpen(true);
  };

  // Handle delete click
  async function handleDeleteClick(categoryId: string) {
    try {
      if (categoryId) {
        setIsDeleting(categoryId);
      }
      const response = await fetch(
        `${baseUrl}/api/v1/blogPostsCategoryAPI/${categoryId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setIsDeleting(null);
        toast.success("Blog-PostCategory Deleted Successfully");
        router.push("/dashboard/view-blog-posts-categories");
      } else {
        setIsDeleting(null);
        toast.error("Failed To Delete Blog-PostCategory...!!!🥺");
        console.log(response);
      }
    } catch (error) {
      setIsDeleting(null);
      toast.error("Failed to Delete Category", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(
    filteredUserBlogPostsCategories.length / itemsPerPage
  );

  // Format date function
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "MMM dd, yyyy");
  };

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUserBlogPostsCategories.slice(startIndex, endIndex);
  }, [filteredUserBlogPostsCategories, currentPage, itemsPerPage]);

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
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <Card className={clsx("w-full my-4")}>
        <CardHeader
          className={clsx("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4")}
        >
          <div>
            <CardTitle className={clsx("text-xl sm:text-2xl")}>{title}</CardTitle>
            <p className={clsx("text-muted-foreground mt-1 text-sm")}>
              {userBlogPostsCategories.length}{" "}
              {userBlogPostsCategories.length === 1
                ? "Blog-PostsCategory"
                : "Blog-PostsCategories"}
            </p>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleAddNewClick}>
            <Link href="/dashboard/blog-posts-category">
              Add Blog-PostsCategory
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search and Export */}
          <div className={clsx("flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4")}>
            <div className={clsx("relative w-full sm:max-w-sm")}>
              <Search
                className={clsx(
                  "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                )}
              />
              <Input
                placeholder="Search blog-post category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={clsx("pl-8 w-full")}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx("absolute right-1 top-1.5 h-6 w-6")}
                  onClick={() => setSearchQuery("")}
                >
                  <X className={clsx("h-4 w-4")} />
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
                  <Loader2 className={clsx("mr-2 h-4 w-4 animate-spin")} />
                  Exporting...
                </>
              ) : (
                <>
                  <FileSpreadsheet className={clsx("mr-2 h-4 w-4")} />
                  Export to Excel
                </>
              )}
            </Button>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <div>
                        <span className="font-medium">Created:</span>{" "}
                        {formatDate(category.createdAt)}
                      </div>
                      <div>
                        <span className="font-medium">Updated:</span>{" "}
                        {formatDate(category.updatedAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 px-2 py-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetail(category)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Link
                      href={`/dashboard/blog-posts-category/${category.slug}`}
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
                      onClick={() => handleDeleteClick(category.id)}
                      disabled={isDeleting === category.id}
                    >
                      {isDeleting === category.id ? (
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
                  ? "No matching categories found"
                  : "No category found"}
              </Card>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Title</TableHead>
                  <TableHead className="min-w-[250px]">Description</TableHead>
                  <TableHead className="min-w-[120px]">Created At</TableHead>
                  <TableHead className="min-w-[120px]">Updated At</TableHead>
                  <TableHead className="text-right min-w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.length > 0 ? (
                  paginatedCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className={clsx("font-medium")}>
                        <div className="max-w-[200px] truncate">
                          {category.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[300px] truncate">
                          {category.description}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(category.createdAt)}</TableCell>
                      <TableCell>{formatDate(category.updatedAt)}</TableCell>
                      <TableCell className={clsx("text-right")}>
                        <div className={clsx("flex justify-end gap-2")}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetail(category)}
                            title="View Details"
                          >
                            <Eye className={clsx("h-4 w-4")} />
                          </Button>
                          <Link
                            href={`/dashboard/blog-posts-category/${category.slug}`}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              title="Edit Blog-Post Category"
                            >
                              <Edit className={clsx("h-4 w-4")} />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            className={clsx("text-destructive")}
                            onClick={() => handleDeleteClick(category.id)}
                            disabled={isDeleting === category.id}
                            title="Delete Category"
                          >
                            {isDeleting === category.id ? (
                              <Loader2 className={clsx("h-4 w-4 animate-spin")} />
                            ) : (
                              <Trash2 className={clsx("h-4 w-4")} />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className={clsx("text-center py-6")}>
                      {searchQuery
                        ? "No matching categories found"
                        : "No category found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={clsx("mt-4")}>
              <Pagination>
                <PaginationContent className="flex-wrap">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={clsx(
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      )}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, index) =>
                    page === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${index}`} className="hidden sm:block">
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-${page}`}>
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          className={clsx(
                            currentPage === page
                              ? "bg-primary text-primary-foreground"
                              : "cursor-pointer"
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
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
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
            <DialogTitle>Category Details</DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Title
                  </h3>
                  <p className="text-lg font-semibold">{selectedCategory.title}</p>
                </div>

                {/* Slug */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Slug
                  </h3>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {selectedCategory.slug}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Description
                  </h3>
                  <p className="text-sm leading-relaxed">{selectedCategory.description}</p>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Created At
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedCategory.createdAt)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Last Updated
                    </h3>
                    <p className="text-sm">
                      {formatDate(selectedCategory.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* ID */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Category ID
                  </h3>
                  <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
                    {selectedCategory.id}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Link
                    href={`/dashboard/blog-posts-category/${selectedCategory.slug}`}
                    className="flex-1"
                  >
                    <Button variant="default" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Category
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