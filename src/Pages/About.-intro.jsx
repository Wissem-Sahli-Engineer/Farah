import styles from './About-hero.module.css';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';


export default function AboutHero() {
    const phrase = "I help brands express their identity with clarity and elegance. Together, we create work that stands out—modern, confident, and always pushing the standard forward.";
    const description = useRef(null);
    const isInView = useInView(description);

    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                    {
                        phrase.split(" ").map((word, index) => {
                            return (
                                <span key={index} className={styles.mask}>
                                    <motion.span 
                                        variants={slideUp} 
                                        custom={index} 
                                        animate={isInView ? "open" : "closed"} 
                                        key={index}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            );
                        })
                    }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
                    My passion for style, presence, and visual storytelling places me in a unique position in the modeling world. I focus on bringing emotion, character, and intention into every frame.
                </motion.p>
            </div>
        </div>
    );
}

export const slideUp = {
    initial: {
        y: "100%"
    },
    open: (i) => ({
        y: "0%",
        transition: { duration: 0.5, delay: 0.01 * i }
    }),
    closed: {
        y: "100%",
        transition: { duration: 0.5 }
    }
}

export const opacity = {
    initial: {
        opacity: 0
    },
    open: {
        opacity: 1,
        transition: { duration: 0.5 }
    },
    closed: {
        opacity: 0,
        transition: { duration: 0.5 }
    }
}