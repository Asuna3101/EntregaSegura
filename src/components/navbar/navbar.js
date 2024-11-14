// NavBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from '../dropdownMenu/dropdownMenu';
import '../css/navbar.css';

function NavBar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleInicioClick = () => {
        navigate('/');  // Navega a la página de búsqueda
    };

    const handleSearchClick = () => {
        navigate('/search');  // Navega a la página de búsqueda
    };

    const handleProfileClick = () => {
        navigate('/login');  // Navega a la página del perfil
    };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                {/* Icono de menú desplegable */}
                <button className="menu-icon" onClick={toggleMenu}>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                </button>
            </div>

            {/* Título */}
            <div className="title-button" onClick={handleInicioClick}>
                <h1>Entrega Segura </h1>
                <p className="subtitle"> </p>
                <p className="subtitle">Tu pedido en buenas manos</p>
            </div>

            <div className="navbar-right">
                {/* Icono de búsqueda */}
                <button className="icon-button" onClick={handleSearchClick}>
                    🔍
                </button>

                {/* Icono de perfil */}
                <button className="icon-button" onClick={handleProfileClick}>
                    👤
                </button>
            </div>

            {/* Menú Desplegable */}
            <DropdownMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        </div>
    );
}

export default NavBar;
