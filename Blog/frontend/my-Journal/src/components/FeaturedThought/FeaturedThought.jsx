import { useState, useEffect } from "react";
import "./FeaturedThought.css";

const ITEMS = [
  {
    type: "EQUATION",
    main: "E = mc²",
    sub: "Mass–energy equivalence",
    source: "Albert Einstein, 1905",
  },
  {
    type: "QUOTE",
    main: "The universe is under no obligation to make sense to you.",
    sub: null,
    source: "Neil deGrasse Tyson",
  },
  {
    type: "SCIENCE FACT",
    main: "There are more atoms in a glass of water than glasses of water in all of Earth's oceans.",
    sub: null,
    source: "Molecular Physics",
  },
  {
    type: "EQUATION",
    main: "eⁱᵖ + 1 = 0",
    sub: "Euler's Identity — the most beautiful equation in mathematics",
    source: "Leonhard Euler",
  },
  {
    type: "QUOTE",
    main: "We are all made of star-stuff.",
    sub: null,
    source: "Carl Sagan",
  },
  {
    type: "SCIENCE FACT",
    main: "A day on Venus is longer than a year on Venus — it rotates so slowly that it completes an orbit before finishing one spin.",
    sub: null,
    source: "Planetary Science",
  },
  {
    type: "EQUATION",
    main: "ΔxΔp ≥ ℏ/2",
    sub: "Heisenberg Uncertainty Principle",
    source: "Werner Heisenberg, 1927",
  },
  {
    type: "QUOTE",
    main: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    sub: null,
    source: "Albert Einstein",
  },
  {
    type: "SCIENCE FACT",
    main: "The human brain generates roughly 23 watts of electrical power while awake — enough to dim-light a small bulb.",
    sub: null,
    source: "Neuroscience",
  },
  {
    type: "EQUATION",
    main: "S = k · ln Ω",
    sub: "Boltzmann's entropy formula — the bridge between thermodynamics and probability",
    source: "Ludwig Boltzmann, 1877",
  },
  {
    type: "QUOTE",
    main: "Science is not only a disciple of reason but, also, one of romance and passion.",
    sub: null,
    source: "Stephen Hawking",
  },
  {
    type: "SCIENCE FACT",
    main: "There are more possible chess games than there are atoms in the observable universe.",
    sub: null,
    source: "Combinatorics",
  },
];

const TYPE_COLOR = {
  "EQUATION":     "#818cf8",
  "QUOTE":        "#34d399",
  "SCIENCE FACT": "#f59e0b",
};

export default function FeaturedThought() {
  const [idx, setIdx]       = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = (i) => {
    setVisible(false);
    setTimeout(() => { setIdx(i); setVisible(true); }, 380);
  };

  useEffect(() => {
    const t = setInterval(() => goTo((idx + 1) % ITEMS.length), 6500);
    return () => clearInterval(t);
  }, [idx]);

  const item = ITEMS[idx];

  return (
    <section className="featured-thought">
      <div className={`ft-inner ${visible ? "ft-show" : "ft-hide"}`}>
        <p className="ft-type" style={{ color: TYPE_COLOR[item.type] }}>
          {item.type}
        </p>

        <h2 className={item.type === "EQUATION" ? "ft-h2 ft-equation" : "ft-h2"}>
          {item.type === "QUOTE" ? `"${item.main}"` : item.main}
        </h2>

        {item.sub && <p className="ft-sub">{item.sub}</p>}

        <p className="ft-source">— {item.source}</p>
      </div>

      <div className="ft-dots">
        {ITEMS.map((it, i) => (
          <button
            key={i}
            className={`ft-dot ${i === idx ? "active" : ""}`}
            style={i === idx ? { background: TYPE_COLOR[item.type] } : {}}
            onClick={() => goTo(i)}
            aria-label={`Go to item ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
