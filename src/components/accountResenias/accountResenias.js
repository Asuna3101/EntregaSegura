import React, { useState, useEffect } from 'react';
import '../css/accountResenias.css';

const Resenias = () => {
    const [resenias, setResenias] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchResenias = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/resenas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    setResenias(data);
                } else {
                    throw new Error(data.error || 'No se pudieron cargar las reseñas.');
                }
            } catch (error) {
                console.error('Error al obtener las reseñas:', error);
                setMessage('Error al cargar las reseñas. Intente nuevamente.');
            }
        };

        fetchResenias();
    }, []);

    const sortResenias = () => {
        const sorted = [...resenias].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setResenias(sorted);
    };

    return (
        <div>
            <h2>Historial de Reseñas</h2>
            <button onClick={sortResenias} className="btn-sort">
                Ordenar por fecha (más antiguas primero)
            </button>
            {message && <p className="error-message">{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Repartidor</th>
                        <th>Estrellas</th>
                        <th>Comentario</th>
                        <th>Pedido</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {resenias.map((resenia, index) => (
                        <tr key={index}>
                            <td>{resenia.fecha}</td>
                            <td>{resenia.repartidor}</td>
                            <td>{resenia.estrellas}</td>
                            <td>{resenia.comentario}</td>
                            <td>{resenia.pedido_id}</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Resenias;
