// Footer.js
import React from 'react';
import logo from '../../assets/img/logo.jpg'; // Ruta corregida para importar la imagen
import '../css/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={logo} alt="Logo Entrega Segura" />
            </div>

            <div className="footer-section">
                <h3>Términos y Condiciones</h3>
                <ul>
                    <li>Políticas de Envío</li>
                    <li>Políticas de Reembolso</li>
                    <li>Términos de Servicio</li>
                    <li>Política de Privacidad</li>
                </ul>
            </div>

            <div className="footer-section">
                <h3>Preguntas Frecuentes</h3>
                <ul>
                    <li>Tiempos de Entrega</li>
                    <li>Formas de Pago</li>
                    <li>Devoluciones y/o Cambios</li>
                    <li>Forma de Envíos</li>
                </ul>
            </div>

            <div className="footer-section">
                <h3>Contáctanos</h3>
                <ul>
                    <li>Email: importaciones@gmail.com</li>
                    <li>WhatsApp: +51953328568</li>
                    <li>Horario de Atención: 9:00 am - 7:00 pm</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
