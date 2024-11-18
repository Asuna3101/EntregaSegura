// HomePage.js
import React from 'react';
import logo from '../assets/img/logo1.jpg'; 
import '../components/css/homePage.css'; 

function HomePage() {
    return (
        <div className="home-content">
            <div className="home-about">
                <div className="about-text">
                    <h2>¿Quiénes Somos?</h2>
                    <p>
                    Brindamos un servicio de delivery especializado y seguro. Ofrecemos a los
                    usuarios la posibilidad de seleccionar repartidores verificados y calificados
                    por la comunidad. Esta pagina incluye una red de repartidores que han pasado
                    por un proceso de verificación y que son constantemente evaluados por los usuarios. 
                    Los clientes pueden ver las calificaciones y comentarios de otros usuarios sobre los 
                    repartidores antes de seleccionar quién entregará su pedido. Además, la aplicación 
                    incluye un sistema de seguimiento en tiempo real, asegurando que los clientes sepan 
                    exactamente dónde está su pedido en cada momento. 
                    </p>
                    <button className="cta-button">Forma de Entrega y Pago</button>
                </div>
                <img src={logo} alt="Logo Entrega Segura" className="about-logo" />
            </div>
        </div>
    );
}

export default HomePage;
