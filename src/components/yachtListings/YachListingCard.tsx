import Image from "next/image";
import CustomButton from "../shared/CustomButton";

const YachListingCard = () => {
  return (
    <div className="yacht-listing-container">
      <div className="yacht-listing-card">
        <div className="yacht-img relative min-w-[358px] w-full h-[220px] xl:min-w-[407px] xl:h-[246px]">
          <Image
            src={"/images/yacht-listing-img.jpeg"}
            alt="Yacht Listing"
            className="object-cover"
            fill
          />
        </div>
        <div className="w-full flex justify-center items-center bg-primary text-white py-6">
          <div className="w-11/12 flex flex-col gap-4">
            <div className="yacht-listing-name">
              <h3 className="text-xl font-IvyPresto font-semibold">
                Madison A-48 Yacht
              </h3>
            </div>
            <div className="yacht-listing-specs">
              {Array.from([0, 1, 2, 3]).map((item) => {
                return (
                  <div
                    key={item}
                    className="flex flex-col justify-center items-center"
                  >
                    <p className="text-sm">Length</p>
                    <h4 className="font-bold text-lg xl:text-xl">300ft</h4>
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
                  Contact us to know
                </i>
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
            <div>
              <CustomButton btnName="Book Now" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YachListingCard;
