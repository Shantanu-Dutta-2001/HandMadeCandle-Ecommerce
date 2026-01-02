import classes from '../../styles/components/Content.module.css';

const Returns = () => {
    return (
        <div className="container">
            <div className={classes.wrapper}>
                <h1 className={classes.title}>Returns & <span>Refunds</span></h1>

                <div className={classes.section}>
                    <h2>Our Guarantee</h2>
                    <p>
                        We want you to absolutely love your candles. If you are not completely satisfied with your
                        purchase, we're here to help.
                    </p>
                </div>

                <div className={classes.section}>
                    <h2>Return Policy</h2>
                    <p>
                        We accept returns of unused, unlit candles within 30 days of delivery.
                        The product must be in its original condition and packaging.
                    </p>
                    <p>
                        To initiate a return, please contact our support team with your order number.
                    </p>
                </div>

                <div className={classes.section}>
                    <h2>Damaged Items</h2>
                    <p>
                        We take great care in packaging our candles, but accidents can happen during transit.
                        If your order arrives damaged, please take a photo and email us within 48 hours of delivery.
                        We will happily replace the damaged item at no cost to you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Returns;
