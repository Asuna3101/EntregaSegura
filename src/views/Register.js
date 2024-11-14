import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/register.css';

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
            const response = await fetch('tiendaback.azurewebsites.net/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            }).catch((error)=>console.log(error));
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // Si el registro es exitoso, redirige al usuario al perfil
                navigate(`/user/profile`);
            } else {
                // Si no es exitoso, puedes manejarlo aquí, por ejemplo, mostrando un mensaje
                throw new Error(`Failed to register: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            //alert('Error al registrarse. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <>
            <div className='register-page'>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>Crea una cuenta</h1>
                        <h4>Es rápido y fácil</h4>
                        <div className="input-box">
                            <input type="text" placeholder="Nombre" required value={nombre} onChange={e => setNombre(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Apellido" required value={apellido} onChange={e => setApellido(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="Correo" required value={correo} onChange={e => setCorreo(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Contraseña nueva" required value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Regístrate</button>
                        <div className="register-link">
                            <p>¿Ya tienes cuenta? <a href="/login">Ingresa</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
