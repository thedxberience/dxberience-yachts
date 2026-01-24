const FreeGuideSection = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="w-11/12 max-w-3xl mx-auto flex flex-col items-center gap-10">
        <h2 className="text-3xl lg:text-6xl font-IvyPresto font-semibold text-primary text-center">
          Get Your Free Guide
        </h2>
        <form className="w-full flex flex-col items-center gap-8">
          <div className="w-full grid gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-secondary">
              <span>First Name *</span>
              <input
                type="text"
                name="firstName"
                className="w-full border-b border-secondary bg-transparent pb-2 text-primary outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-secondary">
              <span>Last Name *</span>
              <input
                type="text"
                name="lastName"
                className="w-full border-b border-secondary bg-transparent pb-2 text-primary outline-none"
                required
              />
            </label>
          </div>
          <label className="flex w-full flex-col gap-2 text-sm text-secondary">
            <span>Email Address *</span>
            <input
              type="email"
              name="email"
              className="w-full border-b border-secondary bg-transparent pb-2 text-primary outline-none"
              required
            />
          </label>
          <div className="relative w-fit">
            <div className="absolute -bottom-2 left-2 h-10 w-full border border-black bg-black" />
            <button
              type="submit"
              className="relative flex items-center gap-3 border border-black bg-white px-8 py-3 text-xs uppercase text-black"
            >
              Submit
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-black text-[10px]">
                →
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FreeGuideSection;
