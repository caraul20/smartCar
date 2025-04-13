"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeroCardProps {
  children?: React.ReactNode;
  className?: string;
  imageUrl: string;
  title: string;
  description?: string;
  badges?: Array<{text: string, color: string}>;
  cta?: {
    text: string;
    href: string;
  }
}

export function HeroCard({
  children,
  className,
  imageUrl,
  title,
  description,
  badges = [],
  cta,
}: HeroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10" />
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}
            >
              {badge.text}
            </motion.span>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold leading-tight mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {description}
          </p>
        )}
        
        {children}
        
        {cta && (
          <motion.a
            href={cta.href}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            {cta.text}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        )}
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
    </motion.div>
  );
}
