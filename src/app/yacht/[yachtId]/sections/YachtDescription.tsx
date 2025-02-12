import Image from "next/image";

type YachtDescriptionProps = {
  yachtName: string;
  yachtImageUrl: string;
  yachtImageAlt: string;
  yachtDescription: string;
};

const YachtDescription = ({
  yachtName,
  yachtDescription,
  yachtImageAlt,
  yachtImageUrl,
}: YachtDescriptionProps) => {
  return (
    <section className="w-full flex flex-col justify-center items-center my-10 lg:my-[100px]">
      <div className="w-11/12 flex flex-col lg:flex-row justify-center items-center gap-6">
        <div className="yacht-image-container w-[358px] h-[358px] overflow-hidden lg:w-[43.906vw] lg:h-[800px] relative">
          <Image
            src={yachtImageUrl}
            alt={yachtImageAlt || "Yacht image"}
            fill
            className="object-cover scale-125"
          />
        </div>
        <div className="yacht-description-container w-full lg:w-5/12 relative flex flex-col justify-center items-start gap-5 lg:gap-10">
          <div>
            <h2 className="text-foreground-light text-5xl font-semibold leading-10 lg:text-8xl lg:leading-[110px] font-IvyPresto lg:-ml-28 z-10">
              {yachtName}
            </h2>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full lg:w-8/12 flex flex-col justify-start items-start gap-6">
              <p className="text-sm">{yachtDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtDescription;
