import React, { useState } from 'react';
import '../css/accountResenias.css';
// Sample data
const initialOrders = [
    { id: '12345232', items: 'x3 Items (Juego de cartas, juego de cartas...)', date: '2022-02-12', total: '$22.00', address: 'Jiron Hucsar 123, Jesus Maria, Lima, Peru' },
    { id: '12345232', items: 'x4 Items (Pokemon Red, Pokemon Blue, Ghost of Tsushima)', date: '2022-02-12', total: '$122.00', address: 'Jiron Hucsar 123, Jesus Maria, Lima, Peru' },
    // Add more orders as needed
];

const RecentOrders = () => {
    const [orders, setOrders] = useState(initialOrders);

    
    const sortOrders = () => {
        const sorted = [...orders].sort((a, b) => new Date(a.date) - new Date(b.date));
        setOrders(sorted);
    };

    return (
        <div>
            <h2>Órdenes Recientes</h2>
            <button onClick={sortOrders}>Ordenar por fecha (más antiguas primero)</button>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Enviado a</th>
                        <th>Orden No.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.date}</td>
                            <td>{order.items}</td>
                            <td>{order.total}</td>
                            <td>{order.address}</td>
                            <td>{order.id}</td>
                            <td><button>Ver Detalle</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrders;
