import React, { useState, useEffect } from 'react';
import '../css/RecentOrders.css';

const RecentOrders = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');

    // Función para obtener pedidos desde el backend
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/pedidos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Token del usuario autenticado
                },
            });

            const data = await response.json();

            if (response.ok) {
                setOrders(data);
            } else {
                throw new Error(data.error || 'Error al cargar los pedidos.');
            }
        } catch (error) {
            console.error('Error al obtener pedidos:', error.message);
            setMessage('Error al cargar los pedidos. Intente nuevamente.');
        }
    };

    // Llamar a la función para cargar los pedidos cuando se monte el componente
    useEffect(() => {
        fetchOrders();
    }, []);

    // Ordenar pedidos por fecha
    const sortOrders = () => {
        const sorted = [...orders].sort((a, b) => new Date(a.fecha_pedido) - new Date(b.fecha_pedido));
        setOrders(sorted);
    };

    return (
        <div>
            <h2>Órdenes Recientes</h2>
            <button onClick={sortOrders}>Ordenar por fecha (más antiguas primero)</button>
            {message && <p className="error-message">{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Fecha Pedido</th>
                        <th>Repartidor</th>
                        <th>Total</th>
                        <th>Enviado a</th>
                        <th>Orden No.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.fecha_pedido}</td>
                                <td>{order.repartidor}</td>
                                <td>${parseFloat(order.precio).toFixed(2)}</td>
                                <td>{order.direccion_destino}</td>
                                <td>{order.id}</td>
                                <td>
                                    <button>Ver Detalle</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                No hay pedidos disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrders;
