import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';
import useReveal from './hooks/useReveal';

function App() {
  const { t } = useTranslation();
  useReveal();

  return (
    <>
      <a href="#main" className="skip-link">{t('nav.skip')}</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
