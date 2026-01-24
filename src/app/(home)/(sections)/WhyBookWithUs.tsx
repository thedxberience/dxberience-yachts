const features = [
  {
    title: "An Exclusive Fleet",
    description:
      "Our fleet features only premium, meticulously maintained luxury yachts selected for their design, performance, and comfort. Each vessel meets the highest standards of safety and elegance for a refined experience.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-14 w-14 text-[#C6740A]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 40h52l-6 12H12z" />
        <path d="M20 40l8-16h8l8 16" />
        <path d="M28 24V14h12v10" />
        <path d="M10 52h44" />
        <path d="M18 18h6" />
      </svg>
    ),
  },
  {
    title: "A Standard of Trusted Excellence",
    description:
      "Our reputation is built on consistency, discretion, and exceptional service. From professional crew members to seamless planning and execution, every experience is delivered with care, precision, and attention to detail.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-14 w-14 text-[#C6740A]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="18" r="8" />
        <path d="M16 54c2-10 10-16 16-16s14 6 16 16" />
        <path d="M24 30l8 6 8-6" />
        <path d="M22 46h20" />
      </svg>
    ),
  },
  {
    title: "Unmatched Privacy & Comfort",
    description:
      "Enjoy the rare luxury of complete privacy at sea. Our yachts are designed as personal sanctuaries, offering spacious interiors, serene outdoor lounges, and uninterrupted moments away from the crowd.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-14 w-14 text-[#C6740A]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="14" y="18" width="36" height="28" rx="4" />
        <path d="M20 18v-4a12 12 0 0 1 24 0v4" />
        <circle cx="32" cy="32" r="4" />
        <path d="M32 36v6" />
      </svg>
    ),
  },
];

const WhyBookWithUs = () => {
  return (
    <section className="w-full bg-[#140C0C] text-white py-14 lg:py-20">
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col items-center gap-10">
        <h2 className="text-3xl lg:text-6xl font-IvyPresto font-semibold text-white">
          Why Book With Us
        </h2>
        <div className="grid w-full gap-10 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center gap-4 px-2"
            >
              {feature.icon}
              <h3 className="text-xl lg:text-2xl font-IvyPresto font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm lg:text-base text-[#C9C2BF] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithUs;
