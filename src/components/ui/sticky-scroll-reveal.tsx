"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  imagePosition = "left",
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  imagePosition?: "left" | "right";
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div
      className={cn(
        "relative flex w-full justify-center gap-10 lg:gap-20 py-10",
        imagePosition === "left" ? "flex-row-reverse" : "flex-row"
      )}
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-16 lg:my-32 flex flex-col justify-center lg:min-h-[380px]">
              <h2
                className={cn(
                  "text-3xl font-bold text-gray-900 transition-opacity duration-300",
                  activeCard === index ? "opacity-100" : "opacity-40 lg:opacity-20"
                )}
              >
                {item.title}
              </h2>
              <p
                className={cn(
                  "text-xl mt-6 max-w-md text-gray-600 leading-relaxed transition-opacity duration-300",
                  activeCard === index ? "opacity-100" : "opacity-40 lg:opacity-20"
                )}
              >
                {item.description}
              </p>
              
              {/* Mobile image display */}
              <div className="block lg:hidden mt-8 w-full max-w-md rounded-2xl overflow-hidden aspect-[3/2] relative">
                 <div className="absolute inset-0">
                   {item.content ?? null}
                 </div>
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "sticky top-32 hidden h-[380px] w-[570px] shrink-0 self-start overflow-visible rounded-2xl lg:block",
          contentClassName,
        )}
      >
        <div className="h-full w-full overflow-hidden rounded-[inherit]">
          {content[activeCard].content ?? null}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 rounded-full border border-black bg-white px-2.5 py-3 shadow-lg",
            imagePosition === "left" ? "-right-5" : "-left-5"
          )}
        >
          {content.map((item, index) => (
            <span
              key={`${item.title}-indicator`}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                activeCard === index
                  ? "scale-125 bg-black"
                  : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
