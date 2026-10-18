import { Analytics } from '@vercel/analytics/react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Notes from './components/Notes';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotePage from './components/NotePage';
import useReveal from './hooks/useReveal';
import useDocumentMeta from './hooks/useDocumentMeta';

const Home = () => {
  const { t } = useTranslation();
  useDocumentMeta({ title: t('meta.title'), description: t('meta.description') });

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Notes />
      <Services />
      <Contact />
    </>
  );
};

// Ruteo mínimo: la home y una página por nota (/notas/<slug>)
const noteSlug = window.location.pathname.match(/^\/notas\/([\w-]+)\/?$/)?.[1];

function App() {
  const { t } = useTranslation();
  useReveal();

  return (
    <>
      <a href="#main" className="skip-link">{t('nav.skip')}</a>
      <Header />
      <main id="main">{noteSlug ? <NotePage slug={noteSlug} /> : <Home />}</main>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
