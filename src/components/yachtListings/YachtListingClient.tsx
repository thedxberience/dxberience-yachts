"use client";
import { useState } from "react";
import React from "react";
import YachListingCard from "./YachListingCard";
import { Yacht } from "@/data/types";
import { tryCatch } from "@/app/utils/helpers";

type YachtListingClientProps = {
  data: Yacht[] | any;
};

const YachtListingClient = ({ data }: YachtListingClientProps) => {
  const [yachtData, setYachtData] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleShowYachtListings = () => {
    if (!yachtData || yachtData.length == 0) {
      return (
        <div className="flex justify-center items-center">
          <p>No yachts listed at the moment. Kindly check back later.</p>
        </div>
      );
    } else if (yachtData.error) {
      return (
        <div className="flex justify-center items-center">
          <p>{yachtData.error}</p>
        </div>
      );
    } else if (loading) {
      return (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="w-11/12 yacht-listings">
          {yachtData.map((yacht: Yacht) => {
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

  const handleSortYachtLisitings = async (sort: "asc" | "desc") => {
    setLoading(true);
    const sortedYachts = await tryCatch(
      fetch(process.env.NEXT_PUBLIC_BASE_API_URL + "/yachts?sort=" + sort)
    );
    setLoading(false);
    if (sortedYachts.error) {
      console.error("Error sorting yachts:", sortedYachts.error);
      return;
    }
    const { result } = await sortedYachts.data.json();
    setYachtData(result);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    handleSortYachtLisitings(selectedValue as "asc" | "desc");
  };

  return (
    <div className="yacht-listings-container w-full flex flex-col justify-center items-center gap-4">
      <div className="sort-filter-bnts w-11/12 flex justify-start items-center">
        <select
          onChange={handleSelectChange}
          className="w-fit border border-primary text-black rounded-md"
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
      </div>
      {handleShowYachtListings()}
    </div>
  );
};

export default YachtListingClient;
