import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/login.css';


const API_URL = 'tiendaback.azurewebsites.net/login';

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
            }).catch((error) => console.log(error));

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem('token', data.token); // Guardar el token en localStorage
                navigate(`/user/profile`); // Redirige al usuario al perfil
            } else {
                // Manejar errores de autenticación, como credenciales incorrectas
                throw new Error(`Failed to log in: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            //alert('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <>
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
                            <label htmlFor="remember"><input type="checkbox" id="remember" />Recordarme</label>
                            <a href="/password/recovery">¿Olvidaste tu contraseña?</a>
                        </div>
                        <button type="submit">Login</button>
                        <div className="register-link">
                            <p>No tienes una cuenta? <a href="register">Regístrate</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
