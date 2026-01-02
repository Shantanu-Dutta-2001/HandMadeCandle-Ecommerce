import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { messageService } from '../../services/message.service';
import classes from '../../styles/components/Contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await messageService.sendMessage({
                name: formData.name,
                email: formData.email,
                subject: 'Contact Form Message',
                body: formData.message
            });
            toast.success("Message sent successfully!");
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="container">
            <div className={classes.wrapper}>
                <div className={classes.info}>
                    <h1>Get in <span>Touch</span></h1>
                    <p>Have questions about our candles? We'd love to hear from you.</p>

                    <div className={classes.detailItem}>
                        <h3>Email</h3>
                        <p>hello@candlecustom.com</p>
                    </div>
                    <div className={classes.detailItem}>
                        <h3>Address</h3>
                        <p>123 Wax Way, Candle City, CC 12345</p>
                    </div>
                </div>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.formGroup}>
                        <label>Name <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={errors.name ? { borderColor: 'red' } : {}}
                        />
                        {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</span>}
                    </div>
                    <div className={classes.formGroup}>
                        <label>Email <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={errors.email ? { borderColor: 'red' } : {}}
                        />
                        {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}
                    </div>
                    <div className={classes.formGroup}>
                        <label>Message <span style={{ color: 'red' }}>*</span></label>
                        <textarea
                            name="message"
                            placeholder="How can we help?"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            style={errors.message ? { borderColor: 'red' } : {}}
                        ></textarea>
                        {errors.message && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.message}</span>}
                    </div>
                    <button className={classes.submitBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
