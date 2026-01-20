import React from 'react';
import { motion } from 'framer-motion';
import { devNotes } from '../../data';
import { FeatureCard } from './FeatureCard';
import { useScrollAnimation } from '../../hooks';
import styles from './DevNotes.module.css';

export const DevNotes: React.FC = () => {
  const animation = useScrollAnimation();

  return (
    <motion.section
      id="devnotes"
      className={styles.devNotes}
      ref={animation.ref}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Dev Notes</h2>
          <p className={styles.subtitle}>
            A peek behind the curtain: cool technical features that power this site
          </p>
        </div>

        <div className={styles.grid}>
          {devNotes.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        <div className={styles.footer}>
          <p>Built with React, TypeScript, and lots of ☕</p>
          <p className={styles.madeWith}>
            Made with <span className={styles.heart}>♥</span> by Hriesha Popat
          </p>
        </div>
      </div>
    </motion.section>
  );
};
