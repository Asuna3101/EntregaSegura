import React, { useState } from 'react';
import '../css/chancePasword.css';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // URL del endpoint del backend
    const API_URL = 'http://localhost:5000/api/usuarios/change-password'; // Cambia la URL si es necesario

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // Validar si las contraseñas coinciden
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Realizar la solicitud al backend
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Token del usuario autenticado
                },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword
                })
            });

            const result = await response.json(); // Obtener la respuesta del servidor

            // Manejar la respuesta del servidor
            if (response.ok) {
                setMessage('Contraseña cambiada con éxito.');
            } else {
                setMessage(result.error || 'Error al cambiar la contraseña.'); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setMessage('Error al cambiar la contraseña.');
        }
    };

    return (
        <div className="change-password-page">
            <div className="change-password">
                <h2>Cambiar Contraseña</h2>
                <form onSubmit={handleChangePassword}>
                    <label>Contraseña Actual:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        required
                    />
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                    <label>Confirmar Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Cambiar Contraseña</button>
                </form>
                {message && <p>{message}</p>} {/* Mostrar mensaje de éxito o error */}
            </div>
        </div>
    );
};

export default ChangePassword;
