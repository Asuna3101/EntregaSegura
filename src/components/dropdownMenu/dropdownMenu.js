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
                        <li><a href="/deliveries">Entregas</a></li>
                    </>
                ) : (
                    <>
                        <li onClick={handleBack} className="back-button">← Todos los servicios</li>
                        <li>Estado del pedido</li>
                        <li>Seguimiento en Tiempo Real</li>
                        <li>Calificación y Evaluación de Repartidores</li>
                        <li>Cobertura de Entrega</li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default DropdownMenu;
