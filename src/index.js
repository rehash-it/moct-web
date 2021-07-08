import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import TimeAgo from 'javascript-time-ago'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

