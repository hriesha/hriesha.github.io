import React from 'react';
import { InteractiveCube } from './InteractiveCube';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hriesha Popat</h1>
        <p className={styles.subtitle}>
          Data Scientist | Quantitative Researcher | Software Engineer
        </p>
        <p className={styles.description}>
          Building intelligent systems at the intersection of machine learning, finance, and software engineering.
        </p>
      </div>

      <InteractiveCube size={300} />

      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
};
