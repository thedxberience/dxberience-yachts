"use client";
import { useState } from "react";
import React from "react";
import YachListingCard from "./YachListingCard";
import { Yacht } from "@/data/types";
import { tryCatch } from "@/app/utils/helpers";
import Image from "next/image";

type YachtListingClientProps = {
  data: Yacht[] | any;
};

const YachtListingClient = ({ data }: YachtListingClientProps) => {
  const [yachtData, setYachtData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [sortCommand, setSortCommand] = useState("asc");
  const [filterCommand, setFilterCommand] = useState("");

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
          <span className="animate-spin">
            <Image
              src="/loader_black.svg"
              alt="Loading Icon"
              width={40}
              height={40}
            />
          </span>
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

  const handleFilterSortYachtLisitings = async ({
    sort,
    filter,
  }: {
    sort: "asc" | "desc";
    filter?: string;
  }) => {
    let apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL + "/yachts";
    if (filter) {
      apiUrl += "?" + filter;
    }
    const sortQuery = `sort=${sort}`;
    const url = filter ? `${apiUrl}&${sortQuery}` : `${apiUrl}?${sortQuery}`;
    setLoading(true);
    const sortedYachts = await tryCatch(fetch(url));
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
    setSortCommand(selectedValue);
    handleFilterSortYachtLisitings({
      sort: selectedValue as "asc" | "desc",
      filter: filterCommand,
    });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const [minPrice, maxPrice] = selectedValue.split(",").map(Number);
    let filterQuery = "";
    if (minPrice || maxPrice) {
      filterQuery = `min=${minPrice}&max=${maxPrice}`;
    }
    setFilterCommand(filterQuery);
    handleFilterSortYachtLisitings({
      sort: sortCommand as "asc" | "desc",
      filter: filterQuery,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredYachts = yachtData.filter((yacht: Yacht) =>
      yacht.name.toLowerCase().includes(searchValue)
    );
    setYachtData(filteredYachts);
  };

  return (
    <div className="yacht-listings-container w-full flex flex-col justify-center items-center gap-4">
      <div className="sort-filter-bnts w-11/12 flex flex-col gap-4 md:flex-row justify-center items-start md:justify-between md:items-center">
        <select
          onChange={handleSelectChange}
          className="lg:w-fit font-bold text-lg w-full border-b border-primary text-black outline-none bg-transparent focus:border-primary focus:ring-0"
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>

        <select
          onChange={handleFilterChange}
          className="lg:w-fit font-bold text-lg w-full border-b border-primary text-black outline-none bg-transparent focus:border-primary focus:ring-0"
        >
          <option value="">Filter by Budget (hr): All</option>
          <option value="0, 1000">
            Filter by Budget (hr): AED 0 - AED 1000
          </option>
          <option value="1000, 5000">
            Filter by Budget (hr): AED 1000 - AED 5000
          </option>
          <option value="5000, 10000">
            Filter by Budget (hr): AED 5000 - AED 10000
          </option>
          <option value="10000, 20000">
            Filter by Budget (hr): AED 10000 - AED 20000
          </option>
          <option value="20000,">
            Filter by Budget (hr): AED 20000 and Above
          </option>
        </select>

        {/* <select
          onChange={handleSelectChange}
          className="w-fit border-b border-primary text-black outline-none bg-transparent focus:border-primary focus:ring-0"
        >
          <option value="asc">Filter by Capacity: 5</option>
          <option value="desc">Filter by Capacity: 10</option>
          <option value="desc">Filter by Capacity: 15</option>
          <option value="desc">Filter by Capacity: 20</option>
          <option value="desc">Filter by Capacity: {">20"}</option>
        </select> */}
      </div>
      <div className="search-bar-container w-11/12 flex justify-center items-center">
        <div className="search-bar w-full flex justify-center items-center gap-2 rounded-lg shadow-sm bg-[#F0F0F0] py-2 px-4">
          <input
            onChange={handleSearchChange}
            type="search"
            placeholder="Search by Yacht Name"
            className="w-full text-black bg-[#F0F0F0] outline-none focus:border-primary focus:ring-0"
          />
        </div>
      </div>
      {handleShowYachtListings()}
    </div>
  );
};

export default YachtListingClient;
