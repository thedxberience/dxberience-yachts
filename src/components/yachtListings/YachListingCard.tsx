import Image from "next/image";
import CustomButton from "../shared/CustomButton";
import { YachListingCardProps, YachtDetailItem } from "@/data/types";
import { currencyFormat } from "@/app/utils/helpers";
import Link from "next/link";

const YachListingCard = ({
  length,
  pricePerHour,
  name,
  imageUrl,
  imageAlt,
  builder,
  cabins,
  capacity,
  built,
  slug,
}: YachListingCardProps) => {
  const getYachtCardDetails = () => {
    const yachtDetails: YachtDetailItem = {
      length: length,
      capacity: capacity,
      built: built,
    };

    const yachtDetailsArray: YachtDetailItem[] = [];

    for (const key in yachtDetails) {
      const yachtDetailItem: YachtDetailItem = {};
      if (yachtDetails[key]) {
        yachtDetailItem[key] = yachtDetails[key];
        if (key === "length") {
          yachtDetailItem[key] += " m";
        }
        yachtDetailsArray.push(yachtDetailItem);
      }
    }

    // console.log(yachtDetailsArray);

    return yachtDetailsArray;
  };

  return (
    <div className="yacht-listing-container">
      <div className="yacht-listing-card overflow-hidden border border-black/20 bg-white">
        <Link href={`/yacht/${slug}`}>
          <div className="yacht-img overflow-hidden relative w-full h-[260px]">
            <Image
              src={imageUrl}
              alt={imageAlt || "yacht img"}
              className="object-cover"
              fill
            />
          </div>
        </Link>

        <div className="w-full flex justify-center items-center bg-white py-6">
          <div className="w-11/12 flex flex-col gap-6 text-black">
            <div className="yacht-listing-name">
              <Link href={`/yacht/${slug}`}>
                <h3 className="text-2xl font-IvyPresto font-semibold text-primary">
                  {name}
                </h3>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {getYachtCardDetails().map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-start text-left"
                  >
                    <p className="text-sm capitalize text-secondary">
                      {Object.keys(item)}
                    </p>
                    <h4 className="font-semibold text-xl text-primary text-balance">
                      {Object.values(item)}
                    </h4>
                  </div>
                );
              })}
            </div>
            <div className="line-break w-full h-[1px] bg-black/20"></div>
            <div className="flex justify-between items-center">
              <div className="price-per-hour flex justify-center items-center gap-2 text-secondary">
                <Image
                  src={"/clock.svg"}
                  alt="Price per hour"
                  width={20}
                  height={20}
                  className="object-cover opacity-70"
                />
                <p className="text-sm">Price per hour</p>
                <i className="text-text_orange font-semibold text-xs">
                  {pricePerHour
                    ? "From AED " + currencyFormat(pricePerHour)
                    : "Contact us to know"}
                </i>
              </div>
              <div className="flex justify-center items-center gap-3">
                <a
                  href="tel:+971585787558"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20"
                >
                  <Image
                    src={"/phone.svg"}
                    alt="phone"
                    width={18}
                    height={18}
                    className="object-cover brightness-0"
                  />
                </a>
                <a
                  href={`https://api.whatsapp.com/send/?phone=971585787558&text=Hello%2C+I%27m+interested+in+the+${name}+yachts+for+rent`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20"
                >
                  <Image
                    src={"/footer_whatsapp.svg"}
                    alt="whatsapp"
                    width={18}
                    height={18}
                    className="object-cover brightness-0"
                  />
                </a>
              </div>
            </div>
            <div>
              <CustomButton btnName="Book Now" isLink href={`/yacht/${slug}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YachListingCard;
