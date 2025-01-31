import CustomButton from "@/components/shared/CustomButton";
import Image from "next/image";
import React from "react";

const YachtDetails = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-10/12 flex flex-col justify-center items-center">
        <div className="section-header text-5xl lg:text-8xl text-center font-IvyPresto font-semibold">
          The Details
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6 my-10 lg:my-20 relative lg:w-[83.021vw] h-[850px] lg:h-[730px]">
          <div className="absolute top-0 left-0 w-full lg:w-[83.021vw] h-[850px] lg:h-[730px] bg-gradient-to-b from-transparent to-background-dark z-10">
            <div className="relative w-full lg:w-[83.021vw] h-full lg:h-[730px] flex justify-center items-center">
              <Image
                src={"/images/beach-view.jpeg"}
                alt="a beautiful beach in front of the dubai skyline"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="top-features text-white w-11/12 h-fit lg:w-[681px] lg:h-[629.52px] flex flex-col justify-start py-10 items-center gap-10 relative z-10">
            <h2 className="text-3xl lg:text-5xl text-center font-IvyPresto text-white">
              Top Features
            </h2>
            <div className="price-details flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8">
              <div className="price flex justify-center items-center gap-2">
                <Image src={"/clock.svg"} alt="clock" width={24} height={24} />
                <p className="lg:text-lg">Price</p>
                <p className="font-bold">
                  AED 1,400/{" "}
                  <span className="font-normal text-sm"> per hr</span>
                </p>
              </div>
              <div className="w-full h-[1px] lg:w-[1px] lg:h-[61.52px] bg-[#888888]"></div>
              <div className="price flex justify-center items-center gap-2">
                <Image src={"/clock.svg"} alt="clock" width={24} height={24} />
                <p className="lg:text-lg">Price</p>
                <p className="font-bold">
                  AED 1,400/{" "}
                  <span className="font-normal text-sm"> per day</span>
                </p>
              </div>
              <div className="flex justify-center items-center gap-3">
                <Image
                  src={"/phone.svg"}
                  alt="phone"
                  width={24}
                  height={24}
                  className="object-cover"
                />
                <Image
                  src={"/footer_whatsapp.svg"}
                  alt="whatsapp"
                  width={24}
                  height={24}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-11/12">
              <p className="text-pretty">
                The Lamborghini 63 Yacht is a masterpiece of engineering and
                luxury, blending the elegance of yacht craftsmanship with the
                high-performance spirit of Lamborghini. Designed to reflect the
                iconic styling and precision of the Lamborghini marque, this
                yacht boasts sleek, angular lines, cutting-edge technology, and
                unmatched performance on the water.
              </p>
            </div>
            <div className="flex justify-center items-center gap-10">
              <div className="specs-item flex flex-col justify-center items-center gap-3">
                <Image src={"/ruler.svg"} alt="Ruler" width={24} height={24} />
                <p className="text-lg">Length</p>
                <p className="font-bold text-xl">20m</p>
              </div>
              <div className="specs-item flex flex-col justify-center items-center gap-3">
                <Image
                  src={"/profile.svg"}
                  alt="Ruler"
                  width={24}
                  height={24}
                />
                <p className="text-lg">Length</p>
                <p className="font-bold text-xl">20m</p>
              </div>
              <div className="specs-item flex flex-col justify-center items-center gap-3">
                <Image
                  src={"/setting.svg"}
                  alt="Ruler"
                  width={24}
                  height={24}
                />
                <p className="text-lg">Length</p>
                <p className="font-bold text-xl">20m</p>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <CustomButton btnName="Book Now" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtDetails;
