import React from 'react';
import logo from '../assets/img/logo1.jpg'; 
function Cobertura() {
    return (
        <div className="home-content">
            <div className="home-about">
                <div className="about-text">
                    <h2>Cobertura Peru</h2>
                    <p>Sabias que nos encontramos en muchos lugares de Perú</p>
                    <ul><li>Lima</li>
                    <li>Arequipa</li>
                    <li>Trujillo</li>
                    <li>Piura</li>
                    <li>Cusco</li>
                    <li>Chiclayo</li>
                    <li>Ica</li>
                    <li>Huancayo</li>
                    <li>Cajamarca</li>
                    </ul>
                    <p>Siempre estamos actualizando nuestra cobertura asi que problemas de conectarte en cualquier lugar del pais con nosotros.</p>
                </div>
                <img src={logo} alt="Logo Entrega Segura" className="about-logo" />
            </div>
        </div>
    );
}

export default Cobertura;