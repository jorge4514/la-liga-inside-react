// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navigationBar.css';

const NavigationBar = () => {
  return (
    <nav className="navbar1">
      <ul className="nav-links">
        <div className="logo">
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/app/images/logo.png`} alt="LaLigaInside" />
          </Link>
        </div>
        <li className='nav-link'><Link to="/">Inicio</Link></li>
        <li className='nav-link'><Link to="/equipos">Equipos</Link></li>
        <li className='nav-link'><Link to="/jugadores">Jugadores</Link></li>
        <li className='nav-link'><Link to="/mercado">Mercado</Link></li>
        <li className='nav-link'><Link to="/comparador">Comparador de Jugadores</Link></li>
        <li className='nav-link'><Link to="/rentables">Más Rentables</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;

