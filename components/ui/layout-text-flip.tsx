"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type LayoutTextFlipProps = {
  text: string;
  words: string[];
  duration?: number;
  wordClassName?: string;
};

export const LayoutTextFlip = ({
  text,
  words,
  duration = 3000,
  wordClassName,
}: LayoutTextFlipProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <span className="inline-flex items-baseline gap-x-2 whitespace-nowrap">
      <span>{text}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className={cn("inline-block whitespace-nowrap", wordClassName)}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};