import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { Project } from '../../data';
import styles from './CardStack.module.css';

interface CardStackProps {
  projects: Project[];
}

export const CardStack: React.FC<CardStackProps> = ({ projects }) => {
  const [cards, setCards] = useState(projects);

  const moveToBack = (index: number) => {
    const newCards = [...cards];
    const [removed] = newCards.splice(index, 1);
    newCards.push(removed);
    setCards(newCards);
  };

  return (
    <div className={styles.stackContainer}>
      {cards.map((project, index) => (
        <Card
          key={project.id}
          project={project}
          index={index}
          totalCards={cards.length}
          onDragEnd={() => {
            if (index === 0) {
              moveToBack(0);
            }
          }}
        />
      ))}
    </div>
  );
};

interface CardProps {
  project: Project;
  index: number;
  totalCards: number;
  onDragEnd: () => void;
}

const Card: React.FC<CardProps> = ({ project, index, totalCards, onDragEnd }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (index === 0 && (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100)) {
      onDragEnd();
    }
  };

  // Calculate card positioning
  const scale = 1 - index * 0.05;
  const yOffset = index * 15;
  const zIndex = totalCards - index;

  return (
    <motion.div
      className={styles.card}
      style={{
        x,
        rotate,
        opacity,
        scale,
        zIndex,
        y: yOffset,
      }}
      drag={index === 0}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={{
        scale,
        y: yOffset,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}
        </div>

        <div className={styles.imageContainer}>
          {/* Placeholder for project image - user will provide images */}
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}>Add Image</span>
          </div>
        </div>

        {index === 0 && (
          <div className={styles.dragHint}>
            Drag to flip
          </div>
        )}
      </div>
    </motion.div>
  );
};
