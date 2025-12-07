import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ nombre: "", email: "" });

  const manejarEnvio = (e) => {
    e.preventDefault();

    const { nombre, email } = formulario;

    // Caso ADMIN
    if (nombre === "admin" && email === "1234@admin") {
      localStorage.setItem("authEmail", email);
      iniciarSesion("admin", email);
      navigate("/dashboard");
      return;
    }

    // Caso Usuario Normal
    if (nombre && email && nombre !== "admin") {
      localStorage.setItem("authEmail", email);
      iniciarSesion(nombre, email);

      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/productos");
      }
      return;
    }

    // Error
    toast.error("Credenciales incorrectas.");
  };

  return (
    <div className="container d-flex justify-content-center">
      <ToastContainer position="top-center"/>

      <div
        className="card shadow p-4 mt-5 mb-"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "12px" }}
      >
        <h2 className="mb-4 text-center" style={{ fontWeight: "bold" }}>
          Iniciar Sesión
        </h2>

        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu nombre"
              value={formulario.nombre}
              onChange={(e) =>
                setFormulario({ ...formulario, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="tuemail@ejemplo.com"
              value={formulario.email}
              onChange={(e) =>
                setFormulario({ ...formulario, email: e.target.value })
              }
              required
            />
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate("/productos")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn px-4"
              style={{
                backgroundColor: "#1A8754",
                color: "white",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Iniciar Sesión
            </button>

            
          </div>
        </form>

        <p
          style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "#777",
            textAlign: "center",
          }}
        >
          <strong>¿No recuerdas tus credenciales?</strong>  
          
        </p>
      </div>
    </div>
  );
}
