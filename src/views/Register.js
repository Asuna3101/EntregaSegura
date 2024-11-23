import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/register.css';

const API_URL = 'http://localhost:5000/api/usuarios/register'; // URL actualizada al backend local

export default function Register() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { nombre, apellido, correo, password };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert('Usuario registrado exitosamente');
                navigate(`/login`); // Redirige al usuario al login
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Error al registrarse');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrarse. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className='register-page'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Crea una cuenta</h1>
                    <h4>Es rápido y fácil</h4>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Nombre"
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Apellido"
                            required
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Correo"
                            required
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Contraseña nueva"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Regístrate</button>
                    <div className="register-link">
                        <p>¿Ya tienes cuenta? <a href="/login">Ingresa</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
