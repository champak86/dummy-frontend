import React from "react";
import './App.css';
import Routes from './routes';
import {
  BrowserRouter as Router
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes />
    </Router>
  );
}

export default App;
