import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Base styles first, so component stylesheets can override the utilities.
import './styles/global.css';
import App from './App.jsx';
import { track } from './lib/loadTracker';

// The loader waits for the display faces, so the first frame of the hero is
// never set in a fallback font.
if (document.fonts?.load) {
  track(
    Promise.all([
      document.fonts.load('400 1em "Bodoni Moda"'),
      document.fonts.load('italic 400 1em "Bodoni Moda"'),
      document.fonts.load('400 1em "Inter Tight"'),
    ])
  );
}

// Browsers restore scroll position on reload, which would land the visitor
// halfway through a pinned section behind the loader.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
