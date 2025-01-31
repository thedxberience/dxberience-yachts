"use client";
import React from "react";
import CarouselButtons from "./shared/CarouselButtons";
import RatingsCard from "./shared/RatingsCard";
import Carousel from "./shared/Carousel";
import { usePrevNextButtons } from "./shared/CarouselButtons";
import useEmblaCarousel from "embla-carousel-react";

const RatingsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const {
    nextBtnDisabled,
    prevBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const ratings = [
    {
      star: 5,
      ratingAuthor: "Laura O.",
      ratingDescription:
        "Absolutely Amazing experience.  The Private Yacht was out of this world. SAN Beach was an absolutely beautiful experience.",
    },
    {
      star: 5,
      ratingAuthor: "Humna S.",
      ratingDescription:
        "Amazing experience. Dxberience is a very friendly, understanding, trustworthy and flexible company ready to provide you the best service! The driver was gentle and nice and the limousine experience packed with laughter and fun!! I’d recommend everyone to go forth company dxberience.",
    },
    {
      star: 5,
      ratingAuthor: "Faisal L.",
      ratingDescription:
        "Great tour agency and a very great & excellent support from the team. Thanks for making the trip better! Will surely recommend if you're looking for a layover tour or a normal tour.",
    },
  ];

  return (
    <section className="review-section flex justify-center items-center lg:px-20 w-full mb-8">
      <div className="flex flex-col justify-center items-center border-t border-b border-gray-800 w-full h-full my-20 py-16 gap-12">
        <div className="section-header w-full flex flex-col justify-center items-center">
          <h1 className="text-xl lg:text-5xl font-bold font-IvyPresto text-text_primary">
            Our clients share their experiences.
          </h1>
        </div>
        <div className="review-container flex justify-center items-center gap-8">
          <Carousel emblaRef={emblaRef}>
            {ratings.map((rating, index) => {
              return (
                <div className="embla__slide z-10" key={index}>
                  <RatingsCard
                    star={rating.star}
                    ratingAuthor={rating.ratingAuthor}
                    ratingDescription={rating.ratingDescription}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="flex justify-center items-center gap-4">
          <CarouselButtons
            direction="prev"
            disabled={prevBtnDisabled}
            onClick={onPrevButtonClick}
          />
          <CarouselButtons
            direction="next"
            disabled={nextBtnDisabled}
            onClick={onNextButtonClick}
          />
        </div>
      </div>
    </section>
  );
};

export default RatingsSection;
