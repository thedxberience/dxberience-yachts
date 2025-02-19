import Image from "next/image";

type YachtCarouselImageProps = {
  imageUrl: string;
  imageAlt: string;
  galleryLength: number;
  currentGalleryIndex: number;
};

const YachtCarouselImage = ({
  imageAlt,
  imageUrl,
  galleryLength,
  currentGalleryIndex,
}: YachtCarouselImageProps) => {
  return (
    <div className="flex flex-col justify-between gap-4 lg:max-w-[43.906vw]">
      <div className="image-container overflow-hidden w-[95svw] h-[190.67px] relative lg:w-[43.906vw] lg:h-[440px]">
        <Image
          src={imageUrl}
          alt={imageAlt ? imageAlt : "Yacht image"}
          fill
          className="object-cover scale-125"
        />
      </div>
      <div className="flex justify-start items-center[98svw] ">
        <p>
          {currentGalleryIndex}/{galleryLength}
        </p>
        {/* <p className="text-lg">{imageAlt}</p> */}
      </div>
    </div>
  );
};

export default YachtCarouselImage;
