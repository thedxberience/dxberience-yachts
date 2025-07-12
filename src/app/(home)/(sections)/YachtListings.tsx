import { getAll } from "@/app/api/yachts/service";
import { tryCatch } from "@/app/utils/helpers";
import YachtListingClient from "@/components/yachtListings/YachtListingClient";
import React from "react";

export const revalidate = 60;

const YachtListings = async () => {
  const { data: yachtsReq, error } = await tryCatch(getAll("desc"));

  if (error) {
    return (
      <div className="text-center flex flex-col justify-center items-center w-full pt-6">
        <p>Oops! Something went wrong please try again later!</p>
        <p>{error.message}</p>
      </div>
    );
  }

  const { data } = yachtsReq;
  // console.log("Yacht data:", JSON.stringify(data));

  return (
    <section className="flex flex-col justify-center items-center w-full py-7 xl:py-24 gap-7">
      <div className="yacht-listings-header w-11/12 flex flex-col justify-center items-center gap-5">
        <h2 className="text-3xl xl:text-7xl text-center font-IvyPresto font-semibold text-primary">
          Sail in Style: Luxury Yachts at Your Fingertips
        </h2>
        <p className="text-sm xl:text-lg text-center text-secondary">
          Experience the pinnacle of luxury on the open waters. Browse our
          curated selection of exclusive yachts, each designed to offer
          unmatched elegance, comfort, and adventure. Whether you&apos;re
          planning a private getaway, a celebration, or a corporate retreat, we
          have the perfect vessel for your journey.
        </p>
      </div>
      <YachtListingClient data={data} />
    </section>
  );
};

export default YachtListings;
