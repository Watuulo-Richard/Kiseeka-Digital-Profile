"use client";
import { useEffect, useState } from "react";
import DomeGallery from "./gallery";

export default function GalleryComp() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const bgColor = isDark ? "#000000" : "#fbebe5";

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="pb-6 pt-10 container px-4 md:px-6 mx-auto">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Gallery
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A visual journey through moments and milestones
          </p>
        </div>
      </div>

      <div className="relative w-full" style={{ height: "100vh" }}>
        <DomeGallery
          overlayBlurColor={bgColor}
          grayscale={false}
          imageBorderRadius="16px"
          openedImageBorderRadius="16px"
        />

        {/* Smooth fade at the top */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: "180px",
            background: `linear-gradient(to bottom, ${bgColor} 0%, transparent 100%)`,
          }}
        />
        {/* Smooth fade at the bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: "180px",
            background: `linear-gradient(to top, ${bgColor} 0%, transparent 100%)`,
          }}
        />
      </div>
    </section>
  );
}
