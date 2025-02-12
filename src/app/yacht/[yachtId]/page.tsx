"use client";
import Footer from "@/components/shared/Footer";
import YachtDetailPageHeader from "./sections/header";
import YachtDescription from "./sections/YachtDescription";
import YachtDetails from "./sections/YachtDetails";
import YachtCarousel from "./sections/YachtCarousel";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { use } from "react";
import Image from "next/image";

const page = ({ params }: { params: Promise<{ yachtId: string }> }) => {
  const { yachtId } = use(params);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["yachtDetails", yachtId],
    queryFn: async () => {
      const res = await makeRequest(`/yachts/${yachtId}`);
      console.log(res);
      return res;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-primary flex flex-col justify-center items-center">
        <div className="dxberience_logo relative w-[136.34px] h-[33.29px] lg:w-[172px] lg:h-[42px]">
          <Image
            src={"/dxberience_logo.png"}
            alt="Dxberience Logo"
            fill
            className="object-cover animate-pulse"
          />
        </div>
        <p className="text-white text-lg font-semibold">Loading...</p>
      </div>
    );
  } else if (isError) {
    return (
      <div className="w-full h-screen bg-primary flex flex-col justify-center items-center">
        <div className="dxberience_logo relative w-[136.34px] h-[33.29px] lg:w-[172px] lg:h-[42px]">
          <Image
            src={"/dxberience_logo.png"}
            alt="Dxberience Logo"
            fill
            className="object-cover animate-pulse"
          />
        </div>
        <p className="text-white text-lg font-semibold">
          There was an error loading this page: {error.message}
        </p>
      </div>
    );
  }

  return (
    <main className="w-full h-full">
      <YachtDetailPageHeader
        prices={data.prices}
        slug={data.slug}
        yachtName={data.name}
        yachtDescription={data.formDescription}
        yachtImageUrl={data.thumbnail.image}
        yachtImageAlt={data.thumbnail.altText}
      />
      <YachtDescription
        yachtName={data.name}
        yachtDescription={data.mainDescription}
        yachtImageUrl={data.thumbnail.image}
        yachtImageAlt={data.thumbnail.altText}
      />
      <YachtDetails
        buildDate={data.buildDate}
        cabins={data.cabins}
        capacity={data.capacity}
        prices={data.prices}
        description={data.shortDescription}
        length={data.length}
      />
      <YachtCarousel
        carouselHeader={data.moreDetailsTitle}
        carouselDescription={data.moreDetails}
        carouselGallery={data.gallery}
      />
      <Footer />
    </main>
  );
};

export default page;
