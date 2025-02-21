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
      builder: builder,
      cabins: cabins,
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
      <div className="yacht-listing-card">
        <Link href={`/yacht/${slug}`}>
          <div className="yacht-img overflow-hidden relative min-w-[358px] w-full h-[220px] xl:min-w-[407px] xl:h-[246px]">
            <Image
              src={imageUrl}
              alt={imageAlt || "yacht img"}
              className="object-cover scale-150"
              fill
            />
          </div>
        </Link>

        <div className="w-full flex justify-center items-center bg-primary text-white py-6">
          <div className="w-11/12 flex flex-col gap-4">
            <div className="yacht-listing-name">
              <Link href={`/yacht/${slug}`}>
                <h3 className="text-xl font-IvyPresto font-semibold text-white">
                  {name}
                </h3>
              </Link>
            </div>
            <div className="yacht-listing-specs">
              {getYachtCardDetails().map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-start text-left"
                  >
                    <p className="text-sm capitalize">{Object.keys(item)}</p>
                    <h4 className="font-bold text-lg xl:text-xl text-white text-balance">
                      {Object.values(item)}
                    </h4>
                  </div>
                );
              })}
            </div>
            <div className="line-break w-full h-[1px] bg-tertiary"></div>
            <div className="flex justify-between items-center">
              <div className="price-per-hour flex justify-center items-center gap-2">
                <Image
                  src={"/clock.svg"}
                  alt="Price per hour"
                  width={24}
                  height={24}
                  className="object-cover"
                />
                <p className="text-sm">Price per hour</p>
                <i className="text-text_orange font-bold text-xs">
                  {pricePerHour
                    ? "From AED " + currencyFormat(pricePerHour)
                    : "Contact us to know"}
                </i>
              </div>
              <div className="flex justify-center items-center gap-3">
                <a href="tel:+971585787558">
                  <Image
                    src={"/phone.svg"}
                    alt="phone"
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </a>
                <a href="https://api.whatsapp.com/send/?phone=971585787558&text=Hello%2C+I%27m+interested+in+your+yachts+for+rent">
                  <Image
                    src={"/footer_whatsapp.svg"}
                    alt="whatsapp"
                    width={24}
                    height={24}
                    className="object-cover"
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
