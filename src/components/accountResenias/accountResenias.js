import React, { useState, useEffect } from 'react';
import "../css/RecentOrders.css"; // Using the same CSS for styling

const Resenias = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/api/resenia/usuario`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();
            if (response.ok) {
                setReviews(data);
            } else {
                throw new Error(data.error || 'Error al cargar las reseñas.');
            }
        } catch (error) {
            console.error('Error al obtener reseñas:', error.message);
            setError('Error al cargar las reseñas. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const deleteResenia = async (reseniaId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/resenia/resenia/${reseniaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();
            if (response.ok) {
                setReviews(reviews.filter(review => review.id !== reseniaId)); // Update the list without the deleted review
            } else {
                throw new Error(data.error || 'Error al eliminar la reseña.');
            }
        } catch (error) {
            console.error('Error al eliminar la reseña:', error.message);
            setError('Error al eliminar la reseña. Intente nuevamente.');
        }
    };

    return (
        <div className="resenias-container">
            <h2>Historial de Reseñas</h2>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Cargando reseñas...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Reseña</th>
                            <th>Estrellas</th>
                            <th>Repartidor</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length > 0 ? reviews.map((review) => (
                            <tr key={review.id}>
                                <td>{review.id}</td>
                                <td>{review.resenia}</td>
                                <td>{review.estrella}</td>
                                <td>{review.repartidor_nombre || `ID ${review.repartidor_id}`}</td>
                                <td>
                                    <button onClick={() => deleteResenia(review.id)}>Eliminar</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No hay reseñas disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Resenias;
