import { Suspense } from "react";
import BlogGallery from "@/components/frontend/blog/blog-gallery";

export default function page() {
  return (
    <Suspense fallback={<div>Loading articles...</div>}>
      <BlogGallery />
    </Suspense>
  );
}