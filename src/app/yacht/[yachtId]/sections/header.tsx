import Navbar from "@/components/shared/Navbar";
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
}: YachtDetailPageHeaderProps) => {
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the ${yachtName} yacht for rent. Could you share availability and packages?`
  );

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
        <div className="w-11/12 max-w-[1150px] flex flex-col items-start justify-center gap-6 text-white">
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm">Private Yacht Charter</p>
          <h1 className="font-IvyPresto text-5xl md:text-7xl leading-tight max-w-3xl">{yachtName}</h1>
          <p className="text-sm md:text-base max-w-2xl text-white/90">{yachtDescription}</p>
          <div id="header-whatsapp-cta" className="mt-2">
            <Link
              href={`https://api.whatsapp.com/send/?phone=971585787558&text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#2A8C6C] hover:bg-[#22745a] transition-colors duration-300 px-7 py-4 uppercase tracking-[0.15em] text-xs md:text-sm font-medium"
            >
              <Image
                src="/images/whatsapp.png"
                alt="WhatsApp"
                width={22}
                height={22}
                className="object-contain"
              />
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default YachtDetailPageHeader;
