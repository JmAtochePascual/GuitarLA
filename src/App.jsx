import { useEffect, useState } from "react"

import { db } from './data/db';
import Header from "./components/Header"
import Guitar from "./components/Guitar";

function App() {
  const [data, setData] = useState(db);
  const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carritoLA')) || []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('carritoLA', JSON.stringify(carrito));
  }, [carrito]);

  // Eliminar guitarra del carrito
  const eliminarGuitarra = (id) => {
    const newCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(newCarrito);
  }

  // Aumentar cantidad
  const aumentarCantidad = (id) => {
    // Si la cantidad es 5 no permitir agregar más
    if (carrito.find((item) => item.id === id).cantidad === 5) {
      return;
    }

    const newCarrito = carrito.map((item) => item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item);
    setCarrito(newCarrito);
  }

  // Reducir cantidad
  const reducirCantidad = (id) => {
    // Si la cantidad es 1, eliminar el item
    if (carrito.find((item) => item.id === id).cantidad === 1) {
      eliminarGuitarra(id);
      return;
    }

    // Reducir la cantidad en 1 
    const newCarrito = carrito.map((item) => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item);
    setCarrito(newCarrito);
  }

  // Agregar guitarra al carrito
  const agregarAumetarCantidad = (guitar) => {
    const exist = carrito.find((item) => item.id === guitar.id);

    if (exist) {
      aumentarCantidad(guitar.id);
      return;
    }

    setCarrito([...carrito, { ...guitar, cantidad: 1 }]);
  }

  return (
    <>
      <Header
        carrito={carrito}
        reducirCantidad={reducirCantidad}
        aumentarCantidad={aumentarCantidad}
        eliminarGuitarra={eliminarGuitarra}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                agregarAumetarCantidad={agregarAumetarCantidad}
              />
            ))
          }
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
