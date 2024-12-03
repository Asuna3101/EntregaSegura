import React, { useState, useEffect } from 'react';
import '../css/RecentOrders.css';

const RecentOrders = () => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const fetchOrders = async () => {
        try {
            if (!userId) {
                setMessage('Por favor, ingrese un ID de usuario válido.');
                return;
            }
            const response = await fetch(`http://localhost:5000/api/pedido/usuario/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();
            if (response.ok) {
                setOrders(data);
                setMessage('');
            } else {
                throw new Error(data.error || 'Error al cargar los pedidos.');
            }
        } catch (error) {
            console.error('Error al obtener pedidos:', error.message);
            setMessage('Error al cargar los pedidos. Intente nuevamente.');
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/pedido/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Pedido eliminado exitosamente.');
                setOrders(orders.filter(order => order.id !== orderId));  // Actualizar la lista de pedidos
            } else {
                throw new Error(data.error || 'Error al eliminar el pedido.');
            }
        } catch (error) {
            console.error('Error al eliminar el pedido:', error.message);
            setMessage('Error al eliminar el pedido. Intente nuevamente.');
        }
    };

    useEffect(() => {}, []);

    return (
        <div>
            <h2>Órdenes Recientes</h2>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Ingrese ID del Usuario"
            />
            <button onClick={fetchOrders}>Cargar Pedidos</button>
            {message && <p className="error-message">{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Fecha Pedido</th>
                        <th>Items</th>  {/* Asegúrate de que tienes una columna para items si la estás mostrando */}
                        <th>Total</th>
                        <th>Enviado a</th>
                        <th>Orden No.</th>
                        <th>Estado</th>  {/* Nueva columna para el estado */}
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.fecha_pedido}</td>
                                <td>{order.descripcion}</td>  {/* Asumiendo que 'descripcion' contiene los items */}
                                <td>${parseFloat(order.precio).toFixed(2)}</td>
                                <td>{order.direccion_destino}</td>
                                <td>{order.id}</td>
                                <td>{order.estado_descripcion}</td>  {/* Mostrar la descripción del estado */}
                                <td>
                                    <button onClick={() => deleteOrder(order.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>
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
