import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full py-16 xl:py-32 px-4">
      <div className="w-11/12 max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl xl:text-6xl font-IvyPresto font-semibold text-primary leading-tight">
              Where Luxury Meets the Open Sea
            </h2>
            <p className="text-lg xl:text-xl text-secondary leading-relaxed">
              We refine luxury with bespoke yacht experiences, meticulously
              curated for the discerning traveler who seeks nothing but
              perfection.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-base xl:text-lg text-secondary leading-relaxed">
              Our vision extends beyond mere yacht rentals – we create
              unforgettable maritime journeys where every detail is thoughtfully
              crafted. From exclusive vessels to personalized itineraries, we
              ensure your time on the water transcends the ordinary.
            </p>

            <p className="text-base xl:text-lg text-secondary leading-relaxed">
              <span className="font-semibold text-primary">
                No need to think, just experience.
              </span>{" "}
              Let our expert team handle every aspect of your luxury yacht
              adventure while you immerse yourself in the ultimate
              sophistication and comfort on the open sea.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-primary text-lg">
                Bespoke Experiences
              </h4>
              <p className="text-secondary text-sm">
                Tailored journeys crafted to your unique preferences and desires
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-primary text-lg">
                Exclusive Fleet
              </h4>
              <p className="text-secondary text-sm">
                Carefully curated selection of premium luxury yachts
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-primary text-lg">
                VIP Service
              </h4>
              <p className="text-secondary text-sm">
                White-glove treatment ensuring every moment is exceptional
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-primary text-lg">
                Lifestyle Management
              </h4>
              <p className="text-secondary text-sm">
                Complete concierge service for your maritime lifestyle
              </p>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full h-[400px] xl:h-[500px] rounded-lg overflow-hidden">
            <div className="overlay absolute z-10 bg-black bg-opacity-20"></div>
            <Image
              src="/images/beach-view.jpeg"
              alt="Luxury yacht experience with pristine waters and exclusive service"
              className="object-cover"
              fill
            />
          </div>

          {/* Floating Stats Card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg border border-gray-100 z-20">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary font-IvyPresto">
                    50+
                  </p>
                  <p className="text-xs text-secondary">Premium Yachts</p>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary font-IvyPresto">
                    24/7
                  </p>
                  <p className="text-xs text-secondary">Concierge Service</p>
                </div>
              </div>
              <p className="text-xs text-secondary text-center">
                Curating luxury since 2020
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
