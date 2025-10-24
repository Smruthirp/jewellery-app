import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { usePrevNextButtons, NavButton } from "./carousel-arrow-buttons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="mx-auto max-w-3xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
          {slides.map((index) => (
            <div
              key={index}
              className="min-w-0 transform-gpu pl-4"
              style={{ flex: "0 0 100%" }}
            >
              <div className="flex h-72 items-center justify-center rounded-3xl border border-gray-300 text-6xl font-semibold select-none">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-7 grid grid-cols-[auto_1fr] justify-between gap-5">
        <div className="grid grid-cols-2 items-center gap-2">
          <NavButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            direction="left"
          />
          <NavButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            direction="right"
          />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
