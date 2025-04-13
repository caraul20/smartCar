"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  rotation?: number;
  gradient?: string;
  isFeatured?: boolean;
}

export function BentoCard({
  className,
  children,
  thumbnailUrl,
  title,
  description,
  rotation = 0,
  gradient = "from-blue-500/20 to-blue-700/20",
  isFeatured = false,
}: BentoCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const containerClasses = cn(
    "group relative h-full w-full overflow-hidden rounded-3xl border border-transparent dark:border-white/[0.2] bg-slate-100 dark:bg-slate-800/50 p-6 transition-all duration-300",
    isFeatured && "md:col-span-2 md:row-span-2 bg-gradient-to-br",
    gradient && isFeatured && `bg-gradient-to-br ${gradient}`,
    className
  );

  return (
    <motion.div
      ref={divRef}
      className={containerClasses}
      whileHover={{ scale: 1.01, rotate: rotation }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsFocused(true);
        setOpacity(1);
      }}
      onMouseLeave={() => {
        setIsFocused(false);
        setOpacity(0);
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.8
      }}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10 h-full">
        {thumbnailUrl && (
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 rounded-full bg-opacity-50 blur-3xl filter group-hover:opacity-70 transition-opacity" 
               style={{ background: `radial-gradient(circle at center, ${gradient.split("from-")[1]?.split("/")[0] || 'blue-500'}, transparent 70%)` }} 
          />
        )}
        
        {thumbnailUrl && (
          <div className="mb-4 overflow-hidden rounded-xl relative aspect-video">
            <Image
              src={thumbnailUrl}
              alt={title || "Card image"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="flex flex-col h-full">
          {title && (
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </motion.div>
  );
}
