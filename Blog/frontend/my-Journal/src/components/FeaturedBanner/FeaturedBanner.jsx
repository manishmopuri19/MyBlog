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
        <div className="banner-avatar-frame">
          <div className="avatar-head-ring" />
          <div className="avatar-body-ring" />
        </div>
      </div>
    </section>
  );
}

export default FeaturedBanner;
