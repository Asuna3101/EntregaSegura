import React, { useState, useEffect } from 'react';
import styles from '../css/calificar.css';

function Calificar() {
    const [estrellas, setEstrellas] = useState(0);
    const [resenia, setResenia] = useState('');
    const [repartidores, setRepartidores] = useState([]);
    const [repartidorId, setRepartidorId] = useState('');
    const [usuarioId, setUsuarioId] = useState('');

    useEffect(() => {
        const fetchRepartidores = async () => {
            const response = await fetch('http://localhost:5000/api/repartidores/list');
            const data = await response.json();
            if (response.ok) {
                setRepartidores(data);
            } else {
                console.error('Error al cargar repartidores:', data.error);
            }
        };
        fetchRepartidores();
    }, []);

    const handleStarClick = index => setEstrellas(index);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/calificaciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id: usuarioId,
                    repartidor_id: repartidorId,
                    estrellas: estrellas,
                    resenia: resenia
                })
            });
            if (response.ok) {
                alert('Reseña enviada exitosamente.');
            } else {
                throw new Error('No se pudo enviar la reseña');
            }
        } catch (error) {
            alert('Error al enviar reseña: ' + error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Dejar una reseña</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="usuario" className={styles.label}>ID del Usuario:</label>
                    <input
                        type="text"
                        id="usuario"
                        className={styles.input}
                        value={usuarioId}
                        onChange={e => setUsuarioId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="repartidor" className={styles.label}>Repartidor:</label>
                    <select
                        id="repartidor"
                        className={styles.select}
                        value={repartidorId}
                        onChange={e => setRepartidorId(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un repartidor</option>
                        {repartidores.map(rep => (
                            <option key={rep.id} value={rep.id}>{rep.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.stars}>
                    <label className={styles.label}>Cuantas estrellas le asignas?</label>
                    {[1, 2, 3, 4, 5].map(index => (
                        <span
                            key={index}
                            className={index <= estrellas ? `${styles.star} ${styles.selected}` : styles.star}
                            onClick={() => handleStarClick(index)}
                        >★</span>
                    ))}
                </div>
                <div>
                    <label htmlFor="resenia" className={styles.label}>Deja una reseña:</label>
                    <textarea
                        id="resenia"
                        className={styles.textarea}
                        value={resenia}
                        onChange={e => setResenia(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.button}>Calificar</button>
            </form>
        </div>
    );
}

export default Calificar;
