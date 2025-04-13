"use client";

import React, { useState } from "react";

export const GlowingCard = ({
  children,
  className,
  glowColor = "bg-blue-500",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFocused) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsFocused(true);
    setOpacity(0.15);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  // Extrage culoarea din clasa Tailwind (bg-blue-500 -> blue-500)
  const extractColor = (colorClass: string) => {
    const match = colorClass.match(/bg-([a-z]+-[0-9]+)/);
    return match ? match[1] : 'blue-500';
  };

  const colorName = extractColor(glowColor);

  return (
    <div
      className={`relative rounded-2xl bg-gray-50 dark:bg-gray-800 p-px overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 ${glowColor} blur-2xl transition-opacity duration-500`}
        style={{
          opacity,
          backgroundImage: `radial-gradient(circle at ${position.x}px ${position.y}px, ${getColorValue(colorName)} 0%, transparent 70%)`,
          backgroundSize: "200% 200%",
        }}
      />
      <div className="relative bg-white dark:bg-gray-900 h-full w-full rounded-2xl z-10 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// Funcție pentru a obține valoarea CSS pentru culoare
function getColorValue(colorName: string): string {
  const colorMap: Record<string, string> = {
    'blue-500': 'rgb(59, 130, 246)',
    'green-500': 'rgb(34, 197, 94)',
    'red-500': 'rgb(239, 68, 68)',
    'purple-500': 'rgb(168, 85, 247)',
    'orange-500': 'rgb(249, 115, 22)',
    'yellow-500': 'rgb(234, 179, 8)',
    'pink-500': 'rgb(236, 72, 153)',
    'indigo-500': 'rgb(99, 102, 241)',
  };

  return colorMap[colorName] || 'rgb(59, 130, 246)'; // Albastru implicit
}
