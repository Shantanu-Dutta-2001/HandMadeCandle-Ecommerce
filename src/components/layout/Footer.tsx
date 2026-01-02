import classes from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={`container ${classes.container}`}>
                <div className={classes.column}>
                    <h3>CANDLE.</h3>
                    <p>Handcrafted scents for your home.</p>
                </div>
                <div className={classes.column}>
                    <h4>Links</h4>
                    <a href="/shop">Shop</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className={classes.column}>
                    <h4>Support</h4>
                    <a href="/faq">FAQ</a>
                    <a href="/shipping">Shipping Policy</a>
                    <a href="/returns">Returns & Refunds</a>
                </div>
            </div>
            <div className={`container ${classes.copyright}`}>
                © 2025 Candle Custom. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
