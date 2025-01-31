import Navbar from "@/components/shared/Navbar";
import BookingForm from "@/components/yacht/BookingForm";
import Image from "next/image";

const YachtDetailPageHeader = () => {
  return (
    <header className="yacht-detail-page w-full min-h-[750px] h-full lg:h-[800px]">
      <Navbar />
      <div className="absolute -z-10 top-0 w-full">
        <div className="overlay absolute"></div>
        <div className="bg-image relative w-full min-h-[750px] h-full lg:h-[800px]">
          <Image
            src={"/images/yachts-listing-page-header.png"}
            alt="X2 Golden Riviera Sport 90"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="main-content w-full h-full flex justify-center items-center">
        <div className="w-11/12 h-full flex justify-center items-center">
          <div className="relative hidden xl:flex w-[73.906vw] h-[55vh] overflow-hidden">
            <Image
              src={"/images/yachts-listing-page-header.png"}
              alt="X2 Golden Riviera Sport 90"
              fill
              className="object-cover yacht-header-img"
            />
          </div>
          <div className="header-form-container w-full xl:w-[681px] h-full flex flex-col justify-center items-start gap-6 xl:-ml-28">
            <BookingForm />
          </div>
        </div>
      </div>
    </header>
  );
};

export default YachtDetailPageHeader;
