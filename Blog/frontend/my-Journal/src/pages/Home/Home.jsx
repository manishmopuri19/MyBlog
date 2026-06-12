import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";

import FeaturedThought from "../../components/FeaturedThought/FeaturedThought";
import LatestArticles from "../../components/LatestArticles/LatestArticles";
import Footer from "../../components/Footer/Footer";

function Home() {

  return (
    <>
      <NavBar />

      <Hero />

      <FeaturedThought />

      <LatestArticles />

      <Footer />
    </>
  );
}

export default Home;