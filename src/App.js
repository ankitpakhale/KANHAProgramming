import React, { useEffect } from 'react';
import QuestionsForm from './components/QuestionsForm';

function App() {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadCSS = (href) => {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.href = href;
        link.rel = 'stylesheet';
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
    };

    const cssFiles = [
      'all.min.css',
      'animate.min.css',
      'bootstrap.min.css',
      'fontawesome.min.css',
      // "jquery.modal.min.css", // commenting out jquery.modal.min.css for model compatibility css
      'main.css',
      'meanmenu.css',
      'odometer.min.css',
      'swipper.css',
    ];

    const jsFiles = [
      'jquery.min.js',
      'bootstrap.bundle.min.js',
      'swipper-bundle.min.js',
      'jquery.meanmenu.min.js',
      'wow.min.js',
      'odometer.min.js',
      'jquery.modal.min.js',
      'appear.min.js',
      'main.js',
    ];

    const loadCSSAndJSFiles = async () => {
      try {
        for (const css of cssFiles) {
          await loadCSS(`assets/css/${css}`);
        }
        for (const js of jsFiles) {
          await loadScript(`assets/js/${js}`);
        }
      } catch (error) {
        console.error('Error loading assets:', error);
      }
    };

    loadCSSAndJSFiles();

    // Clean up on unmount
    return () => {
      cssFiles.forEach((css) => {
        const link = document.querySelector(
          `link[href="./src/assets/css/${css}"]`
        ); // Corrected path
        link && link.parentNode.removeChild(link);
      });
      jsFiles.forEach((js) => {
        const script = document.querySelector(
          `script[src="./src/assets/js/${js}"]`
        ); // Corrected path
        script && script.parentNode.removeChild(script);
      });
    };
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h1 className="heading">Welcome to KANHA</h1>
      <QuestionsForm />
    </div>
  );
}

export default App;
