import { Link } from 'react-router-dom';
import classes from '../styles/components/NotFound.module.css';

const NotFound = () => {
    return (
        <div className="container">
            <div className={classes.wrapper}>
                <h1 className={classes.title}>404</h1>
                <h2 className={classes.subtitle}>Page Not Found</h2>
                <p className={classes.description}>
                    Oops! The candle you're looking for seems to have burnt out or been moved to a different shelf.
                </p>
                <Link to="/" className={classes.btnHome}>
                    Back to Collection
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
