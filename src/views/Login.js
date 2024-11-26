import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/login.css';

const API_URL = 'http://localhost:5000/api/usuarios/login';

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const loginInfo = { correo, password };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate(`/user/profile`);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="login-page">
            <div className='wrapper'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="remember-forgot"> 
                        <a href="/password/recovery">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>No tienes una cuenta? <a href="/register">Regístrate</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
