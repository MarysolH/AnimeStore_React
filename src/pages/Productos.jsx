import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import styled from "styled-components";

// ===== Styled Components =====
const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;

const ProductoImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const Boton = styled.button`
  background-color: #EA9E3D;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 0.3rem;

  &:hover {
    background-color: #d6872f;
    transform: translateY(-2px);
  }
`;

const BotonDetalles = styled(Link)`
  
  color: #31200dff !important;
  text-decoration: none;
  display: block;
  text-align: center;
  border-radius: 8px;
  padding: 0.5rem;
  font-weight: 500;
  margin-top: 0.3rem;

  &:hover {
    background-color: #fae3c8ff;
    color: #151711ff !important;
    text-decoration: none;
  }
`;

const PaginadorBtn = styled.button`
  border: 1px solid #FFB347;
  background-color: ${props => props.activo ? "#FFB347" : "white"};
  color: ${props => props.activo ? "white" : "#FFB347"};
  border-radius: 6px;
  padding: 0.5rem 0.8rem;
  margin: 0 0.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.activo ? "#d6912f" : "#FFB347"};
    color: white;
  }
`;


// ===== Componente Funcional =====
export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const productosPorPagina = 6;

  const manejarEliminar = (producto) => navigate('/eliminar-producto', { state: { producto } });
  const manejarEditar = (producto) => navigate('/formulario-producto', { state: { producto } });

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.categoria && producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  if (cargando) return <p className="text-center mt-5">Cargando productos...</p>;
  if (error) return <p className="text-center mt-5">{error}</p>;

  return (
    <div className="main-container">
      {/* Barra de búsqueda */}
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <label className="form-label fw-bold">Buscar productos</label>
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            className="form-control"
            value={busqueda}
            onChange={manejarBusqueda}
          />
          {busqueda && (
            <small className="text-muted">
              Mostrando {productosFiltrados.length} de {productos.length} productos
            </small>
          )}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="row g-4">
        {productosActuales.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6 col-lg-4">
            <Card>
              <ProductoImg src={producto.avatar} alt={producto.nombre} />
              <h5 className="fw-bold text-center">{producto.nombre}</h5>
              <p className="text-muted text-center" style={{ fontSize: "0.95rem" }}>
                {producto.descripcion}
              </p>
              <p className="fw-bold text-center" style={{ color: "#1f7e40ff", fontSize: "1.15rem" }}>${producto.precio}</p>

              <BotonDetalles to={`/productos/${producto.id}`} state={{ producto }}>
                Ver detalles
              </BotonDetalles>

              <Boton onClick={() => agregarAlCarrito(producto)}>
                Agregar al carrito
              </Boton>

              {esAdmin && (
                <div className="mt-3 pt-3 border-top d-flex gap-2">
                  <button
                    onClick={() => manejarEditar(producto)}
                    className="btn btn-sm flex-fill"
                    style={{
                      backgroundColor: "#21582bff",
                      color: "white",
                      fontWeight: "500",
                      border: "none"
                    }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => manejarEliminar(producto)}
                    className="btn btn-sm flex-fill"
                    style={{
                      backgroundColor: "#a21d1dff",  // rojo apagado
                      color: "white",
                      fontWeight: "500",
                      border: "none"
                    }}
                  >
                    Eliminar
                  </button>

                </div>
              )}
            </Card>
          </div>
        ))}
      </div>

      {/* Paginador */}
      {productosFiltrados.length > productosPorPagina && (
        <div className="d-flex justify-content-center my-4">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <PaginadorBtn
              key={index + 1}
              className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => cambiarPagina(index + 1)}
            >
              {index + 1}
            </PaginadorBtn>
          ))}
        </div>
      )}

      {/* Información de la página actual */}
      {productosFiltrados.length > 0 && (
        <div className="text-center text-muted mt-2">
          <small>
            Mostrando {productosActuales.length} productos (página {paginaActual} de {totalPaginas})
          </small>
        </div>
      )}
    </div>
  );
}

