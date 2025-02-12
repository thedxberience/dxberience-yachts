"use client";
import YachListingCard from "@/components/yachtListings/YachListingCard";
import { Yacht } from "@/data/types";
import { makeRequest } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const YachtListings = () => {
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["yachtListings"],
    queryFn: async () => {
      const res = await makeRequest("/yachts");
      console.log(res);
      return res;
    },
  });

  const handleShowYachtListings = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center">
          <Image
            src={"/loader_black.svg"}
            className="animate-spin"
            alt="loader"
            width={48}
            height={48}
          />
        </div>
      );
    } else if (isError) {
      return (
        <div>
          <p>Oops! Something went wrong please try again later!</p>
          <p>{error.message}</p>
        </div>
      );
    } else if (data.length == 0) {
      return (
        <div className="flex justify-center items-center">
          <p>No yachts listed at the moment. Kindly check back later.</p>
        </div>
      );
    } else if (isSuccess) {
      return (
        <div className="w-11/12 yacht-listings">
          {data?.map((yacht: Yacht) => {
            const pricePerHour = yacht.prices.find(
              (price) => price.type.toLowerCase() === "per hour"
            );
            return (
              <Link href={`/yacht/${yacht.slug}`} key={yacht.slug}>
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
                />
              </Link>
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
      <div className="yacht-listings-container w-full flex justify-center items-center">
        {handleShowYachtListings()}
      </div>
    </section>
  );
};

export default YachtListings;
