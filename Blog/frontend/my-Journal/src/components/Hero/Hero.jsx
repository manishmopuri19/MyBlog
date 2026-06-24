import { useNavigate } from "react-router-dom";
import "./Hero.css"
import HeroScene from "../Hero/HeroScenece";

function Hero(){
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-left">
                <p className="hero-tag">
                    Personal Journal
                </p>

                <h1>
                    Thoughts, Concepts &amp; Simulations
                </h1>

                <p className="hero-decription">
                     Exploring technology,
          philosophy,
          imagined worlds
          and the weird corners
          of human thinking.
                </p>

                <button onClick={() => navigate("/reader")}>Start Exploring</button>

            </div>

            <div className="hero-right">
                <HeroScene />
            </div>

    </section>
    )
}
export default Hero;
