import React, { useState } from 'react';
import '../components/css/PasswordRecovery.css';

export default function PasswordRecovery() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/usuarios/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo: email })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Correo enviado. Revisa tu bandeja de entrada para el enlace de recuperación.');
            } else {
                setMessage(data.error || 'Error al buscar el correo.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Ocurrió un error al procesar la solicitud. Intenta nuevamente.');
        }
    };

    return (
        <div className="password-recovery">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Recupera tu cuenta</h1>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Correo"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit">Buscar</button>
                    {message && <p className={`message ${message.includes('Correo enviado') ? 'success' : 'error'}`}>{message}</p>}
                    <div className="register-link">
                        <p><a href="/login">Regresar al login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
