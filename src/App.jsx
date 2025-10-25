import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero id="home" />
        <About id="about" />
        <Skills id="skills" />
        <Projects id="projects" />
        <Contact id="contact" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
