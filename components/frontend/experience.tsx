"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Skills from "./skills";
import { Skill, WorkExperience } from "@prisma/client";
import { format } from "date-fns";

const MAX_CHARS = 120;

function ExperienceCard({
  experience,
  formatDate,
}: {
  experience: WorkExperience;
  formatDate: (date: Date | string) => string;
}) {
  const [expanded, setExpanded] = useState(false);

  const desc = experience.description ?? "";
  const isLong = desc.length > MAX_CHARS;
  const displayText =
    !isLong || expanded ? desc : desc.slice(0, MAX_CHARS).trimEnd() + "…";

  return (
    <div className="timeline-item">
      <Card className="border-l-4 border-l-primary shadow-none hover:shadow-sm transition-all duration-300 hover:border-primary/60">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{experience.position}</h3>
              <p className="text-muted-foreground">{experience.company}</p>
            </div>
            <div className="mt-2 md:mt-0 flex flex-col md:items-end">
              <Badge variant="outline">
                {formatDate(experience.startDate)}
              </Badge>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            <li className="flex items-start max-w-4xl">
              <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{displayText}</span>
            </li>
          </ul>

          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 ml-4 text-xs font-semibold text-primary hover:underline focus:outline-none"
            >
              {expanded ? "Less" : "More"}
            </button>
          )}

          <div className="mt-3 flex flex-col md:items-end">
            <Badge variant="outline" className="text-sm text-muted-foreground">
              Ended on{" "}
              {experience.endDate ? formatDate(experience.endDate) : "Present"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Experience({
  fetchedWorkExperiences,
  skills,
}: {
  fetchedWorkExperiences: WorkExperience[];
  skills: Skill[];
}) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "MMM dd, yyyy");
  };

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Experience
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My professional journey and key accomplishments
            </p>
          </div>

          <div className="space-y-8 mt-12">
            {fetchedWorkExperiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                formatDate={formatDate}
              />
            ))}
          </div>

          <div className="mt-20" id="skills">
            <Skills skills={skills} />
          </div>
        </div>
      </div>
    </section>
  );
}
