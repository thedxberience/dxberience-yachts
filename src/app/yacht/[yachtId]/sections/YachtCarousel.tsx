const YachtCarousel = () => {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="section-container w-full h-full flex justify-center items-center">
        <div className="section-header w-11/12 lg:w-9/12 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-0">
          <div className="header lg:w-5/12">
            <h3 className="text-5xl lg:text-8xl font-IvyPresto ">
              Spacious Beauty
            </h3>
          </div>
          <div className="yacht-description text-sm text-secondary lg:w-6/12">
            <p>
              The exterior exudes power and sophistication, featuring
              aerodynamic contours inspired by Lamborghini supercars, with
              carbon fiber construction ensuring a lightweight yet robust
              structure. Its metallic finish and customizable color options add
              a touch of exclusivity. The Lamborghini 63 Yacht is not just a
              vessel; it’s an embodiment of speed, luxury, and innovation,
              setting a new standard for high-performance yachting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YachtCarousel;
