"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

const CarouselButtons = ({
  direction,
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-[50%] w-12 h-12 border flex justify-center items-center ${
        disabled ? "border-gray-400 bg-[#DDDDDD]" : "border-gray-800 bg-white"
      }  `}
    >
      <Image
        src="/arrow.svg"
        alt="arrow"
        className={`${direction === "next" && "rotate-180"}`}
        width={24}
        height={24}
      />
    </button>
  );
};

export default CarouselButtons;
