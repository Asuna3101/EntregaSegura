import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/login.css';

const API_URL = 'http://localhost:5000/api/usuarios/login'; // URL actualizada al backend local

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
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
                console.log(data);
                localStorage.setItem('token', data.token); // Guardar el token en localStorage
                navigate(`/user/profile`); // Redirige al usuario al perfil
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="login-page">
            <div className='wrapper'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
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
