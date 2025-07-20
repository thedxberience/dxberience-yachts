import Footer from "@/components/shared/Footer";
import Header from "./(sections)/header";
import AboutUs from "./(sections)/AboutUs";
import YachtListings from "./(sections)/YachtListings";
import RatingsSection from "@/components/RatingsSection";

export default function Home() {
  return (
    <main>
      <Header />
      <AboutUs />
      <YachtListings />
      <RatingsSection />
      <Footer />
    </main>
  );
}
