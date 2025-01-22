import Footer from "@/components/shared/Footer";
import Header from "./(sections)/header";
import YachtListings from "./(sections)/YachtListings";

export default function Home() {
  return (
    <main>
      <Header />
      <YachtListings />
      <Footer />
    </main>
  );
}
