import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Footer from './components/Footer/Footer';
import Preorder from './components/Preorder/Preorder';
import Login from './Login';
import AdminPage from './AdminPage';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/preorder" element={<Preorder />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/admin"
                    element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;