// "use client";
import Footer from "@/components/shared/Footer";
import YachtDetailPageHeader from "./sections/header";
import YachtDescription from "./sections/YachtDescription";
import YachtDetails from "./sections/YachtDetails";
import YachtCarousel from "./sections/YachtCarousel";
import { Suspense } from "react";
import Image from "next/image";
import { Yacht } from "@/data/types";
import { tryCatch } from "@/app/utils/helpers";
import { getAll } from "@/app/api/yachts/service";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

export async function generateStaticParams() {
  const { data: yachtsData, error: yachtError } = await tryCatch(getAll("asc"));

  if (yachtError || !yachtsData) {
    return [];
  }
  const yachts: Yacht[] = yachtsData.data;

  return yachts.map((yacht) => ({
    yachtId: yacht.slug,
  }));
}

const page = async ({ params }: { params: Promise<{ yachtId: string }> }) => {
  const { yachtId } = await params;

  const { data: response, error } = await tryCatch(
    fetch(process.env.BASE_API_URL + `/yachts/${yachtId}`)
  );

  if (error) {
    // Handle the error appropriately
    console.error("Error loading yacht details:", error);
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

  const { data } = await response.json();

  // console.log("Yacht data:", data);

  if (!data || Object.keys(data).length === 0) {
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
          No yacht data available.
        </p>
      </div>
    );
  }

  return (
    <main className="w-full h-full">
      <Suspense fallback={<p>Loading yacht details...</p>}>
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
      </Suspense>
      <Footer />
    </main>
  );
};

export default page;
