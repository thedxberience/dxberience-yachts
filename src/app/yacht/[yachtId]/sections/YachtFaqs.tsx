const faqs = [
  {
    question: "What is included with a charter booking?",
    answer:
      "Every charter includes a dedicated crew, soft drinks, ice, fuel within the cruising zone, and marina fees. Optional upgrades like catering and watersports are available.",
  },
  {
    question: "How far in advance should we reserve a yacht?",
    answer:
      "Weekend and sunset slots book quickly. We recommend reserving 7–10 days in advance, or sooner for holidays and events.",
  },
  {
    question: "Can we customize the itinerary?",
    answer:
      "Yes. Our concierge team tailors routes around Dubai’s highlights or privacy-first escapes, depending on your preference.",
  },
  {
    question: "Is the experience suitable for celebrations?",
    answer:
      "Absolutely. We regularly host proposals, birthdays, and corporate gatherings with bespoke styling and on-board dining.",
  },
  {
    question: "What should guests bring on board?",
    answer:
      "Bring a valid ID, sunscreen, and any personal items. We provide towels and safety equipment for all guests.",
  },
  {
    question: "Do you provide professional photography?",
    answer:
      "Yes, we can arrange premium photography and drone coverage to capture your time on the water.",
  },
];

const YachtFaqs = () => {
  return (
    <section className="w-full bg-primary py-16 text-white lg:py-24">
      <div className="mx-auto flex w-11/12 flex-col gap-12 lg:w-9/12 lg:flex-row lg:gap-16">
        <div className="lg:w-4/12">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Frequently asked questions
          </p>
          <h3 className="mt-4 text-4xl font-IvyPresto lg:text-6xl">
            Essentials for a seamless charter.
          </h3>
          <p className="mt-4 text-sm text-white/70">
            From planning to on-board amenities, here is what to expect when
            chartering with Dxberience.
          </p>
        </div>
        <div className="grid gap-4 lg:w-8/12">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur"
            >
              <h4 className="text-base font-semibold">{faq.question}</h4>
              <p className="mt-3 text-sm text-white/70">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YachtFaqs;
