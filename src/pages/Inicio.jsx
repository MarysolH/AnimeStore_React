import React from "react";

export default function Inicio() {
  return (
    <main className="main-container">
      {/* Título */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Todo lo que un verdadero fan necesita</h2>
        <hr style={{ width: "60px", borderTop: "3px solid #EA9E3D", margin: "0 auto" }} />
      </div>

      {/* Banner principal */}
      <div className="d-flex justify-content-center">
        <img
          src="https://www.clarin.com/img/2024/03/19/ZjUDco4Lb_1256x620__1.jpg"
          alt="Banner anime"
          className="img-fluid rounded shadow-lg mb-4"
          style={{ maxHeight: "590px", objectFit: "cover" }}
        />
      </div>

      {/* Texto de bienvenida */}
      <div className="mx-auto text-center mb-4" style={{ maxWidth: "900px", color: "#555" }}>
        <p className="fs-5 mb-2">
          Bienvenido a la mejor tienda de anime de Argentina donde vas a encontrar todo lo que necesitas: figuras, model kits, merchandising, accesorios y mucho más.
        </p>
        <p className="fs-5">
          Somos AnimeStore, estamos en Buenos Aires, pero llegamos a todas las provincias. Pasión, calidad y variedad para todos los fans del anime.
        </p>
      </div>

      {/* Botones de acción */}
      <div className="d-flex justify-content-center gap-3">
        <a
          href="/productos"
          className="btn"
          style={{ backgroundColor: "#EA9E3D", color: "white" }}
        >
          Ver Productos
        </a>
        <a
          href="/servicios"
          className="btn"
          style={{ backgroundColor: "white", color: "#EA9E3D", border: "2px solid #EA9E3D" }}
        >
          Servicios
        </a>
      </div>
    </main>
  );
}