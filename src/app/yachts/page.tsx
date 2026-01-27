import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import YachtListings from "../(home)/(sections)/YachtListings";

const YachtForHirePage = async () => {
  return (
    <main className="w-full bg-white">
      <Navbar variant="light" />
      <section className="w-full flex justify-center items-center pt-10 lg:pt-20">
        <div className="w-11/12 max-w-4xl text-center flex flex-col items-center gap-6">
          <h1 className="text-3xl lg:text-6xl font-IvyPresto font-semibold text-primary">
            Our Fleet
          </h1>
          <p className="text-sm lg:text-lg text-secondary leading-relaxed">
            Explore a curated selection of world-class yachts, each designed to
            deliver exceptional comfort, style, and performance. Whether
            you&apos;re planning an intimate escape or a grand celebration, our
            fleet offers the perfect yacht for every occasion.
          </p>
        </div>
      </section>

      <YachtListings />
      <Footer />
    </main>
  );
};

export default YachtForHirePage;
