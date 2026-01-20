import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FloatingNav.module.css';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
  { id: 'devnotes', label: 'Dev Notes' },
];

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide on hero section
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < 0);
      }

      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;

          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className={styles.floatingNav}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          aria-label="Section navigation"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`${styles.navDot} ${
                activeSection === section.id ? styles.active : ''
              }`}
              aria-label={`Go to ${section.label}`}
              aria-current={activeSection === section.id ? 'true' : 'false'}
            >
              <span className={styles.dot} />
              <span className={styles.tooltip}>{section.label}</span>
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
