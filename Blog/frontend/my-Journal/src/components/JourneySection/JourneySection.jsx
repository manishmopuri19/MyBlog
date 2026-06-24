import { useNavigate } from "react-router-dom";
import "./JourneySection.css";

function JourneySection() {
  const navigate = useNavigate();

  return (
    <section className="journey-section">
      <p className="journey-label">CHOOSE YOUR JOURNEY</p>
      <h2 className="journey-heading">Where do you want to go?</h2>

      <div className="journey-cards">
        {/* Personal Journal card */}
        <div className="journey-card journey-card--journal" onClick={() => navigate("/reader")}>
          <div className="journey-card-visual">
            <div className="jc-orb" />
            <div className="jc-ring jc-ring-1" />
            <div className="jc-ring jc-ring-2" />
          </div>
          <div className="journey-card-body">
            <span className="journey-tag">Personal Journal</span>
            <h3>Thoughts, Concepts &amp; Simulations</h3>
            <p>
              Technology, philosophy, imagined worlds and the weird corners of
              human thinking.
            </p>
            <span className="journey-cta">Start Reading →</span>
          </div>
        </div>

        {/* Confessions card */}
        <div className="journey-card journey-card--confession" onClick={() => navigate("/reader#confessions")}>
          <div className="journey-card-visual">
            <div className="jc-confession-glow" />
            <div className="jc-petal jc-petal-1" />
            <div className="jc-petal jc-petal-2" />
            <div className="jc-petal jc-petal-3" />
          </div>
          <div className="journey-card-body">
            <span className="journey-tag journey-tag--confession">Confessions</span>
            <h3>Raw. Honest. Unfiltered.</h3>
            <p>
              Dark thoughts, late-night feelings, and things I was never supposed
              to say out loud.
            </p>
            <span className="journey-cta journey-cta--confession">Enter →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneySection;
