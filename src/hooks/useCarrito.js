import { useEffect, useState } from "react"

import { db } from '../data/db';

const useCarrito = () => {
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

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
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

  return {
    data,
    carrito,
    eliminarGuitarra,
    aumentarCantidad,
    reducirCantidad,
    vaciarCarrito,
    agregarAumetarCantidad
  };
}

export default useCarrito;