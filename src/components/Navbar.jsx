import React from 'react';
import './styles/Navbar.css';
import Logo from './images/mk-logo.jpeg';
const Navbar = () => {
return (
    <nav className="navbar bg-black">
    <div className="container-fluid d-flex justify-content-center align-items-center">
    <ul className="nav-items d-flex justify-content-center align-items-center">
            <li className="nav-item"> Inicio </li>
            <li className="nav-item">  Acerca de </li>
            <li> <img className="logo" src={ Logo } alt="The Mortal Kombat 1 logo"/> </li>
            <li className="nav-item">  RESERVA YA </li>
            <li className="nav-item">  Registro  </li>
    </ul>
    </div>

</nav>

);
};

export default Navbar;