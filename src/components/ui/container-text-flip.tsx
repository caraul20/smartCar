"use client";

import React from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TypewriterEffectProps {
  words?: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}

export function TypewriterEffect({
  words = [
    { text: "modern" },
    { text: "premium" },
    { text: "fiabil" },
    { text: "rapid" },
    { text: "perfect", className: "text-blue-500" }
  ],
  className,
  cursorClassName,
}: TypewriterEffectProps) {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  
  React.useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  
  return (
    <div
      className={cn(
        "text-left font-sans text-5xl font-bold tracking-tight text-white",
        className
      )}
    >
      <span>Caută ceva </span>
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
}

// For backwards compatibility
export { TypewriterEffect as ContainerTextFlip }; 