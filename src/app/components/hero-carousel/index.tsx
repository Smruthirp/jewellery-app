"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/ui/carousel";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/ui/button";

interface HeroSlide {
  imageSrc: string;
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number; // in ms
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(
    undefined,
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const idx = carouselApi.selectedScrollSnap();
      setCurrentIndex(idx);
    };

    // when API is ready
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // Autoplay
  useEffect(() => {
    if (!carouselApi || !autoPlay) return;

    const interval = setInterval(() => {
      const next = (carouselApi.selectedScrollSnap() + 1) % slides.length;
      carouselApi.scrollTo(next);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [carouselApi, autoPlay, slides.length, autoPlayInterval]);

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <Carousel setApi={setCarouselApi} className="w-full">
        <CarouselContent className="w-full">
          {slides.map((slide, idx) => (
            <CarouselItem
              key={idx}
              className="relative h-[93vh] w-full flex-shrink-0"
            >
              {slide.videoSrc ? (
                <video
                  src={slide.videoSrc}
                  autoPlay
                  loop
                  muted
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={slide.imageSrc}
                  alt={slide.title ?? `Slide ${idx + 1}`}
                  fill
                  className="h-full w-full object-cover"
                />
              )}
              {slide.title && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 px-12 text-white">
                  <motion.h2
                    className="text-4xl font-bold"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    key={currentIndex + "-title"}
                  >
                    {slide.title}
                  </motion.h2>
                  {slide.subtitle && (
                    <motion.p
                      className="mt-2 flex flex-col items-center gap-3 text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.6 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      key={currentIndex + "-subtitle"}
                    >
                      {slide.subtitle}
                      {slide.buttonText && (
                        <Button className="w-fit" variant={"white"} size={"lg"}>
                          <span>{slide.buttonText}</span>
                          <ArrowRight size={16} />
                        </Button>
                      )}
                    </motion.p>
                  )}
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
      <div className="absolute bottom-16 left-10 flex items-center space-x-2">
        <Button
          className="rounded-full bg-white/30 p-2 text-white hover:bg-white hover:text-[#18392b]"
          size={"lg"}
          onClick={() => carouselApi?.scrollPrev()}
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          className="rounded-full bg-white/30 p-2 text-white hover:bg-white hover:text-[#18392b]"
          size={"lg"}
          onClick={() => carouselApi?.scrollNext()}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="absolute bottom-12 left-10 h-1 w-44 bg-[#18392b]">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};
