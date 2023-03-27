import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./assets/img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto',)) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [gastos, setGastos] = useState(
    //JSON.parse convierte string a arrays
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  //editar con el swipe
  const [gastoEdiar, setGastoEdiar] = useState({})

  useEffect(() => {
    if(Object.keys(gastoEdiar).length > 0){
      setModal(true);
  
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEdiar])

  //solo se ejecuta cuando cambia el presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  //solo escucha los cambios que suceden en gastos
  useEffect(() => {
    //localstorage no almacena arrays, JSON stringify convierte arrays a string
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])
  
  //se ejecuta una sola vez cuando carga la app
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])
  

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEdiar({})

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGastos = (gasto) => {
    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState
      )
      setGastos(gastosActualizados);
      setGastoEdiar({})
    }else{
      //Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos 
              gastos={gastos}
              setGastoEdiar={setGastoEdiar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          setAnimarModal={setAnimarModal}
          animarModal={animarModal}
          guardarGastos={guardarGastos}
          gastoEdiar={gastoEdiar}
          setGastoEdiar={setGastoEdiar}
        />
      )}
    </div>
  );
}

export default App;
