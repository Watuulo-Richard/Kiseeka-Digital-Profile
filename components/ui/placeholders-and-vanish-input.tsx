"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type PlaceholdersAndVanishInputProps = {
  placeholders: string[];
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

type Particle = {
  x: number;
  y: number;
  r: number;
  color: string;
};

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: PlaceholdersAndVanishInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const newDataRef = useRef<Particle[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startPlaceholderRotation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      startPlaceholderRotation();
    }
  };

  useEffect(() => {
    startPlaceholderRotation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const input = inputRef.current;
    if (!canvas || !input) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);

    const computedStyles = getComputedStyle(input);
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixels = imageData.data;
    const particles: Particle[] = [];

    for (let y = 0; y < 800; y++) {
      for (let x = 0; x < 800; x++) {
        const offset = (y * 800 + x) * 4;
        const r = pixels[offset];
        const g = pixels[offset + 1];
        const b = pixels[offset + 2];
        const a = pixels[offset + 3];
        if (r !== 0 && g !== 0 && b !== 0) {
          particles.push({
            x,
            y,
            r: 1,
            color: `rgba(${r}, ${g}, ${b}, ${a})`,
          });
        }
      }
    }

    newDataRef.current = particles;
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animateDisintegration = (startX: number) => {
    const animateFrame = (position: number = 0) => {
      requestAnimationFrame(() => {
        const remaining: Particle[] = [];

        for (const particle of newDataRef.current) {
          if (particle.x < position) {
            remaining.push(particle);
          } else {
            if (particle.r <= 0) {
              continue;
            }
            particle.x += Math.random() > 0.5 ? 1 : -1;
            particle.y += Math.random() > 0.5 ? 1 : -1;
            particle.r -= 0.05 * Math.random();
            remaining.push(particle);
          }
        }

        newDataRef.current = remaining;

        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(position, 0, 800, 800);
          for (const particle of remaining) {
            if (particle.x > position) {
              ctx.beginPath();
              ctx.rect(particle.x, particle.y, particle.r, particle.r);
              ctx.fillStyle = particle.color;
              ctx.strokeStyle = particle.color;
              ctx.stroke();
            }
          }
        }

        if (remaining.length > 0) {
          animateFrame(position - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };

    animateFrame(startX);
  };

  const submitValue = (submittedValue: string) => {
    setAnimating(true);
    onSubmit?.(submittedValue);
    draw();

    if (submittedValue && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (max, particle) => (particle.x > max ? particle.x : max),
        0
      );
      animateDisintegration(maxX);
    } else {
      setValue("");
      setAnimating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (animating) return;
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!animating) {
        submitValue(inputRef.current?.value ?? "");
      }
    }
  };

  return (
    <div
      className={cn(
        "w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
        value && "bg-gray-50"
      )}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
          animating && "text-transparent dark:text-transparent"
        )}
      />

      <button
        type="button"
        disabled={!value || animating}
        onClick={() => submitValue(value)}
        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300 h-4 w-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{
              strokeDasharray: "50%",
              strokeDashoffset: "50%",
            }}
            animate={{
              strokeDashoffset: value ? 0 : "50%",
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}