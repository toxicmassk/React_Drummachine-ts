import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/css/index.css';
import App from './App';
import 'rc-slider/assets/index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



