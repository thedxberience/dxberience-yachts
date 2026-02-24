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
    <section className="flex flex-col justify-center items-center w-full py-6 lg:py-10">
      <YachtListingClient data={data} />
    </section>
  );
};

export default YachtListings;
