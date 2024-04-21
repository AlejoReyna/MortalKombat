import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Footer from './components/Footer/Footer';
import Preorder from './components/Preorder/Preorder';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/preorder" element={<Preorder />} /> 
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
