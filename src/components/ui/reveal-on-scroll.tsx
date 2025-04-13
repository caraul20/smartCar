"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  distance?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  width = "fit-content",
  className = "",
  delay = 0.2,
  direction = "up",
  duration = 0.5,
  distance = 50,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Configure motion variants based on direction
  const getDirectionalVariants = (): Variants => {
    let variants: Variants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration: duration, 
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1.0] 
        } 
      },
    };
    
    switch (direction) {
      case "up":
        variants = {
          hidden: { opacity: 0, y: distance },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: duration, 
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1.0] 
            } 
          }
        };
        break;
      case "down":
        variants = {
          hidden: { opacity: 0, y: -distance },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: duration, 
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1.0] 
            } 
          }
        };
        break;
      case "left":
        variants = {
          hidden: { opacity: 0, x: distance },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: duration, 
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1.0] 
            } 
          }
        };
        break;
      case "right":
        variants = {
          hidden: { opacity: 0, x: -distance },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: duration, 
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1.0] 
            } 
          }
        };
        break;
      default:
        variants = {
          hidden: { opacity: 0, y: distance },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: duration, 
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1.0] 
            } 
          }
        };
    }
    
    return variants;
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);

  return (
    <div ref={ref} className={className} style={{ width }}>
      <motion.div
        variants={getDirectionalVariants()}
        initial="hidden"
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
};
