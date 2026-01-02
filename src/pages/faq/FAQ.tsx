import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import classes from '../../styles/components/FAQ.module.css';

const FAQ_ITEMS = [
    {
        question: "Do you ship internationally?",
        answer: "Currently we only ship within the domestic region. We are working on international shipping soon!"
    },
    {
        question: "Are your candles eco-friendly?",
        answer: "Yes! We use 100% natural soy wax and lead-free cotton wicks. Our fragrances are phthalate-free."
    },
    {
        question: "How long do the candles burn?",
        answer: "Our standard 8oz candles burn for approximately 40-50 hours with proper care."
    },
    {
        question: "Do you offer wholesale?",
        answer: "Yes, please contact us via the contact form for wholesale inquiries."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="container">
            <div className={classes.wrapper}>
                <h1 className={classes.title}>Frequently Asked <span>Questions</span></h1>

                <div className={classes.faqList}>
                    {FAQ_ITEMS.map((item, index) => (
                        <div key={index} className={classes.faqItem}>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className={classes.questionBtn}
                            >
                                {item.question}
                                {openIndex === index ?
                                    <Minus size={20} className={classes.icon} /> :
                                    <Plus size={20} className={classes.icon} />
                                }
                            </button>

                            {openIndex === index && (
                                <div className={classes.answer}>
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
