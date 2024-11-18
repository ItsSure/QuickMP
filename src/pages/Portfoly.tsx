import { useState } from 'react';
import KeyboardManager from '../components/KeyboardManager';
import About from '../components/sections/About';
import Education from '../components/sections/Education';
import Experience from '../components/sections/Experience';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Cv from '../../cv.json';
import { ICv } from '../interfaces/Cv';

export const Portfoly = () => {
  const [cv] = useState<ICv>(Cv);

  //const { isAuthenticated, rol, logoutf } = useContext(AuthContext);
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <main className="mx-auto w-full max-[700px]:p-8">
      <Hero basics={cv.basics} />
      <About summary={cv.basics.summary} />
      <Experience work={cv.work} />
      <Education education={cv.education} />
      <Projects projects={cv.projects} />
      <Skills skills={cv.skills} />
      <KeyboardManager profiles={cv.basics.profiles} />
    </main>
  );
};
