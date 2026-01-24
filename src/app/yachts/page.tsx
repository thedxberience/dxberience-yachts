import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import YachtListings from "../(home)/(sections)/YachtListings";

const YachtForHirePage = async () => {
  return (
    <main className="w-full bg-white">
      <Navbar />
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

      <section className="w-full flex justify-center items-center py-8">
        <div className="w-11/12 max-w-4xl flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]">
            <button className="rounded-full border border-black bg-black px-4 py-2 text-white">
              All (26)
            </button>
            <button className="rounded-full border border-black/30 px-4 py-2 text-secondary">
              Premium (4)
            </button>
            <button className="rounded-full border border-black/30 px-4 py-2 text-secondary">
              Luxury (10)
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="rounded-full border border-black/30 px-4 py-2 text-xs text-secondary uppercase tracking-[0.2em]">
              Size
            </button>
            <button className="rounded-full border border-black/30 px-4 py-2 text-xs text-secondary uppercase tracking-[0.2em]">
              Capacity
            </button>
            <button className="rounded-full border border-black/30 px-4 py-2 text-xs text-secondary uppercase tracking-[0.2em]">
              Pricing
            </button>
          </div>
        </div>
      </section>

      <YachtListings />
      <Footer />
    </main>
  );
};

export default YachtForHirePage;
