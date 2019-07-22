import React from 'react';
import ReactDOM from 'react-dom';
import AppProviders from './js/contexts/AppProviders';
import App from './js/components/App.js';
import './main.css';

ReactDOM.render(
    <AppProviders>
      <App/>
    </AppProviders>,
  document.getElementById('app')
);
