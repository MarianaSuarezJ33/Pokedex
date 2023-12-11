import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Utilizando ReactDOM.createRoot para renderizar la aplicación en el contenedor con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // Usar React.StrictMode para realizar verificaciones y advertencias adicionales en desarrollo
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);