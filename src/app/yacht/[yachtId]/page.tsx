import Footer from "@/components/shared/Footer";
import YachtDetailPageHeader from "./sections/header";
import YachtDescription from "./sections/YachtDescription";
import YachtDetails from "./sections/YachtDetails";
import YachtCarousel from "./sections/YachtCarousel";

const page = () => {
  return (
    <main className="w-full h-full">
      <YachtDetailPageHeader />
      <YachtDescription />
      <YachtDetails />
      <YachtCarousel />
      <Footer />
    </main>
  );
};

export default page;
