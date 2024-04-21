import React from 'react';
import './Navbar.css';
import Logo from './Images/mk1-logo.webp';
import { Link } from 'react-router-dom';

const Navbar = () => {
return (
    <nav className="navbar-container d-flex align-items-center">
        <div className="container-fluid">
            <Link className="navbar-brand" href="#">
                <img className="mk-logo" src={Logo} />
            </Link>
    </div>

</nav>

);
};

export default Navbar;