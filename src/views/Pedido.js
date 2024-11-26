import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/css/pedido.css';

function Pedido() {
    const location = useLocation();
    const navigate = useNavigate();
    const repartidor = location.state?.repartidor || null; // Obtener el repartidor desde el estado

    const [form, setForm] = useState({
        descripcion: '',
        numero_contacto_destino: '',
        numero_contacto_recibo: '',
        direccion_origen: '',
        direccion_destino: '',
        pais: '',
        ciudad: '',
        distrito_id_origen: '',
        distrito_id_destino: '',
    });

    const [paises, setPaises] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [distritosOrigen, setDistritosOrigen] = useState([]);
    const [distritosDestino, setDistritosDestino] = useState([]);
    const [message, setMessage] = useState('');

    // Obtener los países al cargar la página
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/cobertura/paises')
            .then((response) => setPaises(response.data))
            .catch((error) => console.error('Error al obtener países:', error));
    }, []);

    // Obtener las ciudades al seleccionar un país
    useEffect(() => {
        if (form.pais) {
            axios
                .get(`http://localhost:5000/api/cobertura/ciudades/${form.pais}`)
                .then((response) => setCiudades(response.data))
                .catch((error) => console.error('Error al obtener ciudades:', error));
        } else {
            setCiudades([]);
            setDistritosOrigen([]);
            setDistritosDestino([]);
        }
    }, [form.pais]);

    // Obtener los distritos para origen y destino al seleccionar una ciudad
    useEffect(() => {
        if (form.ciudad) {
            axios
                .get(`http://localhost:5000/api/cobertura/distritos/${form.ciudad}`)
                .then((response) => {
                    setDistritosOrigen(response.data);
                    setDistritosDestino(response.data);
                })
                .catch((error) => console.error('Error al obtener distritos:', error));
        } else {
            setDistritosOrigen([]);
            setDistritosDestino([]);
        }
    }, [form.ciudad]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Obtener el token del usuario logeado

        if (!token) {
            setMessage('Por favor, inicie sesión para crear un pedido.');
            return;
        }

        axios
            .post(
                'http://localhost:5000/api/pedido',
                {
                    ...form,
                    repartidor_id: repartidor.id,
                    fecha_pedido: new Date().toISOString().split('T')[0],
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
                    },
                }
            )
            .then((response) => {
                navigate('/pedidoDetalle', { state: { pedido: response.data } });
            })
            .catch((error) => {
                console.error('Error al crear pedido:', error.response?.data || error.message);
                setMessage('Error al crear pedido. Por favor, verifica los datos.');
            });
    };

    return (
        <div className="home-content">
            <div className="home-about">
                <div className="pedido-form">
                    <h2>Realizar Pedido</h2>
                    {repartidor && (
                        <div className="repartidor-info">
                            <img
                                src={repartidor.foto || 'default-repartidor.jpg'}
                                alt={`${repartidor.nombre} ${repartidor.apellido}`}
                                className="repartidor-foto"
                            />
                            <p>
                                <strong>Repartidor Seleccionado:</strong> {repartidor.nombre} {repartidor.apellido}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            required
                        />

                        <label>Número de contacto destino:</label>
                        <input
                            type="text"
                            name="numero_contacto_destino"
                            value={form.numero_contacto_destino}
                            onChange={handleChange}
                            required
                        />

                        <label>Número de contacto recibo:</label>
                        <input
                            type="text"
                            name="numero_contacto_recibo"
                            value={form.numero_contacto_recibo}
                            onChange={handleChange}
                            required
                        />

                        <label>Dirección de origen:</label>
                        <input
                            type="text"
                            name="direccion_origen"
                            value={form.direccion_origen}
                            onChange={handleChange}
                            required
                        />

                        <label>Dirección de destino:</label>
                        <input
                            type="text"
                            name="direccion_destino"
                            value={form.direccion_destino}
                            onChange={handleChange}
                            required
                        />

                        <label>País:</label>
                        <select name="pais" value={form.pais} onChange={handleChange} required>
                            <option value="">Seleccione un país</option>
                            {paises.map((pais) => (
                                <option key={pais.id} value={pais.id}>
                                    {pais.nombre}
                                </option>
                            ))}
                        </select>

                        <label>Ciudad:</label>
                        <select name="ciudad" value={form.ciudad} onChange={handleChange} required>
                            <option value="">Seleccione una ciudad</option>
                            {ciudades.map((ciudad) => (
                                <option key={ciudad.id} value={ciudad.id}>
                                    {ciudad.nombre}
                                </option>
                            ))}
                        </select>

                        <label>Distrito de Origen:</label>
                        <select
                            name="distrito_id_origen"
                            value={form.distrito_id_origen}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un distrito</option>
                            {distritosOrigen.map((distrito) => (
                                <option key={distrito.id} value={distrito.id}>
                                    {distrito.nombre}
                                </option>
                            ))}
                        </select>

                        <label>Distrito de Destino:</label>
                        <select
                            name="distrito_id_destino"
                            value={form.distrito_id_destino}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un distrito</option>
                            {distritosDestino.map((distrito) => (
                                <option key={distrito.id} value={distrito.id}>
                                    {distrito.nombre}
                                </option>
                            ))}
                        </select>

                        <button type="submit" className="btn-crear">
                            Crear
                        </button>
                    </form>

                    {message && <p className="error-message">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Pedido;
