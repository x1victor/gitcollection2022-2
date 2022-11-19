import React from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import {DashBoard} from './pages/DashBoard'
import {Repo} from './pages/Repo'
import {About} from './pages/About'
import { Header } from './pages/Header/index';
import {GlobalStyle} from './styles/global'

function App() {
  return (
    <Router> {/* Simple Page Application  */}
      <Header/>
      <Routes>
        <Route path="/" element={<DashBoard/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/repositories/:repository" element={<Repo/>} /> 
        <Route path="/about" element={<About/>} />  
      </Routes>
      <GlobalStyle/>
    </Router>

  );
}

export default App;
