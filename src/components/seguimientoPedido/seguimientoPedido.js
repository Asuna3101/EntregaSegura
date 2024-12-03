import React, { useState } from 'react';

function SeguimientoPedido() {
    const [pedidoId, setPedidoId] = useState('');
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetch = async () => {
        if (!pedidoId) {
            setError('Por favor, ingresa un ID de pedido válido.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/api/pedido/${pedidoId}`);
            const data = await response.json();
            if (response.ok) {
                setTrackingInfo(data);
            } else {
                throw new Error(data.error || 'No se pudo obtener el seguimiento.');
            }
        } catch (error) {
            console.error('Error al obtener el seguimiento:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Seguimiento pedido:</h2>
            <input
                type="text"
                value={pedidoId}
                onChange={e => setPedidoId(e.target.value)}
                placeholder="Ingresa el ID de tu pedido"
            />
            <button onClick={handleFetch} disabled={loading}>
                {loading ? 'Cargando...' : 'Cargar'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {trackingInfo && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha creación</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th>Repartidor asignado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{trackingInfo.id}</td>
                            <td>{trackingInfo.creado_en}</td>
                            <td>{trackingInfo.latitud}</td>
                            <td>{trackingInfo.longitud}</td>
                            <td>{trackingInfo.nombre} {trackingInfo.apellido}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SeguimientoPedido;
