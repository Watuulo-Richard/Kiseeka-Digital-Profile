/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { BlogPostAndRelatedBlogPostType } from "@/types/type";

export function AuthorCard({ blog }: { blog: BlogPostAndRelatedBlogPostType }) {
  return (
    <div className={cn("flex items-start gap-3")}>
      <img
        src={blog.blogPost.portfolio.profileImage}
        alt={blog.blogPost.portfolio.title}
        className="rounded-full w-10 h-10 border border-border object-cover"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm tracking-tight text-balance font-semibold">
          {blog.blogPost.portfolio.title}
        </h3>
        {blog.blogPost.portfolio.bio && (
          <p className="text-xs text-muted-foreground text-balance line-clamp-1">
            {blog.blogPost.portfolio.bio}
          </p>
        )}
      </div>
    </div>
  );
}
