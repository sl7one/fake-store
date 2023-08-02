import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import './styles/reset.scss';
import './styles/styles.scss';
import { App } from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

