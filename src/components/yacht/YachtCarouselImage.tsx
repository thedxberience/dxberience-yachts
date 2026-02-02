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
      <div className="image-container relative h-[200px] w-[95svw] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:h-[460px] lg:w-[43.906vw]">
        <Image
          src={imageUrl}
          alt={imageAlt ? imageAlt : "Yacht image"}
          fill
          className="object-cover scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"></div>
      </div>
      <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-secondary">
        <span>
          {currentGalleryIndex}/{galleryLength}
        </span>
        <span className="h-px w-10 bg-secondary/40"></span>
        <span>Gallery view</span>
      </div>
    </div>
  );
};

export default YachtCarouselImage;
