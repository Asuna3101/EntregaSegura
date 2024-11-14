// Layout.js
import React from 'react';
import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
// Layout.js
 // Asegúrate de que el navbar esté importado si lo usas
import '../css/layout.css';

export default function Layout({ children }) {
    return (
        <div className="layout-container">
            <NavBar />
            <div className="content">
                {children}
            </div>
            <Footer />
        </div>
    );
}
