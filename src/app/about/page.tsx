import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CustomButton from "@/components/shared/CustomButton";

const coreValues = [
  {
    title: "Excellence",
    description:
      "We uphold the highest standards in service, safety, and quality—ensuring every experience exceeds expectations.",
  },
  {
    title: "Personalization",
    description:
      "Every guest is unique. We tailor each journey to reflect individual preferences, desires, and lifestyles.",
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency, professionalism, and respect—earning trust through consistency and reliability.",
  },
  {
    title: "Privacy",
    description:
      "We value discretion and exclusivity, offering our guests a peaceful sanctuary away from the crowd.",
  },
  {
    title: "Attention to Detail",
    description:
      "From the smallest touch to the grandest gesture, we believe true luxury lives in the details.",
  },
];

const whatsappHref = `https://api.whatsapp.com/send/?phone=971585787558&text=${encodeURIComponent(
  "Hello, I'm interested in booking a yacht."
)}`;

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="relative min-h-[620px] lg:min-h-[760px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/aboutUs/hero-image.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10">
          <Navbar />
          <div className="w-11/12 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center py-16 lg:py-24">
            <div className="relative hidden lg:block">
              <div className="relative w-full max-w-[360px] h-[420px] shadow-2xl">
                <Image
                  src="/images/aboutUs/left.jpg"
                  alt="Luxury yacht on calm waters"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-white flex flex-col gap-6 lg:gap-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-IvyPresto font-semibold leading-tight text-white">
                Luxury Yacht Rental In Dubai
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl">
                Every voyage is crafted with intention. Every moment,
                unforgettable.
              </p>
              <div className="flex items-center gap-4">
                <CustomButton btnName="Book Now" isLink href={whatsappHref} />
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute right-[8%] bottom-16 w-[320px] h-[180px] shadow-2xl">
            <Image
              src="/images/aboutUs/hero.jpg"
              alt="Speed boat creating a wake"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center items-center py-16 lg:py-24 bg-white">
        <div className="w-11/12 max-w-6xl grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
          <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[460px] shadow-xl">
            <Image
              src="/images/aboutUs/left.jpg"
              alt="Private yacht deck experience"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-IvyPresto font-semibold">
              Redefining Luxury on the Water
            </h2>
            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              We are a luxury yacht experience brand dedicated to creating
              bespoke moments on the open water. With a carefully selected fleet
              and a passion for excellence, we provide private yacht experiences
              that blend sophistication, comfort, and seamless service.
            </p>
            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              Our focus is simple: to offer a world-class yachting experience
              where every detail is thoughtfully managed so our guests can
              relax, indulge, and enjoy the journey without compromise.
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full py-16 lg:py-28">
        <div className="absolute inset-0 bg-[url('/images/aboutUs/our-mission.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 w-11/12 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
          <div className="hidden lg:block" />
          <div className="text-white flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl sm:text-4xl font-IvyPresto font-semibold text-white">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Dxberience excels in tailoring services to meet the unique
                preferences and requirements of each client. Whether arranging
                bespoke travel itineraries, securing exclusive event access, or
                organizing private celebrations, Dxberience is committed to
                personalization. Every detail aligns perfectly with the
                client&apos;s vision and desires. This personalized approach
                fosters a deep sense of satisfaction and loyalty among clients
                who appreciate the bespoke touch.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl sm:text-4xl font-IvyPresto font-semibold text-white">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                To become a leading name in luxury yachting, recognized globally
                for excellence, innovation, and unforgettable experiences on the
                water. We aim to redefine how people experience luxury at sea
                while setting new standards for comfort, service, and
                sophistication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center items-center py-16 lg:py-24 bg-white">
        <div className="w-11/12 max-w-6xl flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-IvyPresto font-semibold">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-secondary">
              Our focus is simple: to offer a world-class yachting experience
              where every detail is thoughtfully managed so our guests can
              relax, indulge, and enjoy the journey without compromise.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
            {coreValues.map((value) => (
              <div key={value.title} className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
            <div className="col-span-1 lg:col-span-3 bg-[#1B1110] text-white p-8 flex flex-col gap-6 shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-IvyPresto font-semibold text-white">
                Book A Yacht With Us Today
              </h3>
              <CustomButton btnName="Book Now" isLink href={whatsappHref} invert />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
