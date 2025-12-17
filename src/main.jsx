import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App.jsx';
import './index.css';

// Calculate and reserve scrollbar width to prevent layout jumps
const calculateScrollbarWidth = () => {
  // Create a temporary div to measure scrollbar width
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
};

// Set scrollbar width as CSS variable and apply padding
const scrollbarWidth = calculateScrollbarWidth();
document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
document.body.style.paddingRight = `${scrollbarWidth}px`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
