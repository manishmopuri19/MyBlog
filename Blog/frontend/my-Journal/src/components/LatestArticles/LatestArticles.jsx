import { useState, useEffect } from "react";
import "./LatestArticles.css";

const QUOTES = [
  { text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.", source: "Albert Einstein" },
  { text: "We are all made of star-stuff.", source: "Carl Sagan" },
  { text: "Science is the poetry of reality.", source: "Richard Dawkins" },
  { text: "The universe is not required to be in perfect harmony with human ambition.", source: "Carl Sagan" },
  { text: "Somewhere, something incredible is waiting to be known.", source: "Sharon Begley" },
  { text: "Look up at the stars and not down at your feet.", source: "Stephen Hawking" },
];

const EQUATIONS = [
  { eq: "E = mc²", name: "Mass–Energy Equivalence", desc: "A tiny mass hides enormous energy. The foundation of nuclear physics.", author: "Einstein, 1905" },
  { eq: "eⁱᵖ + 1 = 0", name: "Euler's Identity", desc: "Links five fundamental constants in one line. Called the most beautiful equation.", author: "Euler" },
  { eq: "F = ma", name: "Newton's Second Law", desc: "Force equals mass times acceleration — the engine of classical mechanics.", author: "Newton, 1687" },
  { eq: "ΔxΔp ≥ ℏ/2", name: "Uncertainty Principle", desc: "You cannot know both position and momentum of a particle precisely at the same time.", author: "Heisenberg, 1927" },
  { eq: "S = k ln Ω", name: "Boltzmann Entropy", desc: "Entropy is the logarithm of the number of ways a system can be arranged.", author: "Boltzmann, 1877" },
  { eq: "∇ · E = ρ/ε₀", name: "Gauss's Law", desc: "Electric field lines diverge from charges — the root of all electrostatics.", author: "Maxwell / Gauss" },
];

const FACTS = [
  { fact: "There are more atoms in a glass of water than glasses of water in all of Earth's oceans.", tag: "Atomic Scale" },
  { fact: "A day on Venus lasts longer than a year on Venus — it rotates so slowly it completes an orbit first.", tag: "Planetary Science" },
  { fact: "The human brain generates ~23 watts of electrical power while awake — enough to dim-light a small bulb.", tag: "Neuroscience" },
  { fact: "There are more possible chess games than atoms in the observable universe.", tag: "Combinatorics" },
  { fact: "Honey never spoils — archaeologists found 3,000-year-old honey in Egyptian tombs that was still edible.", tag: "Chemistry" },
  { fact: "Light from the Sun takes exactly 8 minutes and 20 seconds to reach Earth.", tag: "Astrophysics" },
];

function RotatingCard({ title, accentColor, items, renderItem, interval }) {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % items.length);
        setVisible(true);
      }, 320);
    }, interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  return (
    <div className="la-card" style={{ "--accent": accentColor }}>
      <div className="la-card-header">
        <span className="la-card-label" style={{ color: accentColor }}>{title}</span>
        <span className="la-card-counter">{idx + 1} / {items.length}</span>
      </div>
      <div className={`la-card-body ${visible ? "la-show" : "la-hide"}`}>
        {renderItem(items[idx])}
      </div>
      <div className="la-card-bar">
        <div
          className="la-card-bar-fill"
          style={{ background: accentColor, animationDuration: `${interval}ms` }}
          key={idx}
        />
      </div>
    </div>
  );
}

export default function LatestArticles() {
  return (
    <section className="latest-section">
      <p className="latest-label">DISCOVER</p>
      <h2>Quotes · Equations · Facts</h2>

      <div className="latest-grid">

        <RotatingCard
          title="QUOTE"
          accentColor="#34d399"
          items={QUOTES}
          interval={6000}
          renderItem={(item) => (
            <>
              <p className="la-quote-text">"{item.text}"</p>
              <p className="la-source">— {item.source}</p>
            </>
          )}
        />

        <RotatingCard
          title="EQUATION"
          accentColor="#818cf8"
          items={EQUATIONS}
          interval={7500}
          renderItem={(item) => (
            <>
              <p className="la-eq-math">{item.eq}</p>
              <p className="la-eq-name">{item.name}</p>
              <p className="la-eq-desc">{item.desc}</p>
              <p className="la-source">— {item.author}</p>
            </>
          )}
        />

        <RotatingCard
          title="SCIENCE FACT"
          accentColor="#f59e0b"
          items={FACTS}
          interval={5500}
          renderItem={(item) => (
            <>
              <span className="la-fact-tag">{item.tag}</span>
              <p className="la-fact-text">{item.fact}</p>
            </>
          )}
        />

      </div>
    </section>
  );
}
