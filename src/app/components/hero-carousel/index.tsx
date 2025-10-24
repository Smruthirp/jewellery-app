"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { NavButton, usePrevNextButtons } from "@/app/ui/carousel-arrow-buttons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronRightIcon } from "lucide-react";
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
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: autoPlayInterval, stopOnInteraction: false }),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const onNavButtonClick = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay || !autoPlay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
    },
    [autoPlay],
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setCurrentIndex(idx);
    };
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-screen overflow-hidden bg-black">
      <div className="h-screen overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y touch-pinch-zoom">
          {slides.map((slide, idx) => (
            <div
              key={`Slide ${idx + 1}`}
              className="relative h-full min-w-0 flex-shrink-0 flex-grow-0"
              style={{ flex: "0 0 100%" }}
            >
              {slide.videoSrc ? (
                <video
                  src={slide.videoSrc}
                  autoPlay
                  loop
                  muted
                  className="size-full object-cover"
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
                        <Button
                          className="group w-fit duration-300 ease-in"
                          variant={"white"}
                          size={"lg"}
                          onMouseEnter={() => setIsButtonHovered(true)}
                          onMouseLeave={() => setIsButtonHovered(false)}
                        >
                          <span>{slide.buttonText}</span>
                          <div className="relative ml-2 flex items-center justify-center">
                            <motion.div
                              animate={{
                                opacity: isButtonHovered ? 0 : 1,
                                scale: isButtonHovered ? 0.8 : 1,
                              }}
                              transition={{ duration: 0.2, ease: "circIn" }}
                              className="absolute"
                            >
                              <ChevronRightIcon className="size-6" />
                            </motion.div>
                            <motion.div
                              animate={{
                                opacity: isButtonHovered ? 1 : 0,
                                scale: isButtonHovered ? 1 : 0.8,
                              }}
                              transition={{ duration: 0.2, ease: "circIn" }}
                              className="absolute"
                            >
                              <ArrowRight className="size-6" />
                            </motion.div>
                          </div>
                        </Button>
                      )}
                    </motion.p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-16 left-10 flex items-center space-x-2">
        <NavButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="rounded-full bg-white/30 p-2 text-white hover:bg-white hover:text-[#18392b] disabled:opacity-50"
          direction="left"
        />
        <NavButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="rounded-full bg-white/30 p-2 text-white hover:bg-white hover:text-[#18392b] disabled:opacity-50"
          direction="right"
        />
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
