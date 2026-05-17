"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "../ui/progress";
import { Skill } from "@prisma/client";

const MAX_CHARS = 120;

function SkillCard({ skill }: { skill: Skill }) {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  const isLong = skill.description.length > MAX_CHARS;
  const displayText =
    !isLong || expanded
      ? skill.description
      : skill.description.slice(0, MAX_CHARS).trimEnd() + "…";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          // Small delay so the card is visible before bar animates
          setTimeout(() => setProgress(skill.level ?? 0), 200);
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [skill.level]);

  return (
    <div ref={cardRef} className="skill-card">
      <Card className="h-full border-t-4 border-t-primary shadow-none hover:shadow-sm transition-shadow duration-300">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">{skill.name}</h3>

          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline">Skill Percentage Level</Badge>
            <span className="gradient-text text-sm font-semibold">
              {skill.level}%
            </span>
          </div>

          <div className="mb-4">
            <Progress
              value={progress}
              className="[&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-out"
            />
          </div>

          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                {displayText}
              </span>
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
        </CardContent>
      </Card>
    </div>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Skills
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My expertise and technical proficiencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
