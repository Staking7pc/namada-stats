import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <Router>
    <React.Fragment>
      <Routes>
        <Route path="/" element={<App/>} />
      </Routes>
    </React.Fragment>
  </Router>

);
