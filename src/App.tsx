import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { DevNotes } from './components/DevNotes';
import { FloatingNav } from './components/Navigation';
import { DarkModeToggle, ScrollProgress } from './components/common';

function App() {
  return (
    <>
      <ScrollProgress />
      <DarkModeToggle />
      <FloatingNav />

      <Hero />
      <Timeline />
      <Projects />
      <Contact />
      <DevNotes />
    </>
  );
}

export default App;
