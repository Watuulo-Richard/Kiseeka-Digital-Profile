/* eslint-disable @next/next/no-img-element */

import { BlogPostAndRelatedBlogPostType } from "@/types/type";
import Link from "next/link";

const formatDate = (date: Date | string): string => {
  // Convert to Date object if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface ReadMoreSectionProps {
  relatedPosts: BlogPostAndRelatedBlogPostType;
}

export function ReadMoreSection({
  relatedPosts
}: ReadMoreSectionProps) {

  if (relatedPosts.relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border p-0">
      <div className="p-6 lg:p-10">
        <h2 className="text-2xl font-medium mb-8">Read more</h2>

        <div className="flex flex-col gap-8">
          {relatedPosts.relatedBlogs.map((post) => {
            const formattedDate = formatDate(post.createdAt);

            return (
              <Link
                key={post.id}
                href="{post.url}"
                className="group grid grid-cols-1 lg:grid-cols-12 items-center gap-4 cursor-pointer"
              >
                {post.image && (
                  <div className="flex-shrink-0 col-span-1 lg:col-span-4">
                    <div className="relative w-full h-full">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2 flex-1 col-span-1 lg:col-span-8">
                  <h3 className="text-lg group-hover:underline underline-offset-4 font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 group-hover:underline underline-offset-4">
                    {post.excerpt}
                  </p>
                  <time className="block text-xs font-medium text-muted-foreground">
                    {formattedDate}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
