
import React from 'react';
import logo from '../assets/img/logo1.jpg'; 
import SearchBar from '../components/searchbar/searchbar';

function Repartidores() {
    return (
        <div className="home-content">
            <div className="home-about">
                <div className="about-text">
                    <SearchBar />
                    <h2>Repartidores</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
                        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions 
                        of Lorem Ipsum.
                    </p>
                    <button className="cta-button">Forma de Entrega y Pago</button>
                </div>
                <img src={logo} alt="Logo Entrega Segura" className="about-logo" />
            </div>
        </div>
    );
}

export default Repartidores;