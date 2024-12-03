import React, { useState, useEffect } from 'react';
import '../components/css/UserProfile.css';
import RecentOrders from '../components/recentOrders/RecentOrders.js';
import AccountSettings from '../components/accountSettings/AccountSettings.js';
import ChangePassword from '../components/chancePassword/ChancePasSword.js';
import Resenias from '../components/accountResenias/accountResenias.js';
import Calificar from '../components/calificar/calificar.js';
export default function UserProfile() {
    const [userData, setUserData] = useState({});
    const [section, setSection] = useState(''); // Estado para controlar la sección visible

    // Obtener datos del usuario
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/usuarios/me', { // Cambié la URL al servidor local
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
                throw new Error(data.error || "No se pudieron obtener los datos del usuario.");
            }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            // Redirigir al login si no se puede autenticar al usuario
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    };

    // Cargar datos al cargar la página
    useEffect(() => {
        fetchData();
    }, []);

    // Cerrar sesión
    const logout = () => {
        const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
        if (confirmLogout) {
            localStorage.removeItem('token'); // Eliminar token del almacenamiento
            window.location.href = '/login'; // Redirigir al login
        }
    };
    const deleteAccount = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
          try {
            const response = await fetch('http://localhost:5000/api/usuarios/delete-account', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            });
      
            const data = await response.json();
      
            if (response.ok) {
              alert(data.message); // Mensaje de éxito
              localStorage.removeItem('token'); // Eliminar el token del localStorage
              window.location.href = '/register'; // Redirigir al registro o a otra página
            } else {
              alert(data.error || 'Error al eliminar la cuenta.');
            }
          } catch (error) {
            console.error('Error al eliminar la cuenta:', error);
            alert('Ocurrió un error al procesar la solicitud. Intenta nuevamente.');
          }
        }
      };
      
    return (
        <div className='user-profile'>
            <div className="sidebar">
                <h3 className="sidebar-title">Mi Cuenta</h3>
                <ul>
                    <li><button onClick={() => setSection('recent-orders')}>Historial de pedidos</button></li>
                    <li><button onClick={() => setSection('resenias')}>Historial de reseñas</button></li>
                    <li><button onClick={() => setSection('calificar')}>Dejar una reseña</button></li>
                    <li><button onClick={() => setSection('seguimiento')}>Seguimiento de mi pedido</button></li>
                    <li><button onClick={() => setSection('profile')}>Actualizar Datos</button></li>
                    <li><button onClick={() => setSection('change-password')}>Cambiar Contraseña</button></li>
                    <li><button onClick={logout}>Cerrar Sesión</button></li>
                    <li><button onClick={deleteAccount} className="delete-button">Eliminar Cuenta</button></li>

                </ul>
            </div>
            <div className="content">
                {/* Vista de bienvenida si no hay sección seleccionada */}
                {section === '' && (
                    <div>
                        <h2>Bienvenido a tu cuenta</h2>
                        <p><strong>Nombre:</strong> {userData.nombre}</p>
                        <p><strong>Apellido:</strong> {userData.apellido}</p>
                        <p><strong>Correo:</strong> {userData.correo}</p>
                        <p>Aquí puedes gestionar todos los aspectos de tu perfil.</p>
                    </div>
                )}
                
                {/* Renderizar la sección seleccionada */}
                {section === 'profile' && <AccountSettings userData={userData} />}
                {section === 'recent-orders' && <RecentOrders />}
                {section === 'resenias' && <Resenias />}
                {section === 'seguimiento' && <estadoPedido />}
                {section === 'change-password' && <ChangePassword />}
                {section === 'calificar' && <Calificar />}
            </div>
        </div>
    );
}
