import Footer from "@/components/shared/Footer";
import YachtDetailPageHeader from "./sections/header";
import { Suspense } from "react";
import Image from "next/image";
import { tryCatch } from "@/app/utils/helpers";
import { getAll, getBySlug } from "@/app/api/yachts/service";
import YachtGalleryAndFaq from "./sections/YachtGalleryAndFaq";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: yachtsData, error: yachtError } = await tryCatch(getAll("asc"));

  if (yachtError || !yachtsData || yachtsData.error || !yachtsData.data) {
    return [];
  }

  const yachts = yachtsData.data;

  const yachtSlugs: { yachtId: string }[] = [];

  yachts.forEach((yacht) => {
    const hasValidThumbnail = Boolean(yacht?.thumbnail?.image);

    if (yacht.slug && hasValidThumbnail) {
      yachtSlugs.push({ yachtId: yacht.slug });
    }
  });

  return yachtSlugs;
}

const page = async ({ params }: { params: Promise<{ yachtId: string }> }) => {
  const { yachtId } = await params;

  const { data, error } = await tryCatch(getBySlug(yachtId));

  if (error) {
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
        <p className="text-white text-lg font-semibold">No yacht data available.</p>
      </div>
    );
  }

  const fallbackYachtImage = "/images/yachts_hero_img.jpeg";
  const url = data?.thumbnail?.image || fallbackYachtImage;
  const altText = data?.thumbnail?.altText || `${data.name} yacht image`;

  return (
    <main className="w-full h-full">
      <Suspense fallback={<p>Loading yacht details...</p>}>
        <YachtDetailPageHeader
          prices={data.prices}
          slug={data.slug}
          yachtName={data.name}
          yachtDescription={data.formDescription}
          yachtImageUrl={url}
          yachtImageAlt={altText}
        />
        <YachtGalleryAndFaq
          yachtName={data.name}
          gallery={data.gallery}
          fallbackImage={{
            image: url,
            altText,
          }}
        />
      </Suspense>
      <Footer />
    </main>
  );
};

export default page;
