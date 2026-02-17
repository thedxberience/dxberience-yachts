"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryItem = {
  image?: string | null;
  altText?: string | null;
};

type YachtGalleryAndFaqProps = {
  yachtName: string;
  gallery?: GalleryItem[];
  fallbackImage: {
    image: string;
    altText: string;
  };
};

const FAQ_ITEMS = [
  {
    question: "What is included in a standard yacht charter?",
    answer:
      "Most charters include a licensed captain, crew support, bottled water, soft drinks, ice, and sound system access. Add-ons such as catering, DJ services, decorations, and water toys can be arranged on request.",
  },
  {
    question: "How early should I book for weekends or special occasions?",
    answer:
      "For prime sunset slots, weekends, and peak season dates, booking 7–14 days ahead is recommended. For events and larger groups, we advise reserving even earlier to secure your preferred yacht and time window.",
  },
  {
    question: "Can beginners or first-time guests enjoy a yacht experience?",
    answer:
      "Absolutely. The experience is curated for both first-time guests and seasoned charter clients. Our team shares a full briefing before departure and handles onboard service so you can simply relax and enjoy.",
  },
  {
    question: "What should guests wear and bring onboard?",
    answer:
      "Light resort wear, sunglasses, sunscreen, and soft-soled footwear are ideal. We also recommend bringing a light layer for evening cruises and keeping valuables minimal for comfort.",
  },
  {
    question: "Is the yacht suitable for celebrations and corporate hosting?",
    answer:
      "Yes. Yachts are frequently booked for birthdays, proposals, anniversaries, and executive hosting. We can tailor atmosphere, catering, and itinerary to match the tone of your event.",
  },
];

const YachtGalleryAndFaq = ({
  yachtName,
  gallery,
  fallbackImage,
}: YachtGalleryAndFaqProps) => {
  const imageGallery = useMemo(() => {
    const sanitizedGallery =
      gallery
        ?.filter((item) => Boolean(item?.image))
        .map((item) => ({
          image: item.image as string,
          altText: item.altText || `${yachtName} gallery image`,
        })) || [];

    if (sanitizedGallery.length) {
      return sanitizedGallery;
    }

    return [fallbackImage];
  }, [gallery, fallbackImage, yachtName]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = imageGallery[selectedImageIndex] || fallbackImage;

  return (
    <section className="w-full flex flex-col items-center my-14 lg:my-24">
      <div className="w-11/12 max-w-[1240px] flex flex-col gap-16 lg:gap-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="uppercase tracking-[0.25em] text-xs text-secondary">Gallery</p>
            <h2 className="font-IvyPresto text-4xl md:text-6xl text-foreground-light leading-tight">
              {yachtName} Showcase
            </h2>
          </div>

          <div className="relative w-full h-[320px] md:h-[460px] lg:h-[620px] overflow-hidden rounded-sm bg-[#0d0d0d]">
            <Image
              src={selectedImage.image}
              alt={selectedImage.altText || `${yachtName} gallery image`}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {imageGallery.map((item, index) => (
              <button
                key={`${item.image}-${index}`}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative h-[120px] md:h-[140px] overflow-hidden border transition-all ${
                  selectedImageIndex === index
                    ? "border-foreground-light"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1} in maximized gallery`}
              >
                <Image
                  src={item.image}
                  alt={item.altText || `${yachtName} thumbnail`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#d7d7d7] pt-12 lg:pt-16">
          <div className="flex flex-col gap-3 mb-8">
            <p className="uppercase tracking-[0.25em] text-xs text-secondary">FAQs</p>
            <h3 className="font-IvyPresto text-4xl md:text-5xl text-foreground-light">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="flex flex-col divide-y divide-[#d7d7d7]">
            {FAQ_ITEMS.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
                  <span className="text-lg md:text-xl text-foreground-light">{faq.question}</span>
                  <span className="text-xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-sm md:text-base text-secondary mt-4 max-w-4xl">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtGalleryAndFaq;
