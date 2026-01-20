import React from 'react';
import { motion } from 'framer-motion';
import { TimelineEntry, formatDateRange } from '../../data';
import styles from './TimelineItem.module.css';

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ entry, index }) => {
  return (
    <motion.div
      className={styles.timelineItem}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <div className={styles.marker}>
        <div className={`${styles.markerDot} ${styles[`markerDot--${entry.type}`]}`}>
          {entry.type === 'work' ? '💼' : '🎓'}
        </div>
        {index > 0 && <div className={styles.markerLine} />}
      </div>

      <div className={styles.content}>
        <time className={styles.date}>{formatDateRange(entry.startDate, entry.endDate)}</time>

        <h3 className={styles.title}>{entry.title}</h3>

        <div className={styles.organization}>
          <span>{entry.organization}</span>
          <span className={styles.location}>{entry.location}</span>
        </div>

        <p className={styles.description}>{entry.description}</p>

        {entry.achievements && entry.achievements.length > 0 && (
          <ul className={styles.achievements}>
            {entry.achievements.map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        )}

        {entry.tags && entry.tags.length > 0 && (
          <div className={styles.tags}>
            {entry.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {entry.githubUrl && entry.githubUrl !== '#' && (
          <a
            href={entry.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label={`View ${entry.title} on GitHub`}
          >
            View on GitHub
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
};
