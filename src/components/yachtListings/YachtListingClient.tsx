"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [allYachts, setAllYachts] = useState(data);
  const [loading, setLoading] = useState(false);
  const [sortCommand, setSortCommand] = useState("desc");
  const [budgetCommand, setBudgetCommand] = useState("");
  const [capacityCommand, setCapacityCommand] = useState("");

  const budgetFilters = [
    { label: "All", value: "" },
    { label: "AED 0 - 1,000", value: "min=0&max=1000" },
    { label: "AED 1,000 - 5,000", value: "min=1000&max=5000" },
    { label: "AED 5,000 - 10,000", value: "min=5000&max=10000" },
    { label: "AED 10,000+", value: "min=10000" },
  ];

  const sortFilters = [
    { label: "Price: High to Low", value: "desc" },
    { label: "Price: Low to High", value: "asc" },
  ];

  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isCapacityOpen, setIsCapacityOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const priceMenuRef = useRef<HTMLDetailsElement | null>(null);
  const capacityMenuRef = useRef<HTMLDetailsElement | null>(null);
  const sortMenuRef = useRef<HTMLDetailsElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const [capacityLabel, setCapacityLabel] = useState("Capacity");
  const currentBudgetLabel =
    budgetFilters.find((filter) => filter.value === budgetCommand)?.label ??
    "Price";
  const currentSortLabel =
    sortFilters.find((filter) => filter.value === sortCommand)?.label ?? "Sort";

  const capacityFilters = [
    { label: "All", value: "" },
    { label: "Up to 10 Guests", value: "capacityMin=1&capacityMax=10" },
    { label: "11 - 20 Guests", value: "capacityMin=11&capacityMax=20" },
    { label: "21 - 30 Guests", value: "capacityMin=21&capacityMax=30" },
    { label: "31+ Guests", value: "capacityMin=31" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedPrice = priceMenuRef.current?.contains(target);
      const clickedCapacity = capacityMenuRef.current?.contains(target);
      const clickedSort = sortMenuRef.current?.contains(target);
      if (!clickedPrice && !clickedCapacity && !clickedSort) {
        setIsPriceOpen(false);
        setIsCapacityOpen(false);
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [yachtData?.length]);

  const totalPages = useMemo(() => {
    if (!yachtData || yachtData.length === 0) {
      return 1;
    }
    return Math.max(1, Math.ceil(yachtData.length / pageSize));
  }, [pageSize, yachtData]);

  const pagedYachts = useMemo(() => {
    if (!yachtData || yachtData.length === 0) {
      return [];
    }
    const startIndex = (currentPage - 1) * pageSize;
    return yachtData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, yachtData]);

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const getPageItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages: (number | "...")[] = [1];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) {
      pages.push("...");
    }

    for (let page = left; page <= right; page += 1) {
      pages.push(page);
    }

    if (right < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };
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
      // console.log(JSON.stringify(yachtData[0]));
      return (
        <div className="mt-10 w-11/12 max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {pagedYachts.map((yacht: Yacht) => {
            if (!yacht.thumbnail || !yacht.prices) {
              return null; // Skip rendering if thumbnail or prices is not available
            }

            const pricePerHour = yacht.prices.find(
              (price) =>
                price.type.toLowerCase() === "hourly" ||
                price.type.toLocaleLowerCase() === "per hour"
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
    const url = new URL("/api/yachts", window.location.origin);
    url.searchParams.set("sort", sort);
    if (filter) {
      const filterParams = new URLSearchParams(filter);
      filterParams.forEach((value, key) => {
        if (value !== "") {
          url.searchParams.set(key, value);
        }
      });
    }
    setLoading(true);
    const sortedYachts = await tryCatch(fetch(url.toString()));
    setLoading(false);
    if (sortedYachts.error) {
      console.error("Error sorting yachts:", sortedYachts.error);
      return;
    }
    const { result } = await sortedYachts.data.json();
    setAllYachts(result);
    setYachtData(result);
  };

  const buildFilterCommand = (
    nextBudget: string,
    nextCapacity: string
  ): string => {
    if (nextBudget && nextCapacity) {
      return `${nextBudget}&${nextCapacity}`;
    }
    return nextBudget || nextCapacity || "";
  };

  const currentFilterCommand = useMemo(
    () => buildFilterCommand(budgetCommand, capacityCommand),
    [budgetCommand, capacityCommand]
  );

  const handleSortChange = (sort: "asc" | "desc") => {
    setSortCommand(sort);
    handleFilterSortYachtLisitings({
      sort,
      filter: currentFilterCommand,
    });
  };

  const handleBudgetChange = (filter: string) => {
    setBudgetCommand(filter);
    handleFilterSortYachtLisitings({
      sort: sortCommand as "asc" | "desc",
      filter: buildFilterCommand(filter, capacityCommand),
    });
  };

  const handleResetBudget = () => {
    setBudgetCommand("");
    handleFilterSortYachtLisitings({
      sort: sortCommand as "asc" | "desc",
      filter: buildFilterCommand("", capacityCommand),
    });
  };

  const handleCapacityChange = (filter: string) => {
    setCapacityCommand(filter);
    const selectedLabel =
      capacityFilters.find((item) => item.value === filter)?.label ??
      "Capacity";
    setCapacityLabel(selectedLabel);
    handleFilterSortYachtLisitings({
      sort: sortCommand as "asc" | "desc",
      filter: buildFilterCommand(budgetCommand, filter),
    });
  };

  const handleResetCapacity = () => {
    setCapacityCommand("");
    setCapacityLabel("Capacity");
    handleFilterSortYachtLisitings({
      sort: sortCommand as "asc" | "desc",
      filter: buildFilterCommand(budgetCommand, ""),
    });
  };

  const handleResetSort = () => {
    setSortCommand("desc");
    handleFilterSortYachtLisitings({
      sort: "desc",
      filter: currentFilterCommand,
    });
  };

  const closeMenu = () => {
    setIsPriceOpen(false);
    setIsCapacityOpen(false);
    setIsSortOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    if (!searchValue) {
      setYachtData(allYachts);
      return;
    }
    const filteredYachts = allYachts.filter((yacht: Yacht) =>
      yacht.name.toLowerCase().includes(searchValue)
    );
    setYachtData(filteredYachts);
  };

  return (
    <div className="yacht-listings-container w-full flex flex-col justify-center items-center gap-8">
      <div className="filter-bar w-11/12 max-w-6xl flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="search-bar w-full md:w-[240px] flex items-center gap-2 rounded-full border border-black/20 bg-white px-4 py-2">
            <input
              onChange={handleSearchChange}
              type="search"
              placeholder="Search yachts"
              className="w-full text-sm text-black bg-transparent outline-none"
            />
          </div>

          <details ref={priceMenuRef} open={isPriceOpen} className="relative">
            <summary
              onClick={(event) => {
                event.preventDefault();
                setIsPriceOpen((prev) => !prev);
                setIsSortOpen(false);
                setIsCapacityOpen(false);
              }}
              className="cursor-pointer list-none rounded-full border border-black/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-secondary"
            >
              {currentBudgetLabel}
            </summary>
            <div className="absolute left-0 z-10 mt-2 w-[260px] rounded-2xl border border-black/10 bg-white p-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-black/10 pb-2 text-xs uppercase tracking-[0.2em] text-secondary">
                <span>Category</span>
                <button
                  onClick={() => {
                    handleResetBudget();
                    closeMenu();
                  }}
                  className="text-primary"
                >
                  Reset
                </button>
              </div>
              <div className="flex flex-col gap-2 pt-3">
                {budgetFilters.map((filter) => {
                  const isActive = budgetCommand === filter.value;
                  return (
                    <button
                      key={filter.label}
                      onClick={() => {
                        handleBudgetChange(filter.value);
                        closeMenu();
                      }}
                      className={`rounded-full border px-3 py-2 text-left text-xs ${isActive
                        ? "border-black bg-black text-white"
                        : "border-black/20 text-secondary"
                        }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </details>

          <details
            ref={capacityMenuRef}
            open={isCapacityOpen}
            className="relative"
          >
            <summary
              onClick={(event) => {
                event.preventDefault();
                setIsCapacityOpen((prev) => !prev);
                setIsPriceOpen(false);
                setIsSortOpen(false);
              }}
              className="cursor-pointer list-none rounded-full border border-black/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-secondary"
            >
              {capacityLabel}
            </summary>
            <div className="absolute left-0 z-10 mt-2 w-[240px] rounded-2xl border border-black/10 bg-white p-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-black/10 pb-2 text-xs uppercase tracking-[0.2em] text-secondary">
                <span>Capacity</span>
                <button
                  onClick={() => {
                    handleResetCapacity();
                    closeMenu();
                  }}
                  className="text-primary"
                >
                  Reset
                </button>
              </div>
              <div className="flex flex-col gap-2 pt-3">
                {capacityFilters.map((filter) => {
                  const isActive = capacityCommand === filter.value;
                  return (
                    <button
                      key={filter.label}
                      onClick={() => {
                        handleCapacityChange(filter.value);
                        closeMenu();
                      }}
                      className={`rounded-full border px-3 py-2 text-left text-xs ${
                        isActive
                          ? "border-black bg-black text-white"
                          : "border-black/20 text-secondary"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </details>

          <details ref={sortMenuRef} open={isSortOpen} className="relative">
            <summary
              onClick={(event) => {
                event.preventDefault();
                setIsSortOpen((prev) => !prev);
                setIsPriceOpen(false);
                setIsCapacityOpen(false);
              }}
              className="cursor-pointer list-none rounded-full border border-black/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-secondary"
            >
              {currentSortLabel}
            </summary>
            <div className="absolute left-0 z-10 mt-2 w-[220px] rounded-2xl border border-black/10 bg-white p-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-black/10 pb-2 text-xs uppercase tracking-[0.2em] text-secondary">
                <span>Price</span>
                <button
                  onClick={() => {
                    handleResetSort();
                    closeMenu();
                  }}
                  className="text-primary"
                >
                  Reset
                </button>
              </div>
              <div className="flex flex-col gap-2 pt-3">
                {sortFilters.map((filter) => {
                  const isActive = sortCommand === filter.value;
                  return (
                    <button
                      key={filter.label}
                      onClick={() => {
                        handleSortChange(filter.value as "asc" | "desc");
                        closeMenu();
                      }}
                      className={`rounded-full border px-3 py-2 text-left text-xs ${isActive
                        ? "border-black bg-black text-white"
                        : "border-black/20 text-secondary"
                        }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </details>
        </div>
      </div>
      {handleShowYachtListings()}
      {yachtData && yachtData.length > pageSize ? (
        <div className="w-11/12 flex items-center justify-center gap-2 pb-8">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] ${currentPage === 1
              ? "border-black/10 text-black/30"
              : "border-black/30 text-secondary"
              }`}
          >
            Prev
          </button>
          {getPageItems().map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm text-secondary"
                >
                  …
                </span>
              );
            }

            const pageNumber = item as number;
            const isActive = currentPage === pageNumber;
            return (
              <button
                key={`page-${pageNumber}`}
                onClick={() => handlePageChange(pageNumber)}
                className={`h-9 w-9 rounded-full border text-xs ${isActive
                  ? "border-black bg-black text-white"
                  : "border-black/20 text-secondary"
                  }`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] ${currentPage === totalPages
              ? "border-black/10 text-black/30"
              : "border-black/30 text-secondary"
              }`}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default YachtListingClient;
