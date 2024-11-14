import React, { useState } from 'react';
import '../css/chancePasword.css';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('tiendaback.azurewebsites.net/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Asegúrate de que el token es correcto y está disponible.
                },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword
                })
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Contraseña cambiada con éxito.');
            } else {
                setMessage(result.message || 'Error al cambiar la contraseña.');  // Usar el mensaje de error del servidor si está disponible.
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
                    <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                    <label>Nueva Contraseña:</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    <label>Confirmar Nueva Contraseña:</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    <button type="submit">Cambiar Contraseña</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default ChangePassword;
