import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/app/lib/tailwind";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button"> & {
  direction?: "left" | "right";
};

export const NavButton: React.FC<PropType> = (props) => {
  const { className, direction, ...restProps } = props;

  const Icons =
    direction === "left" ? (
      <>
        <ChevronLeftIcon className="size-5 group-hover:hidden" />
        <ArrowLeft className="hidden size-5 group-hover:block" />
      </>
    ) : (
      <>
        <ChevronRightIcon className="size-5 group-hover:hidden" />
        <ArrowRight className="hidden size-5 group-hover:block" />
      </>
    );

  return (
    <button
      className={cn(
        "group inline-flex h-14 w-14 items-center justify-center rounded-full border-1 border-gray-300 bg-transparent text-gray-600 transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400",
        className,
      )}
      type="button"
      {...restProps}
    >
      {Icons}
    </button>
  );
};
