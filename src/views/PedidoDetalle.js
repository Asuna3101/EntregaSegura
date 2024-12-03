import React from 'react';
import { useLocation } from 'react-router-dom';

function PedidoDetalle() {
    const location = useLocation();
    const { pedido } = location.state || {};

    // Asegurarse de que pedido.precio es un número
    const precio = pedido && !isNaN(parseFloat(pedido.precio)) ? parseFloat(pedido.precio) : 0;

    return (
        <div className="pedido-detalle">
            <h2>Detalles del Pedido</h2>
            {pedido ? (
                <div>
                    <p><strong>ID del Pedido:</strong> {pedido.id}</p>
                    <p><strong>Descripción:</strong> {pedido.descripcion}</p>
                    <p><strong>Fecha de Pedido:</strong> {pedido.fecha_pedido}</p>
                    <p><strong>Fecha de Entrega:</strong> {pedido.fecha_entrega}</p>
                    <p><strong>Precio:</strong> S/{precio.toFixed(2)}</p> {/* Usamos precio formateado */}
                </div>
            ) : (
                <p>No hay información disponible del pedido.</p>
            )}
            <button>Pagar</button>
        </div>
    );
}

export default PedidoDetalle;
