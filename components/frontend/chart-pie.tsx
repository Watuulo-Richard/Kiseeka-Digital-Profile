"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";

interface ChartPieProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const pathVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: { translateX: 1.1, translateY: -1.1 },
};

const ChartPie = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#F2B5A0",
  ...props
}: ChartPieProps) => {
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
        {...props}
      >
        <motion.path
          d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 15,
            bounce: 0.6,
          }}
          variants={pathVariants}
          animate={controls}
        />
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      </svg>
    </div>
  );
};

export { ChartPie };
