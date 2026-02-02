import Navbar from "@/components/shared/Navbar";
import BookingForm from "@/components/yacht/BookingForm";
import { prices } from "@/data/types";
import Image from "next/image";
import Link from "next/link";

type YachtDetailPageHeaderProps = {
  yachtName: string;
  yachtImageUrl: string;
  yachtImageAlt: string;
  yachtDescription: string;
  slug: string;
  prices: prices[];
};

const YachtDetailPageHeader = ({
  yachtName,
  yachtImageAlt,
  yachtImageUrl,
  yachtDescription,
  slug,
  prices,
}: YachtDetailPageHeaderProps) => {
  const whatsappHref = `https://api.whatsapp.com/send/?phone=971585787558&text=${encodeURIComponent(
    `Hello, I'm interested in the ${yachtName} yacht for rent`
  )}`;

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
        <div className="w-11/12 h-full flex justify-center items-center">
          <div className="relative hidden xl:flex w-[73.906vw] h-[55vh] overflow-hidden">
            <Image
              src={yachtImageUrl}
              alt={yachtImageAlt || "Yacht image"}
              fill
              className="object-cover yacht-header-img"
            />
          </div>
          <div
            id="header-form"
            className="header-form-container w-full xl:w-[681px] h-full flex flex-col justify-center items-start gap-6 xl:-ml-28"
          >
            <BookingForm
              slug={slug}
              yachtName={yachtName}
              yachtDescription={yachtDescription}
              prices={prices}
            />
            <div className="w-full flex flex-col gap-3 rounded-2xl border border-white/20 bg-black/60 px-5 py-4 text-white backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Concierge on WhatsApp
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/80">
                  Ask about availability, itineraries, or bespoke upgrades.
                </p>
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-black"
                >
                  <Image
                    src="/footer_whatsapp.svg"
                    alt="WhatsApp"
                    width={16}
                    height={16}
                  />
                  Chat now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default YachtDetailPageHeader;
