import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data';
import { CardStack } from './CardStack';
import { useScrollAnimation } from '../../hooks';
import styles from './Projects.module.css';

export const Projects: React.FC = () => {
  const animation = useScrollAnimation();

  // Only show real projects in card stack
  const realProjects = projects.filter(p => !p.isPlaceholder);

  return (
    <motion.section
      id="projects"
      className={styles.projects}
      ref={animation.ref}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Projects</h2>
          <p className={styles.subtitle}>
            Drag the cards to explore my work
          </p>
        </div>

        <CardStack projects={realProjects} />
      </div>
    </motion.section>
  );
};
