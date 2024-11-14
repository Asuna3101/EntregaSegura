// DropdownMenu.js
import React, { useState } from 'react';
import '../css/dropdownMenu.css';

function DropdownMenu({ isOpen, onClose }) {
    const [showServices, setShowServices] = useState(false);

    const toggleServices = () => {
        setShowServices(!showServices);
    };

    const handleBack = () => {
        setShowServices(false);
    };

    return (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={onClose}>✕</button>
            <ul>
                {!showServices ? (
                    <>
                        <li><a href="/">Inicio</a></li>
                        <li onClick={toggleServices} className="dropdown-toggle">
                            Todos los servicios
                        </li>
                        <li><a href="/repartidores">Repartidores</a></li>
                        <li><a href="/entregas">Entregas</a></li>
                    </>
                ) : (
                    <>
                        <li onClick={handleBack} className="back-button">← Todos los servicios</li>
                        <li><a href="/estado/pedido">Estado del pedido</a></li>
                        <li><a href="/seguimiento">Seguimiento en Tiempo Real</a></li>
                        <li><a href="/calificacion">Calificación y Evaluación de Repartidores</a></li>
                        <li><a href="/cobertura">Cobertura de Entrega</a></li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default DropdownMenu;
