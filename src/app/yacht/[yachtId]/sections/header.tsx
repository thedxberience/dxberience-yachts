"use client";

import Navbar from "@/components/shared/Navbar";
import { prices } from "@/data/types";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type GalleryItem = {
  image: string;
  altText: string;
};

type YachtDetailPageHeaderProps = {
  yachtName: string;
  yachtImageUrl: string;
  yachtImageAlt: string;
  yachtDescription: string;
  slug: string;
  prices: prices[];
  gallery: GalleryItem[];
};

const YachtDetailPageHeader = ({
  yachtName,
  yachtImageAlt,
  yachtImageUrl,
  yachtDescription,
  slug,
  prices,
  gallery,
}: YachtDetailPageHeaderProps) => {
  const whatsappHref = `https://api.whatsapp.com/send/?phone=971585787558&text=${encodeURIComponent(
    `Hello, I'm interested in the ${yachtName} yacht for rent`
  )}`;

  const galleryItems = useMemo(() => {
    if (!gallery || gallery.length === 0) {
      return [
        {
          image: yachtImageUrl,
          altText: yachtImageAlt || "Yacht image",
        },
      ];
    }
    return gallery.map((item) => ({
      image: item.image,
      altText: item.altText || "Yacht image",
    }));
  }, [gallery, yachtImageAlt, yachtImageUrl]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage =
    activeIndex !== null ? galleryItems[activeIndex] : null;

  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % galleryItems.length
    );
  };

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) =>
      prev === null
        ? 0
        : (prev - 1 + galleryItems.length) % galleryItems.length
    );
  };

  return (
    <header className="yacht-detail-page w-full min-h-[100svh] h-full md:min-h-[750px] md:h-[800px]">
      <Navbar />
      <div className="absolute -z-10 top-0 w-full">
        <div className="overlay absolute"></div>
        <div className="bg-image overflow-hidden relative w-full min-h-[750px] h-full lg:h-[800px]">
          <Image
            src={yachtImageUrl}
            alt={yachtImageAlt || "Yacht image"}
            fill
            className="object-cover scale-125"
          />
        </div>
      </div>
      <div className="main-content nav-offset w-full h-full flex justify-center items-center">
        <div className="w-11/12 h-full flex flex-col justify-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="relative hidden xl:flex w-[52vw] h-[58vh] overflow-hidden rounded-[32px] border border-white/15 shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
            <Image
              src={yachtImageUrl}
              alt={yachtImageAlt || "Yacht image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex w-full flex-col gap-6 lg:w-[520px]">
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                {slug}
              </p>
              <h1 className="text-4xl font-IvyPresto text-white sm:text-5xl lg:text-6xl">
                {yachtName}
              </h1>
              <p className="text-sm text-white/80 leading-relaxed">
                {yachtDescription}
              </p>
            </div>
            <div className="grid gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Charter rates
              </p>
              <div className="space-y-3">
                {prices.map((price) => (
                  <div
                    key={`${price.type}-${price.price}`}
                    className="flex items-center justify-between text-sm text-white/85"
                  >
                    <span className="uppercase tracking-[0.2em] text-white/60">
                      {price.type}
                    </span>
                    <span className="text-base font-semibold text-white">
                      AED {price.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/70 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                <Image
                  src="/footer_whatsapp.svg"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                />
                Enquire on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#f6f4f1] py-14 text-primary">
        <div className="mx-auto w-11/12 lg:w-9/12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                Gallery
              </p>
              <h2 className="mt-4 text-3xl font-IvyPresto lg:text-5xl">
                Moments curated for a refined escape.
              </h2>
            </div>
            <p className="text-sm text-secondary lg:max-w-md">
              Explore the yacht from every angle. Tap an image to view it in a
              dedicated, full-screen gallery experience.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <button
                key={`${item.image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative h-52 overflow-hidden rounded-3xl border border-black/10 bg-black/5 text-left shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition hover:-translate-y-1"
              >
                <Image
                  src={item.image}
                  alt={item.altText}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 py-10">
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-6 top-6 rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white"
          >
            Prev
          </button>
          <div className="relative h-[70vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20">
            <Image
              src={activeImage.image}
              alt={activeImage.altText}
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white"
          >
            Next
          </button>
        </div>
      )}
    </header>
  );
};

export default YachtDetailPageHeader;
