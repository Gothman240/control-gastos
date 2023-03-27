import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({ gastos, setGastoEdiar, eliminarGasto }) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length ? "Tus Gastos" : "No Hay Gastos Aún"}</h2>
      {gastos.map((gasto) => (
        <Gasto key={gasto.id} gasto={gasto} setGastoEdiar={setGastoEdiar} eliminarGasto={eliminarGasto}/>
      ))}
    </div>
  );
};

export default ListadoGastos;
