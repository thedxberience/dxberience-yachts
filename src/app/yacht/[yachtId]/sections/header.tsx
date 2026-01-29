import Navbar from "@/components/shared/Navbar";
import BookingForm from "@/components/yacht/BookingForm";
import { prices } from "@/data/types";
import Image from "next/image";

type YachtDetailPageHeaderProps = {
  yachtName: string;
  yachtImageUrl: string;
  yachtImageAlt: string;
  yachtDescription: string;
  slug: string;
  prices: prices[];
};

const YachtDetailPageHeader = ({
  yachtName,
  yachtImageAlt,
  yachtImageUrl,
  yachtDescription,
  slug,
  prices,
}: YachtDetailPageHeaderProps) => {
  return (
    <header className="yacht-detail-page w-full min-h-[750px] h-full lg:h-[800px]">
      <Navbar />
      <div className="absolute -z-10 top-0 w-full">
        <div className="overlay absolute"></div>
        <div className="bg-image overflow-hidden relative w-full min-h-[750px] h-full lg:h-[800px]">
          <Image
            src={yachtImageUrl}
            alt={yachtImageAlt || "Yacht image"}
            fill
            className="object-cover scale-125"
          />
        </div>
      </div>
      <div className="main-content nav-offset w-full h-full flex justify-center items-center">
        <div className="w-11/12 h-full flex justify-center items-center">
          <div className="relative hidden xl:flex w-[73.906vw] h-[55vh] overflow-hidden">
            <Image
              src={yachtImageUrl}
              alt={yachtImageAlt || "Yacht image"}
              fill
              className="object-cover yacht-header-img"
            />
          </div>
          <div
            id="header-form"
            className="header-form-container w-full xl:w-[681px] h-full flex flex-col justify-center items-start gap-6 xl:-ml-28"
          >
            <BookingForm
              slug={slug}
              yachtName={yachtName}
              yachtDescription={yachtDescription}
              prices={prices}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default YachtDetailPageHeader;
