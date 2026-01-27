import CustomButton from "@/components/shared/CustomButton";
import Image from "next/image";

const ExperienceSection = () => {
  return (
    <section className="w-full flex justify-center items-center bg-white py-12 lg:py-20">
      <div className="w-11/12 max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16">
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px] overflow-hidden">
            <Image
              src="/images/unparalled_experience.png"
              alt="Luxury yacht cruising at sea"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 lg:gap-8">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-IvyPresto font-semibold text-primary leading-tight">
            Unparalleled Yacht Experiences
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-secondary leading-relaxed">
            Every detail is thoughtfully curated to deliver a seamless blend of
            comfort, style, and adventure. From the moment you step on board,
            everything is taken care of so you can simply relax and enjoy the
            journey.
          </p>
          <ul className="flex flex-col gap-4 text-secondary text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <p>
                <span className="font-semibold text-primary">
                  Exquisitely Designed Yachts:
                </span>{" "}
                Our yachts feature sophisticated interiors, spacious decks, and
                impeccable finishes crafted for ultimate comfort and style.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <p>
                <span className="font-semibold text-primary">
                  Bespoke Itineraries:
                </span>{" "}
                Your journey, your way. From serene coastal cruises to vibrant
                waterfront destinations, every route is tailored to match your
                preferences and pace.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <p>
                <span className="font-semibold text-primary">
                  Premium Onboard Amenities:
                </span>{" "}
                Indulge in world-class amenities, including luxurious lounges,
                gourmet dining options, entertainment systems, and leisure
                facilities designed for pure relaxation.
              </p>
            </li>
          </ul>
          <div>
            <CustomButton btnName="See Our Yachts" isLink href="/yachts" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
