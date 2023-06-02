import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Components/Layout';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
