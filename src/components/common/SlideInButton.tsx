import React from 'react';
import { motion } from 'framer-motion';
import styles from './SlideInButton.module.css';

interface SlideInButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  delay?: number;
}

export const SlideInButton: React.FC<SlideInButtonProps> = ({
  children,
  onClick,
  delay = 0,
}) => {
  return (
    <motion.button
      className={styles.slideButton}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className={styles.background}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: delay + 0.2,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <span className={styles.text}>{children}</span>
      <motion.svg
        className={styles.arrow}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: delay + 0.4,
          duration: 0.5,
        }}
      >
        <path
          d="M4 10H16M16 10L11 5M16 10L11 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.button>
  );
};
