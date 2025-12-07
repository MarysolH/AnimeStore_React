import { Link, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCartContext } from "../context/CartContext";

import styled from "styled-components";

// ===== Styled Components =====
const DetalleRow = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  margin-top: 3rem;
`;

const SelectorCantidad = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  height: 40px;
  width: 130px;

  button {
    width: 40px;
    border: none;
    background-color: #EA9E3D;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.2s ease;

    &:hover { background-color: #d6872f; }
  }

  input {
    width: 50px;
    text-align: center;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    outline: none;
  }
`;

const BtnAgregar = styled.button`
  background-color: #EA9E3D;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d6872f;
    transform: translateY(-2px);
  }
`;

const BtnVolver = styled(Link)`
  margin-top: 1rem;
  text-decoration: underline;
  color: #555;
  font-weight: 500;
`;


// ===== Componente Funcional =====

const ProductoDetalle = () => {
    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;

    const { agregarAlCarrito } = useCartContext();


    const [cantidad, setCantidad] = useState(1);
    const aumentar = () => setCantidad(c => c + 1);
    const disminuir = () => setCantidad(c => (c > 1 ? c - 1 : 1));

    if (!producto) {
        return (
            <div className="text-center mt-5">
                <p>No se encontró el producto.</p>
                <BtnVolver to="/productos">Volver</BtnVolver>
            </div>
        );
    }

    return (
        <main className="main-container">
            <DetalleRow className="row g-4">
                <div className="col-md-6 d-flex justify-content-center align-items-start">
                    <img
                        src={producto.avatar}
                        alt={producto.nombre}
                        className="img-fluid rounded"
                        style={{ maxHeight: 500, objectFit: "contain" }}
                    />
                </div>
                <div className="col-md-6 d-flex flex-column">
                    <h2 className="fw-bold fs-1">{producto.nombre}</h2>
                    <p>{producto.descripcion}</p>
                    {producto.descripcionLarga && <p>{producto.descripcionLarga}</p>}
                    {producto.categoria && (
                        <p>
                            <strong>Categoría:</strong>{" "}
                            <span className="badge bg-secondary">{producto.categoria}</span>
                        </p>
                    )}
                    <hr />
                    <p className="fw-bold fs-3">${producto.precio}</p>

                    <div className="d-flex flex-wrap gap-2 mt-3 align-items-center">
                        <SelectorCantidad>
                            <button onClick={disminuir}>−</button>
                            <input type="text" value={cantidad} readOnly />
                            <button onClick={aumentar}>+</button>
                        </SelectorCantidad>
                        <BtnAgregar onClick={() => agregarAlCarrito({ ...producto, cantidad })}>
                          Agregar al Carrito
                        </BtnAgregar>

                    </div>

                    <BtnVolver to="/productos">Volver</BtnVolver>
                </div>
            </DetalleRow>
        </main>
    );
};

export default ProductoDetalle;
