import Footer from "@/components/shared/Footer";
import Header from "./(sections)/header";
import YachtListings from "./(sections)/YachtListings";
import RatingsSection from "@/components/RatingsSection";

export default function Home() {
  return (
    <main>
      <Header />
      <YachtListings />
      <RatingsSection />
      <Footer />
    </main>
  );
}
