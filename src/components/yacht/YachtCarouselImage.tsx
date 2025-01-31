import Image from "next/image";

const YachtCarouselImage = () => {
  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="image-container lg:w-[43.906vw] lg:h-[440px]">
        <Image
          src={"/images/carousel-image.png"}
          alt="Carousel Image"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <p>1/11</p>
        <p className="text-lg">Beautiful dining setting</p>
      </div>
    </div>
  );
};

export default YachtCarouselImage;
