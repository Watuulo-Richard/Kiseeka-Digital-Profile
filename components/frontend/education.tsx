"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Education } from "@prisma/client";
import { GraduationCap } from "lucide-react";
import { Badge } from "../ui/badge";

const MAX_CHARS = 120;

function EducationCard({ educationBackground }: { educationBackground: Education }) {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "MMM dd, yyyy");
  };

  const desc = educationBackground.description ?? "";
  const isLong = desc.length > MAX_CHARS;
  const displayText =
    !isLong || expanded ? desc : desc.slice(0, MAX_CHARS).trimEnd() + "…";

  return (
    <Card className="overflow-hidden shadow-none hover:shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50">
      <CardContent className="p-0">
        <div className="bg-primary/10 p-6 flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {educationBackground.educationLevel}
            </h3>
            <p className="text-muted-foreground">
              {educationBackground.institution}
            </p>
            <div className="mt-2 flex flex-col md:items-start">
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <Badge variant="outline">
                  {formatDate(educationBackground.startDate || "")}
                </Badge>
                <span className="hidden lg:block text-sm gradient-text">to</span>
                <Badge variant="outline">
                  {educationBackground.endDate
                    ? formatDate(educationBackground.endDate)
                    : ""}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-muted-foreground">{displayText}</p>
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 text-xs font-semibold text-primary hover:underline focus:outline-none"
            >
              {expanded ? "Less" : "More"}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function EducationBackground({
  educationBackgrounds,
}: {
  educationBackgrounds: Education[];
}) {
  return (
    <section id="education" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Education
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and qualifications
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto">
            {educationBackgrounds.map((edu) => (
              <EducationCard key={edu.id} educationBackground={edu} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
