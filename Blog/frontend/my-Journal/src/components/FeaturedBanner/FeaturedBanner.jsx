import "./FeaturedBanner.css";

function FeaturedBanner() {
  return (
    <section className="featured-banner">
      <div className="banner-text">
        <span className="banner-label">FEATURED ARTICLE</span>
        <h1>The Future Is A Hallucination</h1>
        <p>
          Exploring how humans simulate reality and why perception might be the
          greatest illusion ever created.
        </p>
        <button className="banner-btn">Read Article</button>
      </div>

      <div className="banner-visual">
        <div className="banner-glow" />
        <div className="banner-orb" />
        <div className="banner-ring banner-ring-1" />
        <div className="banner-ring banner-ring-2" />
        <div className="banner-ring banner-ring-3" />
      </div>
    </section>
  );
}

export default FeaturedBanner;
