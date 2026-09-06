"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type TextGenerateEffectProps = {
  words: string;
  className?: string;
  textClassName?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
};

export const TextGenerateEffect = ({
  words,
  className,
  textClassName,
  filter = true,
  duration = 1,
  staggerDelay = 0.2,
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!isInView) return;
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration,
        delay: stagger(staggerDelay),
      }
    );
  }, [isInView, filter, duration, staggerDelay]);

  return (
    <div className={cn("font-bold", className)}>
      <div
        className={cn(
          textClassName ||
            "text-black text-2xl leading-snug tracking-wide dark:text-white"
        )}
      >
        <motion.div ref={scope}>
          {wordsArray.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};