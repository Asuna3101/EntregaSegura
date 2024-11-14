import React, { useState } from 'react';
import '../css/accountSettings.css';
const AccountSettings = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userData = { nombre, apellido, correo };

        try {
            const response = await fetch('tiendaback.azurewebsites.net/usuario', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token es correcto y está disponible.
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Datos actualizados con éxito.');
            } else {
                setMessage(result.message || 'Error al actualizar los datos.');  // Usar el mensaje de error del servidor si está disponible.
            }
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            setMessage('Error al actualizar los datos.');
        }
    };

    return (
        <div className="account-settings">
            <h2>Datos de Registro</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </div>
                <div>
                    <label>Correo:</label>
                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                </div>
                <button type="submit">Actualizar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AccountSettings;
