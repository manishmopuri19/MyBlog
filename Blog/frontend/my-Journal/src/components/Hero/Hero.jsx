import "./Hero.css"
import HeroScene from "../Hero/HeroScenece";

function Hero(){
    


    return (

        <section className="hero">
            <div className="hero-left">
                <p className="her-tag">
                    Personal Journal
                </p>

                <h1>
                    Thoughts, Concepts & Simulations 
                </h1>

                <p className="hero-decription">
                     Exploring technology,
          philosophy,
          imagined worlds
          and the weird corners
          of human thinking.
                </p>

                <button> start Exploring</button>

                </div>

                <div className="hero-right">
                    <HeroScene />
                </div>
        
    </section>
    )
}
export default Hero;