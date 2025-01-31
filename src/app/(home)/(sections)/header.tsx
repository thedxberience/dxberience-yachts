import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full min-h-[563px] lg:h-screen hero-section">
      <Navbar />
      <div className="main-content-container relative w-full flex justify-center items-center">
        <div className="main-content w-10/12 flex justify-center items-center">
          <div className="header-img absolute top-0 lg:relative w-[292px] h-[393px] xl:w-[63.906vw] xl:h-[75vh] xl:max-h-[600px]">
            <div className="overlay absolute z-10"></div>
            <Image
              src={"/images/yachts_hero_img.jpeg"}
              alt="A luxurious yacht in the middle of the sea"
              className="object-cover"
              fill
            />
          </div>
          <div className="header-text-container z-10 w-9/12 xl:w-7/12 h-full flex flex-col justify-center items-start gap-6 lg:-ml-28">
            <h1 className="header-text text-[32px] font-semibold leading-10 lg:text-8xl lg:leading-[110px] font-IvyPresto text-foreground-regular">
              Exclusive Yachts for luxury sailing adventure
            </h1>
            <p className="lg:text-lg font-noah w-11/12 xl:w-7/12 text-foreground-regular">
              Our carefully curated selection of premium yachts ensures you
              experience the ultimate in opulence and comfort on the open sea.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
