import classes from '../../styles/components/Content.module.css';

const Shipping = () => {
    return (
        <div className="container">
            <div className={classes.wrapper}>
                <h1 className={classes.title}>Shipping <span>Policy</span></h1>

                <div className={classes.section}>
                    <h2>Shipping Methods & Times</h2>
                    <p>
                        We hand-pour all our candles to order to ensure the freshest potential scent throw.
                        Please allow 2-3 business days for processing before your order ships.
                    </p>
                    <ul>
                        <li><strong>Standard Shipping:</strong> 3-5 business days</li>
                        <li><strong>Express Shipping:</strong> 1-2 business days</li>
                    </ul>
                </div>

                <div className={classes.section}>
                    <h2>International Shipping</h2>
                    <p>
                        Currently, we only ship within the domestic region. We are working hard to expand our
                        shipping capabilities to bring our candles to homes around the world soon.
                    </p>
                </div>

                <div className={classes.section}>
                    <h2>Tracking Your Order</h2>
                    <p>
                        Once your order ships, you will receive a confirmation email with a tracking number.
                        You can also track your order status directly from your account dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
