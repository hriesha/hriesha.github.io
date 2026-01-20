import React from 'react';
import { motion } from 'framer-motion';
import { timelineEntries } from '../../data';
import { TimelineItem } from './TimelineItem';
import { useScrollAnimation } from '../../hooks';
import styles from './Timeline.module.css';

export const Timeline: React.FC = () => {
  const animation = useScrollAnimation();

  return (
    <motion.section
      id="timeline"
      className={styles.timeline}
      ref={animation.ref}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Experience & Research</h2>
          <p className={styles.subtitle}>
            From quantitative finance to full-stack development and teaching
          </p>
        </div>

        <div className={styles.timelineContainer}>
          {timelineEntries.map((entry, index) => (
            <TimelineItem key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
