import Image from "next/image";

const YachtDescription = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center my-10 lg:my-[100px]">
      <div className="w-11/12 flex flex-col lg:flex-row justify-center items-center gap-6">
        <div className="yacht-image-container w-[358px] h-[358px] overflow-hidden lg:w-[43.906vw] lg:h-[800px] relative">
          <Image
            src={"/images/yachts-listing-page-header.png"}
            alt="X2 Golden Riviera Sport 90"
            fill
            className="object-cover scale-125"
          />
        </div>
        <div className="yacht-description-container w-full lg:w-5/12 relative flex flex-col justify-center items-start gap-5 lg:gap-10">
          <div>
            <h2 className="text-foreground-light text-5xl font-semibold leading-10 lg:text-8xl lg:leading-[110px] font-IvyPresto lg:-ml-28 z-10">
              Lamborghini 63 Yacht
            </h2>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full lg:w-8/12 flex flex-col justify-start items-start gap-6">
              <p className="text-sm">
                The Lamborghini 63 Yacht is a masterpiece of engineering and
                luxury, blending the elegance of yacht craftsmanship with the
                high-performance spirit of Lamborghini. Designed to reflect the
                iconic styling and precision of the Lamborghini marque, this
                yacht boasts sleek, angular lines, cutting-edge technology, and
                unmatched performance on the water.
              </p>
              <p className="text-sm">
                The exterior exudes power and sophistication, featuring
                aerodynamic contours inspired by Lamborghini supercars, with
                carbon fiber construction ensuring a lightweight yet robust
                structure. Its metallic finish and customizable color options
                add a touch of exclusivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtDescription;
