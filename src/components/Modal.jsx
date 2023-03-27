import React, { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../assets/img/cerrar.svg";

const Modal = ({
  setModal,
  setAnimarModal,
  animarModal,
  guardarGastos,
  gastoEdiar,
  setGastoEdiar
}) => {
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("")
  const [fecha, setFecha] = useState("")

  useEffect(() => {
    if (Object.keys(gastoEdiar).length > 0) {
      setNombre(gastoEdiar.nombre)
      setCantidad(gastoEdiar.cantidad)
      setCategoria(gastoEdiar.categoria)
      setId(gastoEdiar.id)
      setFecha(gastoEdiar.fecha)
    }  
  
  }, [gastoEdiar])
  


  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEdiar({})
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, timeout);
      return;
    }
    guardarGastos({ nombre, cantidad, categoria, id, fecha});
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
      </div>

      <form
        action=""
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEdiar.nombre ? "Editar Gasto": "Nuevo Gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el Nombre del Gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la Cantidad del Gasto: ej. 800"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value={gastoEdiar.nombre ? "Guardar Cambios": "Añadir Gasto"} />
      </form>
    </div>
  );
};

export default Modal;
