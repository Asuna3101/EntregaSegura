import React, { useState, useEffect } from "react";
import "../../components/css/calificar.css";

function Calificar() {
  const [estrellas, setEstrellas] = useState(0);
  const [resenia, setResenia] = useState("");
  const [repartidores, setRepartidores] = useState([]);
  const [repartidorId, setRepartidorId] = useState("");

  useEffect(() => {
    const fetchRepartidores = async () => {
      const response = await fetch("http://localhost:5000/api/repartidores/list", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRepartidores(data);
      } else {
        console.error("Error al cargar repartidores:", data.error);
      }
    };
    fetchRepartidores();
  }, []);

  const handleStarClick = (index) => setEstrellas(index);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await fetch("http://localhost:5000/api/resenia/resenia", { // Adjust the endpoint as necessary
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`  // Token for backend to extract user ID
        },
        body: JSON.stringify({
          repartidor_id: repartidorId,
          estrellas: estrellas,
          resenia: resenia,
        }),
      });

      const response = await result.json();

      if (result.ok) {
        alert("Reseña enviada exitosamente.");
      } else {
        throw new Error("No se pudo enviar la reseña");
      }
    } catch (error) {
      alert("Error al enviar reseña: " + error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Dejar una reseña</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="repartidor" className="label">
            Repartidor:
          </label>
          <select
            id="repartidor"
            className="select"
            value={repartidorId}
            onChange={(e) => setRepartidorId(e.target.value)}
            required
          >
            <option value="">Seleccione un repartidor</option>
            {repartidores.map((rep) => (
              <option key={rep.id} value={rep.id}>
                {rep.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="stars">
          <label className="label">Cuantas estrellas le asignas?</label>
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={index <= estrellas ? "star selected" : "star"}
              onClick={() => handleStarClick(index)}
            >
              ★
            </span>
          ))}
        </div>
        <div>
          <label htmlFor="resenia" className="label">
            Deja una reseña:
          </label>
          <textarea
            id="resenia"
            className="textarea"
            value={resenia}
            onChange={(e) => setResenia(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Calificar
        </button>
      </form>
    </div>
  );
}

export default Calificar;
