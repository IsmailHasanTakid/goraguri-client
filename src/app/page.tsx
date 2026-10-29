import Choose from "./components/home/Choose";
import FeaturedPage from "./components/home/Featured";
import Hero from "./components/home/Hero";
import Ready from "./components/home/Ready";
import Travel from "./components/home/Travel";


export default function Home() {
  return (
    <main >

      <Hero />
      <FeaturedPage />
      <Choose />
      <Travel />
      <Ready />
    </main>
  );
}
