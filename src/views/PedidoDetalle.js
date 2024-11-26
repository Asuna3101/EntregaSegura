import React from 'react';
import { useLocation } from 'react-router-dom';

function PedidoDetalle() {
    const location = useLocation();
    const { pedido } = location.state || {};

    return (
        <div className="pedido-detalle">
            <h2>Detalles del Pedido</h2>
            {pedido ? (
                <div>
                    <p><strong>ID del Pedido:</strong> {pedido.id}</p>
                    <p><strong>Descripción:</strong> {pedido.descripcion}</p>
                    <p><strong>Fecha de Pedido:</strong> {pedido.fecha_pedido}</p>
                    <p><strong>Fecha de Entrega:</strong> {pedido.fecha_entrega}</p>
                    <p><strong>Precio:</strong> S/{pedido.precio.toFixed(2)}</p>
                    <p><strong>Dirección de Origen:</strong> {pedido.direccion_origen}</p>
                    <p><strong>Dirección de Destino:</strong> {pedido.direccion_destino}</p>
                </div>
            ) : (
                <p>No hay información disponible del pedido.</p>
            )}
        </div>
    );
}

export default PedidoDetalle;
