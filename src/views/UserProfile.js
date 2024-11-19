import React, { useState, useEffect } from 'react';
import '../components/css/UserProfile.css';
import RecentOrders from '../components/recentOrders/RecentOrders.js';
import AccountSettings from '../components/accountSettings/AccountSettings.js';
import ChangePassword from '../components/chancePassword/ChancePasSword.js';


export default function UserProfile() {
    const [userData, setUserData] = useState({});
    const [section, setSection] = useState('');  // Cambia el estado inicial a una cadena vacía

    const fetchData = async () => {
        try {
            const response = await fetch('tiendaback.azurewebsites.net/usuario', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUserData(data);
            } else {
                throw new Error(data.message || "Unable to fetch data");
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <>
            <div className='user-profile'>
                <div className="sidebar">
                    <h3 className="sidebar-title">Mi Cuenta</h3>
                    <ul>
                        <li><button onClick={() => setSection('recent-orders')}>Historial de pedidos</button></li>
                        <li><button onClick={() => setSection('recent-orders')}>Reseñas</button></li>
                        <li><button onClick={() => setSection('profile')}>Actualizar Datos</button></li>
                        <li><button onClick={() => setSection('change-password')}>Cambiar Contraseña</button></li>
                        <li><button onClick={logout}>Cerrar Sesión</button></li>
                    </ul>
                </div>
                <div className="content">
                    {section === '' && 
                    <div>
                        <h2>Bienvenido a tu cuenta</h2>
                    <p><strong>Nombre:</strong> {userData.nombre}</p>
                    <p><strong>Apellido:</strong> {userData.apellido}</p>
                    <p><strong>Correo:</strong> {userData.correo}</p>
                    <p>Aquí puedes gestionar todos los aspectos de tu perfil.</p>
                    </div>}
                    
                    {section === 'profile' && <AccountSettings userData={userData} />}
                    {section === 'recent-orders' && <RecentOrders />}
                    {section === 'change-password' && <ChangePassword />}
                </div>
            </div>
        </>
    );
}