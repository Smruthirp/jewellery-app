"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BannerItem =
  | { type: "text"; value: string }
  | { type: "button"; label: string; href: string };

interface ScrollingBannerProps {
  content: BannerItem[];
  speed?: number;
}

export const ScrollingBanner = ({
  content,
  speed = 30,
}: ScrollingBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(2);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.offsetWidth;

      const needed = Math.ceil(containerWidth / contentWidth) * 4;
      setRepeatCount(needed > 1 ? needed : 2);
    }
  }, [content]);

  const repeatedItems = Array.from(
    { length: repeatCount },
    () => content,
  ).flat();

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-[#18392b] text-white"
    >
      <div
        ref={contentRef}
        className="animate-scroll flex w-max items-center gap-8 px-6 py-3 whitespace-nowrap"
        style={{ animationDuration: `${speed}s` }}
      >
        {repeatedItems.map((item, index) =>
          item.type === "text" ? (
            <span key={`text-${index}`} className="text-base font-medium">
              {item.value}
            </span>
          ) : (
            <Link
              key={`btn-${index}`}
              href={item.href}
              className="inline-block rounded-md border border-white px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-white hover:text-[#18392b]"
            >
              {item.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
};
