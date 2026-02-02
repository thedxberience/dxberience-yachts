"use client";
import Carousel from "@/components/shared/Carousel";
import CarouselButtons, {
  usePrevNextButtons,
} from "@/components/shared/CarouselButtons";
import YachtCarouselImage from "@/components/yacht/YachtCarouselImage";
import useEmblaCarousel from "embla-carousel-react";

type galleryType = {
  image: string;
  altText: string;
};

type YachtCarouselProps = {
  carouselHeader: string;
  carouselDescription: string;
  carouselGallery: galleryType[];
};

const YachtCarousel = ({
  carouselHeader,
  carouselDescription,
  carouselGallery,
}: YachtCarouselProps) => {
  const [emblaARef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const {
    nextBtnDisabled,
    prevBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="w-full h-full bg-[#f6f4f1] py-16 lg:py-24">
      <div className="section-container w-full h-full flex justify-center items-center flex-col">
        <div className="section-header w-11/12 lg:w-9/12 flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
          <div className="header lg:w-5/12">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary">
              Gallery
            </p>
            <h3 className="mt-4 text-4xl lg:text-7xl font-IvyPresto text-primary">
              {carouselHeader}
            </h3>
          </div>
          <div className="yacht-description text-sm text-secondary lg:w-6/12">
            <p className="leading-relaxed">{carouselDescription}</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-2 w-10/12 my-10">
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
        <div className="yacht-carousel-container">
          <Carousel emblaRef={emblaARef}>
            {carouselGallery?.map((image, index) => {
              const galleryLength = carouselGallery.length;
              const currentGalleryIndex = index + 1;
              return (
                <div key={currentGalleryIndex} className="embla__slide z-10">
                  <YachtCarouselImage
                    currentGalleryIndex={currentGalleryIndex}
                    galleryLength={galleryLength}
                    imageUrl={image.image}
                    imageAlt={image.altText || "Yacht image on carousel"}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default YachtCarousel;
