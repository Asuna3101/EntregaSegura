import React, { useState } from 'react';

const Resenias = () => {
    const [reviews, setReviews] = useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchReviews = async () => {
        if (!userId) {
            setMessage('Por favor, ingrese un ID de usuario válido.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`http://localhost:5000/api/resenia/usuario/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();
            if (response.ok) {
                setReviews(data);
                setMessage('');
            } else {
                throw new Error(data.error || 'Error al cargar las reseñas.');
            }
        } catch (error) {
            console.error('Error al obtener reseñas:', error.message);
            setMessage('Error al cargar las reseñas. Intente nuevamente.');
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
                setMessage('Reseña eliminada exitosamente.');
                setReviews(reviews.filter(review => review.id !== reseniaId));  // Actualizar la lista de reseñas
            } else {
                throw new Error(data.error || 'Error al eliminar la reseña.');
            }
        } catch (error) {
            console.error('Error al eliminar la reseña:', error.message);
            setMessage('Error al eliminar la reseña. Intente nuevamente.');
        }
    };

    return (
        <div className="resenias-container">
            <h2>Historial de Reseñas</h2>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Ingrese ID del Usuario"
            />
            <button onClick={fetchReviews} disabled={loading}>
                {loading ? 'Cargando...' : 'Cargar Reseñas'}
            </button>
            {message && <p className="error-message">{message}</p>}
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
        </div>
    );
};

export default Resenias;
