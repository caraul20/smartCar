"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  accentColor?: string;
  variant?: "bordered" | "glass" | "filled";
}

export function AnimatedCard({
  children,
  className,
  imageSrc,
  imageAlt = "Card image",
  title,
  subtitle,
  footer,
  accentColor = "rgba(59, 130, 246, 0.5)", // blue-500 with transparency
  variant = "bordered",
}: AnimatedCardProps) {
  const variants = {
    bordered: "border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-900",
    glass: "bg-white/30 dark:bg-slate-900/30 backdrop-blur-md border border-white/30 dark:border-slate-800/30",
    filled: "bg-white dark:bg-slate-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className={cn(
        "relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {/* Accent glow */}
      <div 
        className="absolute top-0 left-0 h-2 w-full transition-all duration-300 group-hover:h-3"
        style={{ background: accentColor }}
      />
      
      {/* Image */}
      {imageSrc && (
        <div className="relative w-full overflow-hidden">
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-48 object-cover"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      {/* Content */}
      <div className="p-5">
        {title && (
          <motion.h3 
            className="text-lg font-semibold text-slate-900 dark:text-white mb-1"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
        )}
        
        {subtitle && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            {subtitle}
          </p>
        )}
        
        <div className="text-slate-700 dark:text-slate-300">
          {children}
        </div>
        
        {footer && (
          <div className="border-t border-slate-200 dark:border-slate-700 mt-4 pt-4">
            {footer}
          </div>
        )}
      </div>
      
      {/* Animated border on hover for bordered variant */}
      {variant === "bordered" && (
        <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-0 right-0 w-full h-full -mt-1 -mr-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
