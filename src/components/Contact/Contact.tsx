import React from 'react';
import { motion } from 'framer-motion';
import { contactInfo } from '../../data';
import { useScrollAnimation } from '../../hooks';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  const animation = useScrollAnimation();

  return (
    <motion.section
      id="contact"
      className={styles.contact}
      ref={animation.ref}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Let's Connect</h2>
          <p className={styles.subtitle}>
            Feel free to reach out for opportunities, collaborations, or just to say hi!
          </p>
        </div>

        <div className={styles.contactGrid}>
          <a
            href={`mailto:${contactInfo.email}`}
            className={styles.contactCard}
            aria-label="Send email"
          >
            <div className={styles.icon}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Email</h3>
            <p className={styles.cardValue}>{contactInfo.email}</p>
          </a>

          <a
            href={`tel:${contactInfo.phone}`}
            className={styles.contactCard}
            aria-label="Call phone number"
          >
            <div className={styles.icon}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Phone</h3>
            <p className={styles.cardValue}>{contactInfo.phone}</p>
          </a>

          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
            aria-label="Visit LinkedIn profile"
          >
            <div className={styles.icon}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>LinkedIn</h3>
            <p className={styles.cardValue}>Connect on LinkedIn</p>
          </a>

          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
            aria-label="Visit GitHub profile"
          >
            <div className={styles.icon}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>GitHub</h3>
            <p className={styles.cardValue}>View my code</p>
          </a>
        </div>
      </div>
    </motion.section>
  );
};
