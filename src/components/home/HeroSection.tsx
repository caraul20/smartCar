'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "fixed";
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={targetRef} className="relative w-full h-screen">
      <motion.div
        style={{ opacity, scale, y, position }}
        className="w-full h-screen flex flex-col items-center justify-center relative"
      >
        {/* Background with parallax effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full z-0"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
        >
          <Image 
            src="/images/hero-bg.jpg" 
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
            >
              Călătorește în stil cu <span className="text-blue-500">SmartCar</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-200 mb-8"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -25]) }}
            >
              Găsește mașina perfectă pentru orice ocazie, la prețuri competitive.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, 25]) }}
            >
              <Link href="/rent" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 w-full sm:w-auto">
                Închiriază acum
              </Link>
              <Link href="/buy" className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-200 w-full sm:w-auto">
                Cumpără mașini
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-3 bg-white rounded-full"
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* This spacer keeps the layout flowing after the "fixed" hero */}
      <div className="h-screen w-full" />
    </div>
  );
} 