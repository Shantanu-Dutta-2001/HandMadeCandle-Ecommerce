import classes from '../../styles/components/Content.module.css';

const About = () => {
    return (
        <div className="container">
            <div className={classes.wrapper}>
                <h1 className={classes.title}>Our <span>Story</span></h1>

                <img
                    src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=1000&auto=format&fit=crop"
                    alt="Candle making process"
                    className={classes.heroImage}
                />

                <div className={classes.section}>
                    <h2>Began in a small Kitchen</h2>
                    <p>
                        Our journey began with a simple love for scents and the way they transform a space.
                        What started as a weekend hobby in our small kitchen has blossomed into a passion for
                        crafting the finest, cleanest burning candles for your home.
                    </p>
                    <p>
                        We believe that a candle is more than just a source of light—it's a mood, a memory,
                        and a moment of peace in a busy world.
                    </p>
                </div>

                <div className={classes.section}>
                    <h2>Craftsmanship & Quality</h2>
                    <p>
                        Every single candle is hand-poured in small batches to ensure quality and consistency.
                        We use only 100% natural soy wax, lead-free cotton wicks, and premium phthalate-free
                        fragrance oils.
                    </p>
                    <p>
                        Our commitment to sustainability means our packaging is recyclable and our ingredients
                        are ethically sourced. We pour our hearts into every jar, so you can fill your home
                        with love.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
