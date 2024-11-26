import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ChangePasswordRecover = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Para redirigir al login

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/usuarios/reset-password-with-token', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword,
          token: searchParams.get('token'), // Token recibido desde la URL
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Contraseña cambiada con éxito. Redirigiendo al login...');
        setTimeout(() => {
          navigate('/login'); // Redirigir al login después de 2 segundos
        }, 2000);
      } else {
        setMessage(data.error || 'Error al cambiar la contraseña.');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.message);
      setMessage('Error al procesar la solicitud. Intenta nuevamente.');
    }
  };

  return (
    <div className="change-password-page">
      <div className="change-password">
        <h2>Cambiar Contraseña para recuperar tu cuenta</h2>
        <form onSubmit={handleChangePassword}>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label>Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Cambiar Contraseña</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePasswordRecover;
