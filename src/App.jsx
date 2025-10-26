import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// Lazy load the 21st.dev Toolbar components only in development
let TwentyFirstToolbar = () => null;
let ReactPlugin = null;

if (import.meta.env.DEV) {
  try {
    // Dynamically import the toolbar components
    const toolbarModule = require('@21st-extension/toolbar-react');
    const reactModule = require('@21st-extension/react');
    
    TwentyFirstToolbar = toolbarModule.default || toolbarModule;
    ReactPlugin = reactModule.ReactPlugin;
  } catch (error) {
    console.warn('21st.dev Toolbar could not be loaded:', error);
  }
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        {import.meta.env.DEV && ReactPlugin && (
          <Suspense fallback={null}>
            <TwentyFirstToolbar 
              config={{
                plugins: [new ReactPlugin()]
              }} 
            />
          </Suspense>
        )}
        <Header />
        <main>
          <Hero id="home" />
          <div className="theme-content">
            <About id="about" />
            <Skills id="skills" />
            <Projects id="projects" />
            <Contact id="contact" />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
