import { currencyFormat } from "@/app/utils/helpers";
import CustomButton from "@/components/shared/CustomButton";
import { prices, YachtDetailItem } from "@/data/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type YachtDetailsProps = {
  prices: prices[];
  description: string;
  length: number;
  cabins: number;
  capacity: number;
  buildDate: number;
  yachtName: string;
};

const YachtDetails = ({
  buildDate,
  cabins,
  capacity,
  description,
  length,
  prices,
  yachtName,
}: YachtDetailsProps) => {
  const getDetailsImage = (itemType: string) => {
    switch (itemType) {
      case "length":
        return "/ruler.svg";
      case "capacity":
        return "/profile.svg";
      case "cabins":
      case "built":
        return "/setting.svg";
      default:
        return "";
    }
  };

  const getYachtCardDetails = () => {
    const yachtDetails: YachtDetailItem = {
      length: length,
      cabins: cabins,
      capacity: capacity,
      built: buildDate,
    };

    const yachtDetailsArray = [];

    for (const key in yachtDetails) {
      if (yachtDetails[key]) {
        const arrayItem = {
          item: key,
          value: yachtDetails[key] + (key == "length" ? " m" : ""),
          image: getDetailsImage(key),
        };
        yachtDetailsArray.push(arrayItem);
      }
    }

    // console.log(yachtDetailsArray);

    return yachtDetailsArray;
  };

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
              {prices?.map((price, index) => {
                return (
                  <div
                    className="price-container flex flex-col lg:flex-row justify-center items-center gap-2"
                    key={index}
                  >
                    <div
                      key={index}
                      className="price flex justify-center items-center gap-2"
                    >
                      <Image
                        src={"/clock.svg"}
                        alt="clock"
                        width={24}
                        height={24}
                      />
                      <p className="lg:text-lg">Price</p>
                      <p className="font-bold">
                        <span className="text-sm font-normal">From</span> AED{" "}
                        {currencyFormat(price.price)}{" "}
                        <span className="font-normal text-sm">
                          {" "}
                          {price.type}
                        </span>
                      </p>
                    </div>
                    <div className="line-divider w-full h-[1px] lg:w-[1px] lg:h-[61.52px] bg-[#888888]"></div>
                  </div>
                );
              })}
              <div className="flex justify-center items-center gap-3">
                <Link href="tel:+971585787558">
                  <Image
                    src={"/phone.svg"}
                    alt="phone"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </Link>
                <Link
                  href={`https://api.whatsapp.com/send/?phone=971585787558&text=Hello%2C+I%27m+interested+in+the+${yachtName}+yachts+for+rent`}
                >
                  <Image
                    src={"/footer_whatsapp.svg"}
                    alt="whatsapp"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </Link>
              </div>
            </div>
            <div className="w-11/12">
              <p className="text-pretty text-center">{description}</p>
            </div>
            <div className="flex justify-center items-center gap-5 lg:gap-10 flex-wrap lg:flex-nowrap">
              {getYachtCardDetails().map((item, index) => {
                return (
                  <div
                    key={index}
                    className="specs-item flex flex-col justify-center items-center gap-3"
                  >
                    <Image
                      src={item.image}
                      alt={item.item}
                      width={24}
                      height={24}
                    />
                    <p className="text-lg">{item.item}</p>
                    <p className="font-bold text-xl">{item.value}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center w-full">
              <CustomButton btnName="Book Now" isLink href="#header-form" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtDetails;
