import "./FeaturedBanner.css";

function FeaturedBanner() {
  return (
    <section className="featured-banner">
      <div className="banner-text">
        <span className="banner-label">WELCOME TO MY SPACE</span>
        <h1>Hey guys, enjoy reading my blog &amp; confessions</h1>
        <p>
          If you find them interesting, reach out to me — I'd love to hear from you!
        </p>
        <a className="banner-btn" href="mailto:manishsreeram2@gmail.com">
          manishsreeram2@gmail.com
        </a>
      </div>

      <div className="banner-visual">
        <img
          src="/hero-image.png"
          alt="hero"
          className="banner-hero-img"
        />
      </div>
    </section>
  );
}

export default FeaturedBanner;
