import React from 'react';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { DevNotes } from './components/DevNotes';
import { FloatingNav } from './components/Navigation';
import { DarkModeToggle } from './components/common';

function App() {
  return (
    <>
      <DarkModeToggle />
      <FloatingNav />

      <Hero />
      <Projects />
      <Timeline />
      <Contact />
      <DevNotes />
    </>
  );
}

export default App;
