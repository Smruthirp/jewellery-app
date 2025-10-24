"use client";

import { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { cn } from "@/app/lib/tailwind";

interface ScrollingBannerProps {
  bannerText: string;
  classname?: string;
}

export const ScrollingBanner = ({
  bannerText,
  classname,
}: ScrollingBannerProps) => {
  const baseVelocity = -100;
  const repeatCount = 10;
  const repeatedText = Array.from({ length: repeatCount }).map((_, i) => (
    <span key={i} className="px-2">
      {bannerText}
    </span>
  ));
  const x = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((t, delta) => {
    if (!containerRef.current) return;
    const width = containerRef.current.scrollWidth / 2;
    x.current += (baseVelocity * delta) / 1000;
    if (x.current <= -width) x.current = 0;
    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div
      className={cn(
        `relative overflow-hidden bg-[#18392b] py-3 text-nowrap text-white`,
        classname,
      )}
    >
      <motion.div
        ref={containerRef}
        className="flex space-x-8"
        style={{ willChange: "transform" }}
      >
        {repeatedText}
        {repeatedText}
      </motion.div>
    </div>
  );
};
