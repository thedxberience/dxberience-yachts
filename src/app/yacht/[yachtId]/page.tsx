// "use client";
import Footer from "@/components/shared/Footer";
import YachtDetailPageHeader from "./sections/header";
import YachtDescription from "./sections/YachtDescription";
import YachtDetails from "./sections/YachtDetails";
import YachtCarousel from "./sections/YachtCarousel";
import { Suspense } from "react";
import Image from "next/image";
import { Yacht } from "@/data/types";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

export async function generateStaticParams() {
  const yachtsReq = await fetch(process.env.BASE_API_URL + "/yachts", {
    next: { tags: ["yachts"] },
  });
  const yachts: Yacht[] = await yachtsReq.json();

  const allYachts = yachts.map((yacht) => {
    return {
      yachtId: yacht.slug,
    };
  });

  return allYachts;
}

const page = async ({ params }: { params: Promise<{ yachtId: string }> }) => {
  const { yachtId } = await params;

  let data;
  try {
    const yachtDetailsReq = await fetch(
      `${process.env.BASE_API_URL}/yachts/${yachtId}`
    );
    data = await yachtDetailsReq.json();
    console.log(data);
  } catch (error) {
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
          There was an error loading this page: {data}
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
