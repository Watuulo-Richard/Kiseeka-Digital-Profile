"use client";

import GalleryComp from "@/components/frontend/dome-gallery/gallery-comp";
import EducationBackground from "@/components/frontend/education";
import { useWorkExperiences } from "@/hooks/use-work-experiences";
import Testimonials from "@/components/frontend/testimonials";
import ScrollToTop from "@/components/frontend/scroll-to-top";
import Experience from "@/components/frontend/experience";
import { useGalleryImages } from "@/hooks/use-gallery";
import { useEducation } from "@/hooks/use-education";
import Contact from "@/components/frontend/contact";
import Header from "@/components/frontend/header";
import { useProfile } from "@/hooks/use-profile";
import About from "@/components/frontend/about";
import { useSkills } from "@/hooks/use-skills";
import Hero from "@/components/frontend/hero";
import Blog from "@/components/frontend/blog";

export default function HomeContent({
  isAdmin,
}: {
  isAdmin?: boolean;
}) {
  const { profile, isLoading } = useProfile();
  const { listWorkExperiences } = useWorkExperiences();
  const { listSkills } = useSkills();
  const { listEducation } = useEducation();
  const { listGalleryImages } = useGalleryImages();

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading portfolio...</p>
      </div>
    );
  }

  const galleryImages = listGalleryImages.map((image) => ({
    src: image.src,
    alt: image.alt,
  }));

  return (
    <div className="w-full">
      <Header isAdmin={isAdmin} />
      {profile && <Hero fetchedProfile={profile} />}
      {profile && <About fetchedProfile={profile} />}
      <Experience
        fetchedWorkExperiences={listWorkExperiences}
        skills={listSkills}
      />
      <EducationBackground educationBackgrounds={listEducation} />
      <Testimonials />
      <GalleryComp images={galleryImages} />
      <Blog />
      {profile && <Contact fetchedProfile={profile} />}
      <ScrollToTop />
    </div>
  );
}