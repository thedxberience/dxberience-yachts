import YachListingCard from "@/components/yachtListings/YachListingCard";
import React from "react";

const YachtListings = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full py-7 xl:py-24 gap-7">
      <div className="yacht-listings-header w-11/12 flex flex-col justify-center items-center gap-5">
        <h2 className="text-3xl xl:text-7xl text-center font-IvyPresto font-semibold text-primary">
          Sail in Style: Luxury Yachts at Your Fingertips
        </h2>
        <p className="text-sm xl:text-lg text-center text-secondary">
          Experience the pinnacle of luxury on the open waters. Browse our
          curated selection of exclusive yachts, each designed to offer
          unmatched elegance, comfort, and adventure. Whether you're planning a
          private getaway, a celebration, or a corporate retreat, we have the
          perfect vessel for your journey.
        </p>
      </div>
      <div className="yacht-listings-container w-full flex justify-center items-center">
        <div className="w-11/12 yacht-listings">
          <YachListingCard />
          <YachListingCard />
          <YachListingCard />
          <YachListingCard />
          <YachListingCard />
          <YachListingCard />
          <YachListingCard />
        </div>
      </div>
    </section>
  );
};

export default YachtListings;
