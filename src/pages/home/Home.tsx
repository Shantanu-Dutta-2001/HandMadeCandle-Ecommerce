import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { productService } from '../../services/product.service';
import { reviewService, type Review } from '../../services/review.service';
import { messageService } from '../../services/message.service';
import type { Product } from '../../services/mockData';
import classes from '../../styles/components/Home.module.css';
import Skeleton from '../../components/ui/Skeleton';

const Home = () => {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await messageService.sendMessage({
                name: formData.name,
                email: formData.email,
                subject: formData.subject || 'Home Page Contact',
                body: formData.message
            });
            toast.success("Message sent successfully!");
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error("Failed to send message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [products, fetchedReviews] = await Promise.all([
                    productService.getAllProducts(),
                    reviewService.getReviews()
                ]);

                setFeaturedProducts(products.slice(0, 3));
                setReviews(fetchedReviews);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
                setReviewsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={classes.homeWrapper}>
            {/* Hero Section */}
            <section className={classes.hero}>
                <div className={classes.heroOverlay}>
                    <div className="container">
                        <div className={classes.heroContent}>
                            <h1>Light up moments,<br /><span>together</span></h1>
                            <p>Handcrafted with love in our home. Each candle tells a story of warmth, comfort, and the beautiful moments we share.</p>
                            <div className={classes.heroButtons}>
                                <button className={`btn ${classes.btnGold}`} onClick={() => navigate('/shop')}>Shop Our Candles</button>
                                <button className={`btn ${classes.btnWhite}`} onClick={() => navigate('/about')}>Our Story</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className={classes.intro}>
                <div className="container">
                    <div className={classes.introContent}>
                        <h2>Made with Love, <span>Shared with Heart</span></h2>
                        <p>In our cozy home kitchen, magic happens every day. What started as a simple desire to fill our space with beautiful, natural light has blossomed into something much more meaningful.</p>
                        <p>Each candle is carefully hand-poured with premium soy wax and thoughtfully selected fragrances that evoke memories of togetherness. From intimate dinner conversations to quiet reading moments, our candles create the perfect backdrop for life's most precious experiences.</p>
                        <p className={classes.highlightText}>Because every moment deserves to be illuminated with love.</p>
                        <div className={classes.separator}>x</div>
                    </div>
                </div>
            </section>

            {/* Signature Collection */}
            <section className={classes.collection}>
                <div className="container">
                    <header className={classes.sectionHeader}>
                        <h2>Our <span>Signature Collection</span></h2>
                        <p>Each candle is carefully crafted to create the perfect ambiance for your special moments</p>
                    </header>

                    <div className={classes.productGrid}>
                        {loading ? (
                            // Skeleton Loader for Products
                            [1, 2, 3].map((i) => (
                                <div key={i} className={classes.productCard}>
                                    <Skeleton height="300px" borderRadius="12px" />
                                    <div style={{ padding: '1rem' }}>
                                        <Skeleton height="24px" width="80%" borderRadius="4px" />
                                        <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <Skeleton height="20px" width="40px" borderRadius="4px" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : featuredProducts.length > 0 ? (
                            featuredProducts.map(product => (
                                <div key={product.id} className={classes.productCard} onClick={() => navigate(`/shop/${product.id}`)}>
                                    <div className={classes.imageContainer}>
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className={classes.productInfo}>
                                        <h3>{product.name}</h3>
                                        {/* <p className={classes.scentNote}>Warm vanilla & sweet cream</p> */}
                                        <div className={classes.priceRow}>
                                            <span className={classes.price}>${product.price.toFixed(0)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', width: '100%' }}>No products found.</p>
                        )}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button className={`btn ${classes.btnGold}`} onClick={() => navigate('/shop')}>View All Candles</button>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className={classes.reviews}>
                <div className="container">
                    <header className={classes.sectionHeader}>
                        <h2><span>Love</span> in Every Review</h2>
                        <p>What our candle lovers are saying</p>
                    </header>

                    <div className={classes.reviewGrid}>
                        {reviewsLoading ? (
                            // Skeleton Loader for Reviews
                            [1, 2, 3].map((i) => (
                                <div key={i} className={classes.reviewCard}>
                                    <div className={classes.stars}>
                                        <Skeleton height="16px" width="100px" borderRadius="4px" />
                                    </div>
                                    <div style={{ margin: '1rem 0' }}>
                                        <Skeleton height="16px" width="100%" borderRadius="4px" />
                                        <Skeleton height="16px" width="80%" borderRadius="4px" style={{ marginTop: '0.5rem' }} />
                                    </div>
                                    <Skeleton height="14px" width="60px" borderRadius="4px" />
                                </div>
                            ))
                        ) : reviews.map((review) => (
                            <div key={review.id} className={classes.reviewCard}>
                                <div className={classes.stars}>
                                    {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="#D4A017" stroke="none" />)}
                                </div>
                                <p>"{review.content}"</p>
                                <span>{review.userName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={classes.bottomSection}>
                <div className="container">
                    <header className={classes.sectionHeader}>
                        <h2>Let's Create Something <span>Beautiful</span></h2>
                        <p>Custom orders, bulk purchases, or just to say hello</p>
                    </header>

                    <div className={classes.contactGrid}>
                        {/* Contact Form */}
                        <div className={classes.contactFormCard} style={{ margin: '0 auto', maxWidth: '600px' }}>
                            <h3>Send us a message</h3>
                            <form onSubmit={handleFormSubmit}>
                                <div className={classes.formRow}>
                                    <div style={{ width: '100%' }}>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name *"
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            style={errors.name ? { borderColor: 'red' } : {}}
                                        />
                                        {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</span>}
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email *"
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            style={errors.email ? { borderColor: 'red' } : {}}
                                        />
                                        {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    className={classes.fullWidth}
                                    value={formData.subject}
                                    onChange={handleFormChange}
                                />
                                <div style={{ width: '100%' }}>
                                    <textarea
                                        name="message"
                                        placeholder="Message *"
                                        rows={4}
                                        className={classes.fullWidth}
                                        value={formData.message}
                                        onChange={handleFormChange}
                                        style={errors.message ? { borderColor: 'red' } : {}}
                                    ></textarea>
                                    {errors.message && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.message}</span>}
                                </div>
                                <button className={`btn ${classes.btnGold} ${classes.fullWidth}`} disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
