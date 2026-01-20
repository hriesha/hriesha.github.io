import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DevNote } from '../../data';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  feature: DevNote;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className={styles.icon}>{feature.icon}</div>

      <h3 className={styles.title}>{feature.title}</h3>
      <p className={styles.description}>{feature.description}</p>

      <div className={styles.techStack}>
        {feature.techStack.map((tech) => (
          <span key={tech} className={styles.techTag}>
            {tech}
          </span>
        ))}
      </div>

      {feature.codeSnippet && (
        <>
          <button
            className={styles.expandButton}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Hide code snippet' : 'Show code snippet'}
          >
            {isExpanded ? 'Hide Code' : 'View Code'}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.pre
                className={styles.codeSnippet}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <code>{feature.codeSnippet}</code>
              </motion.pre>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};
