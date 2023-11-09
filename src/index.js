import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import RpcStatus from "./components/RpcStatus";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <Router>
    <React.Fragment>
      <Routes>
        <Route path="/" element={<RpcStatus/>} />
      </Routes>
    </React.Fragment>
  </Router>

);
