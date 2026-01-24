import Footer from "@/components/shared/Footer";
import Header from "./(sections)/header";
import ExperienceSection from "./(sections)/ExperienceSection";
import MostBookedYacht from "./(sections)/MostBookedYacht";
import WhyBookWithUs from "./(sections)/WhyBookWithUs";
import AboutUs from "./(sections)/AboutUs";
import RatingsSection from "@/components/RatingsSection";
import FreeGuideSection from "./(sections)/FreeGuideSection";

export default function Home() {
  return (
    <main>
      <Header />
      <ExperienceSection />
      <MostBookedYacht />
      <WhyBookWithUs />
      <AboutUs />
      <RatingsSection />
      <FreeGuideSection />
      <Footer />
    </main>
  );
}
