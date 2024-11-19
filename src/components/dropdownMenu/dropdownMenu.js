import React from 'react';
import '../css/dropdownMenu.css';

function DropdownMenu({ isOpen, onClose }) {
    return (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={onClose}>✕</button>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/repartidores">Repartidores</a></li>
                <li><a href="/cobertura">Cobertura de Entrega</a></li>
            </ul>
        </div>
    );
}

export default DropdownMenu;
