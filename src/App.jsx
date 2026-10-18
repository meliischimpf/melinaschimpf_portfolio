import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './App.css';


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ThemeProvider>
          <div className="App custom-cursor-active">
            <CustomCursor />
        <Header />
        <main>
          <Hero id="home" />
          <div className="theme-content">
            <About id="about" />
            <Services id="services" />
            <Skills id="skills" />
            <Projects id="projects" />
            <Contact id="contact" />
          </div>
        </main>
            <Footer />
          </div>
        </ThemeProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}

export default App;
