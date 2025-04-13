"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimatedGradientBackground = ({
  children,
  className,
  containerClassName,
  colors = ["#22577a", "#38a3a5", "#57cc99", "#80ed99"],
  duration = 10,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  duration?: number;
}) => {
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at ${
                  30 + (index * 40) % 100
                }% ${(index * 30) % 100}%, ${color} 0%, transparent 60%)`,
              }}
              animate={{
                x: [
                  `${(index * 10) % 100}%`,
                  `${(index * 10 + 50) % 100}%`,
                  `${(index * 10) % 100}%`,
                ],
                y: [
                  `${(index * 20) % 100}%`,
                  `${(index * 20 + 30) % 100}%`,
                  `${(index * 20) % 100}%`,
                ],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            />
          ))}
        </div>
      </div>
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
};
