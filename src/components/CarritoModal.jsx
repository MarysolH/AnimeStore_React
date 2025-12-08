import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

export default function CarritoModal({ mostrar, cerrar }) {
  const { carrito, agregarCantidad, quitarCantidad, vaciarCarrito, total } = useCartContext();
  const navigate = useNavigate();

  if (!mostrar) return null;

  const irAPagar = () => {
    cerrar();
    navigate("/pagar", { state: { carrito } });
  };

  return ReactDOM.createPortal(
    <>
      {/* Backdrop más bajo */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1050,
        }}
        onClick={cerrar}
      ></div>

      {/* Sidebar arriba del backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "500px",
          maxWidth: "100%",           
          height: "100vh",
          backgroundColor: "white",
          boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
          zIndex: 1060,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          paddingTop: "10px",

          // --- RESPONSIVE ---
          ...(window.innerWidth < 576
            ? {
                width: "100%",        
                padding: "12px",      
              }
            : {}),
        }}
      >
        {/* Header */}
        <div className="modal-header bg-light">
          <h5 className="modal-title">Carrito</h5>
          <button className="btn-close" onClick={cerrar}></button>
        </div>

        {/* Body */}
        <div
          className="modal-body"
          style={{ overflowY: "auto", flexGrow: 1 }}
        >
          {carrito.length === 0 ? (
            <p className="text-center text-muted">El carrito está vacío</p>
          ) : (
            carrito.map(item => (
              <div
                key={item.id}
                className="d-flex gap-3 align-items-center border rounded p-2 mb-3"
                style={{ minHeight: "110px" }}
              >
                <img
                  src={item.avatar}
                  alt={item.nombre}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />

                <div className="flex-grow-1">
                  <strong>{item.nombre}</strong>
                  <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                    Precio: ${Number(item.precio).toFixed(2)}
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>
                    Subtotal: <strong>${(item.precio * item.cantidad).toFixed(2)}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => quitarCantidad(item.id)}
                  >
                    −
                  </button>
                  <span className="fw-bold">{item.cantidad}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => agregarCantidad(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {carrito.length > 0 && (
          <div className="modal-footer flex-column">
            <div className="w-100 text-end mb-2">
              <strong>Total: ${Number(total).toFixed(2)}</strong>
            </div>
            <div className="d-flex w-100 justify-content-between">
              <button 
                className="btn btn-outline-secondary"
                onClick={() => navigate("/productos")}
              >
                Seguir comprando
              </button>

              <button
                className="btn"
                style={{ backgroundColor: "#1A8754", color: "white" }}
                onClick={irAPagar}
              >
                Ir a Pagar
              </button>
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}

