import { tryCatch } from "@/app/utils/helpers";
import YachListingCard from "@/components/yachtListings/YachListingCard";
import YachtListingClient from "@/components/yachtListings/YachtListingClient";
import { Yacht } from "@/data/types";
import React from "react";

export const revalidate = 60;

const YachtListings = async () => {
  const { data: yachtsReq, error } = await tryCatch(
    fetch(process.env.BASE_API_URL + "/yachts")
  );

  if (error) {
    return (
      <div className="text-center flex flex-col justify-center items-center w-full pt-6">
        <p>Oops! Something went wrong please try again later!</p>
        <p>{error.message}</p>
      </div>
    );
  }

  const { result: data } = await yachtsReq.json();
  // console.log("Yacht data:", data);

  const handleShowYachtListings = () => {
    if (!data || data.length == 0) {
      return (
        <div className="flex justify-center items-center">
          <p>No yachts listed at the moment. Kindly check back later.</p>
        </div>
      );
    } else if (data.error) {
      return (
        <div className="flex justify-center items-center">
          <p>{data.error}</p>
        </div>
      );
    } else {
      return (
        <div className="w-11/12 yacht-listings">
          {data.map((yacht: Yacht) => {
            const pricePerHour = yacht.prices.find(
              (price) => price.type.toLowerCase() === "hourly"
            );
            return (
              <YachListingCard
                key={yacht.slug}
                name={yacht.name}
                imageUrl={yacht.thumbnail.image}
                imageAlt={yacht.thumbnail.altText}
                length={yacht.length}
                pricePerHour={pricePerHour?.price}
                builder={yacht.builder}
                cabins={yacht.cabins}
                capacity={yacht.capacity}
                built={yacht.built}
                slug={yacht.slug}
              />
            );
          })}
        </div>
      );
    }
  };

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
