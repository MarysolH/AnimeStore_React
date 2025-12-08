import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

export default function CarritoModal({ mostrar, cerrar }) {
  const { carrito, agregarCantidad, quitarCantidad, total } = useCartContext();
  const navigate = useNavigate();

  if (!mostrar) return null;

  const irAPagar = () => {
    cerrar();
    navigate("/pagar", { state: { carrito } });
  };

  const isMobile = window.innerWidth < 576;

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1050,
        }}
        onClick={cerrar}
      ></div>

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: isMobile ? "100%" : "500px",
          maxWidth: "100%",
          maxHeight: isMobile ? "90vh" : "100vh",
          backgroundColor: "white",
          boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
          zIndex: 1060,
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? "12px" : "20px",
        }}
      >
        {/* Header */}
        <div className="modal-header bg-light">
          <h5 className="modal-title">Carrito</h5>
          <button className="btn-close" onClick={cerrar}></button>
        </div>

        {/* Body: scroll solo si excede */}
        <div
          className="modal-body"
          style={{
            overflowY: "auto",
          }}
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

        {/* Footer inmediato */}
        {carrito.length > 0 && (
          <div className="modal-footer flex-column" style={{ flexShrink: 0 }}>
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
