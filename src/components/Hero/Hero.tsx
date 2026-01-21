import React, { useState } from 'react';
import { TypewriterText, SlideInButton } from '../common';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  const handleTypewriterComplete = () => {
    setShowButton(true);
  };

  const handleExploreClick = () => {
    const timelineSection = document.getElementById('timeline');
    timelineSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <TypewriterText
            text="Hi, I'm Hriesha Popat."
            speed={80}
            onComplete={handleTypewriterComplete}
          />
        </h1>

        {showButton && (
          <div className={styles.buttonContainer}>
            <SlideInButton onClick={handleExploreClick} delay={0.3}>
              here's more
            </SlideInButton>
          </div>
        )}
      </div>
    </section>
  );
};
