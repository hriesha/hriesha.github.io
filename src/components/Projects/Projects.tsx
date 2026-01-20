import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data';
import { ProjectCard } from './ProjectCard';
import { useScrollAnimation } from '../../hooks';
import styles from './Projects.module.css';

export const Projects: React.FC = () => {
  const animation = useScrollAnimation();

  // Separate real and placeholder projects
  const realProjects = projects.filter(p => !p.isPlaceholder);
  const placeholderProjects = projects.filter(p => p.isPlaceholder);

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
            Building solutions with machine learning, data science, and software engineering
          </p>
        </div>

        <div className={styles.grid}>
          {realProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {placeholderProjects.length > 0 && (
          <>
            <h3 className={styles.sectionTitle}>Future Projects</h3>
            <div className={styles.grid}>
              {placeholderProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={realProjects.length + index}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
};
