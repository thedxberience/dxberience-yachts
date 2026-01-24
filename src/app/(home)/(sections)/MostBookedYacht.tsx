import CustomButton from "@/components/shared/CustomButton";
import Image from "next/image";

const yachts = [
  {
    name: "Lamborghini 63 Yacht",
    image: "/images/yacht-listing-img.jpeg",
    alt: "Luxury yacht docked at the marina",
    length: "300 ft",
    capacity: "36",
    built: "2021",
  },
  {
    name: "Lamborghini 63 Yacht",
    image: "/images/yachts_hero_img.jpeg",
    alt: "Top view of a luxury yacht on open water",
    length: "300 ft",
    capacity: "36",
    built: "2021",
  },
  {
    name: "Lamborghini 63 Yacht",
    image: "/images/yachts-listing-page-header.png",
    alt: "Luxury yacht on turquoise water",
    length: "300 ft",
    capacity: "36",
    built: "2021",
  },
];

const MostBookedYacht = () => {
  return (
    <section className="w-full flex justify-center items-center py-12 lg:py-20 bg-white">
      <div className="w-11/12 max-w-7xl flex flex-col items-center gap-10">
        <h2 className="text-3xl lg:text-6xl font-IvyPresto font-semibold text-primary">
          Most Booked Yacht
        </h2>

        <div className="grid w-full gap-8 md:grid-cols-2 xl:grid-cols-3">
          {yachts.map((yacht, index) => (
            <div
              key={`${yacht.name}-${index}`}
              className="w-full border border-[#C9C9C9] bg-white"
            >
              <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden">
                <Image
                  src={yacht.image}
                  alt={yacht.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col gap-5">
                <h3 className="text-xl font-IvyPresto font-semibold text-primary">
                  {yacht.name}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase text-secondary">
                      Length
                    </span>
                    <span className="text-base font-semibold text-primary">
                      {yacht.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase text-secondary">
                      Capacity
                    </span>
                    <span className="text-base font-semibold text-primary">
                      {yacht.capacity}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase text-secondary">
                      Built
                    </span>
                    <span className="text-base font-semibold text-primary">
                      {yacht.built}
                    </span>
                  </div>
                </div>
                <div className="h-px w-full bg-tertiary"></div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <Image
                        src="/clock.svg"
                        alt="Price per hour"
                        width={18}
                        height={18}
                      />
                      <span>Price per hour</span>
                      <span className="text-text_orange font-semibold">
                        Contact us to know
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href="tel:+971585787558">
                        <Image
                          src="/phone.svg"
                          alt="Phone"
                          width={28}
                          height={28}
                        />
                      </a>
                      <a href="https://api.whatsapp.com/send/?phone=971585787558&text=Hello%2C+I%27m+interested+in+your+yachts+for+rent">
                        <Image
                          src="/footer_whatsapp.svg"
                          alt="WhatsApp"
                          width={28}
                          height={28}
                        />
                      </a>
                    </div>
                  </div>
                  <div>
                    <CustomButton btnName="Book Now" isLink href="/#contact" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CustomButton btnName="View All Yachts" isLink href="/yachts" invert />
      </div>
    </section>
  );
};

export default MostBookedYacht;
