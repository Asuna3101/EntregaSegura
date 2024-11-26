import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/searchbar/searchbar';
import '../components/css/repartidores.css';

function Repartidores() {
    const [repartidores, setRepartidores] = useState([]);
    const [filteredRepartidores, setFilteredRepartidores] = useState([]);
    const [reseñas, setReseñas] = useState([]);
    const navigate = useNavigate();

    // Obtener los repartidores desde el backend
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/repartidores')
            .then((response) => {
                setRepartidores(response.data);
                setFilteredRepartidores(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los repartidores:', error);
            });
    }, []);

    const handleSearch = (searchValue) => {
        const filtered = repartidores.filter((repartidor) =>
            repartidor.nombre.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredRepartidores(filtered);
    };

    const handleSeleccionarRepartidor = (repartidor) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Si no está logeado, redirigir al login
        } else {
            navigate('/pedido', { state: { repartidor } }); // Pasar el objeto repartidor completo
        }
    };
    

    const handleViewReseñas = (id) => {
        axios
            .get(`http://localhost:5000/api/repartidores/${id}/resenas`)
            .then((response) => {
                setReseñas(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener las reseñas:', error);
            });
    };

    const closeReseñas = () => {
        setReseñas([]);
    };

    return (
        <div className="home-content">
            <div className="home-about">
                <div className="about-text">
                    <SearchBar onSearch={handleSearch} />
                    <button onClick={() => setFilteredRepartidores(repartidores)} className="reset-btn">
                        Ver todos
                    </button>
                    <h2>Repartidores</h2>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Foto</th>
                                    <th>Estrellas Promedio</th>
                                    <th>Estado</th>
                                    <th>Operación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRepartidores.map((repartidor) => (
                                    <tr key={repartidor.id}>
                                        <td>{repartidor.nombre}</td>
                                        <td>{repartidor.apellido}</td>
                                        <td>
                                            <img
                                                src={repartidor.foto}
                                                alt="Foto del repartidor"
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </td>
                                        <td>{repartidor.estrellas_promedio || 'N/A'}</td>
                                        <td>{repartidor.estado}</td>
                                        <td>
                                            <button onClick={() => handleViewReseñas(repartidor.id)}>Ver reseñas</button>
                                            <button onClick={() => handleSeleccionarRepartidor(repartidor)}>
                                            Seleccionar Repartidor
                                            </button>                                                
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Tabla de reseñas */}
                    {reseñas.length > 0 && (
                        <div>
                            <h3>Reseñas</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Autor</th>
                                        <th>Repartidor</th>
                                        <th>Estrella</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reseñas.map((reseña) => (
                                        <tr key={reseña.id}>
                                            <td>{reseña.autor}</td>
                                            <td>{reseña.repartidor}</td>
                                            <td>{reseña.estrella}</td>
                                            <td>{reseña.comentario}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={closeReseñas}>Cerrar reseñas</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Repartidores;
