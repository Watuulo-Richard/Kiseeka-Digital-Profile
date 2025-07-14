"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

interface ChromeProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const transition: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};

const variants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...transition,
      delay: 0.1 * custom,
    },
  }),
};

const Chrome = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}: ChromeProps) => {
  const controls = useAnimation();

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <motion.circle
          cx="12"
          cy="12"
          r="4"
          variants={variants}
          animate={controls}
          custom={0}
        />
        <motion.line
          x1="21.17"
          x2="12"
          y1="8"
          y2="8"
          variants={variants}
          animate={controls}
          custom={3}
        />
        <motion.line
          x1="3.95"
          x2="8.54"
          y1="6.06"
          y2="14"
          variants={variants}
          animate={controls}
          custom={3}
        />
        <motion.line
          x1="10.88"
          x2="15.46"
          y1="21.94"
          y2="14"
          variants={variants}
          animate={controls}
          custom={3}
        />
      </svg>
    </div>
  );
};

export { Chrome };
