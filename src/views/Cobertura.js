import React, { useState, useEffect } from 'react';
import '../components/css/cobertura.css';



const Cobertura = () => {
    const [paises, setPaises] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [selectedPais, setSelectedPais] = useState(null); // Manejamos el país seleccionado
    const [selectedCiudad, setSelectedCiudad] = useState(null); // Manejamos la ciudad seleccionada
    const [error, setError] = useState('');

    // Obtener la lista de países al cargar el componente
    useEffect(() => {
        fetch('http://localhost:5000/api/cobertura/paises')
            .then((response) => response.json())
            .then((data) => setPaises(data))
            .catch(() => setError('No se pudo cargar la información de cobertura. Inténtalo más tarde.'));
    }, []);

    // Manejar la selección de un país para mostrar sus ciudades
    const handleVerCiudades = (paisId, paisNombre) => {
        fetch(`http://localhost:5000/api/cobertura/ciudades/${paisId}`)
            .then((response) => response.json())
            .then((data) => {
                setCiudades(data);
                setSelectedPais(paisNombre);
            })
            .catch(() => setError('No se pudo cargar la información de las ciudades.'));
    };

    // Manejar la selección de una ciudad para mostrar sus distritos
    const handleVerDistritos = (ciudadId, ciudadNombre) => {
        fetch(`http://localhost:5000/api/cobertura/distritos/${ciudadId}`)
            .then((response) => response.json())
            .then((data) => {
                setDistritos(data);
                setSelectedCiudad(ciudadNombre);
            })
            .catch(() => setError('No se pudo cargar la información de los distritos.'));
    };

    // Cerrar tabla de ciudades
    const handleCerrarCiudades = () => {
        setCiudades([]);
        setSelectedPais(null);
        setDistritos([]);
        setSelectedCiudad(null);
    };

    // Cerrar tabla de distritos
    const handleCerrarDistritos = () => {
        setDistritos([]);
        setSelectedCiudad(null);
    };

    return (
        <div className="cobertura-container">
            <h2>Cobertura</h2>
            {error && <p className="error-message">{error}</p>}

            {/* Tabla de países */}
            {!selectedPais && (
                <table className="cobertura-table">
                    <thead>
                        <tr>
                            <th>Paises</th>
                            <th>Operación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paises.map((pais) => (
                            <tr key={pais.id}>
                                <td>{pais.nombre}</td>
                                <td>
                                    <button
                                        className="action-button"
                                        onClick={() => handleVerCiudades(pais.id, pais.nombre)}
                                    >
                                        Ver departamentos
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Tabla de ciudades */}
            {selectedPais && ciudades.length > 0 && (
                <>
                    <h3>Ciudades del País: {selectedPais}</h3>
                    <button className="close-button" onClick={handleCerrarCiudades}>
                        Cerrar Ciudades
                    </button>
                    <table className="cobertura-table">
                        <thead>
                            <tr>
                                <th>Ciudades</th>
                                <th>Operación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ciudades.map((ciudad) => (
                                <tr key={ciudad.id}>
                                    <td>{ciudad.nombre}</td>
                                    <td>
                                        <button
                                            className="action-button"
                                            onClick={() => handleVerDistritos(ciudad.id, ciudad.nombre)}
                                        >
                                            Ver distritos
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {/* Tabla de distritos */}
            {selectedCiudad && distritos.length > 0 && (
                <>
                    <h3>Distritos de la Ciudad: {selectedCiudad}</h3>
                    <button className="close-button" onClick={handleCerrarDistritos}>
                        Cerrar Distritos
                    </button>
                    <table className="cobertura-table">
                        <thead>
                            <tr>
                                <th>Distritos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {distritos.map((distrito) => (
                                <tr key={distrito.id}>
                                    <td>{distrito.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Cobertura;


