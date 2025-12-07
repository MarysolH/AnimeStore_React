import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';


export default function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, total, vaciarCarrito, agregarCantidad, quitarCantidad } = useCartContext();

  const navigate = useNavigate();


  const tokenActual = localStorage.getItem('authToken');


  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito(); // Limpiar carrito después de comprar
    navigate("/productos");
  };

    const manejarCerrarSesion = () => {
    vaciarCarrito(); // ← Primero vaciar el carrito en el estado
    cerrarSesion(); // ← Luego cerrar sesión
    navigate("/productos"); // ← Redirigir
  };


  return (
    <main className="main-container">
      {/* Info del usuario */}
      <div>
        <h2 className="fw-bold">Hola {usuario.nombre}</h2>
        <p>Email: {usuario.email}</p>
       
        {/* Estilo para el Token */}
        <div style={{
          background: '#f0f0f0',
          padding: '8px',
          borderRadius: '4px',
          margin: '10px 0',
          fontSize: '12px',
          wordBreak: 'break-all'
        }}>
          <strong>Token:</strong> {tokenActual}
        </div>
        <button onClick={manejarCerrarSesion} className="btn btn-outline-dark btn-sm px-3">Cerrar sesión</button>
        <hr />
      </div>


      {/* Carrito */}
      <div className="p-5">
        <h2 className="mb-4 fw-bold">Tu compra:</h2>


        {carrito.length > 0 ? (
          <>
            {carrito.map((producto) => {
              const cantidad = Number(producto.cantidad || 1);
              const precioUnitario = Number(producto.precio || 0);
              const subtotal = cantidad * precioUnitario;
              return (
                <div
                  key={producto.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    borderBottom: "1px solid #ddd",
                    gap: "16px"
                  }}
                >

                  {/* Imagen */}
                  <img
                    src={producto.avatar}
                    alt={producto.nombre}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "30px"
                    }}
                  />

                  {/* Nombre + Precio */}
                  <div style={{ flex: 1 }}>
                    <div className="fw-bold" style={{ fontSize: "18px", color: "#1A8754" }}>
                      {producto.nombre}
                    </div>
                    <div style={{ fontSize: "14px", color: "#555" }}>
                      Precio unidad: ${precioUnitario.toFixed(2)}
                    </div>
                  </div>

                  {/* Selector de cantidad */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <button
                      onClick={() => quitarCantidad(producto.id)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        background: "white",
                        fontSize: "20px",
                        fontWeight: "bold",
                        lineHeight: 1
                      }}
                    >
                      −
                    </button>

                    <span
                      style={{
                        minWidth: "24px",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "bold"
                      }}
                    >
                      {cantidad}
                    </span>

                    <button
                      onClick={() => agregarCantidad(producto.id)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        background: "white",
                        fontSize: "20px",
                        fontWeight: "bold",
                        lineHeight: 1
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      minWidth: "120px",
                      textAlign: "right"
                    }}
                  >
                    ${subtotal.toFixed(2)}
                  </div>
                </div>

              );
            })}
            <hr />
            <div className="d-flex justify-content-end">
              <h3 
                className="fs-4 fw-bold text-dark bg-light rounded-4 p-3 shadow-sm"
                style={{ width: "fit-content" }}
              >
                Total a pagar: ${Number(total).toFixed(3)}
              </h3>
            </div>
          </>


        ) : (
          <p>No hay productos en el carrito</p>
        )}
      </div>
      <div 
        className="d-flex justify-content-between align-items-center mt-3"
        style={{ width: "100%" }}
      >
        {/* Izquierda: Vaciar carrito */}
        <button 
          className="btn px-4"
          style={{ 
            color: "#b3261e",
            backgroundColor: "white",
            border: "2px solid #b3261e"
          }}
          onClick={vaciarCarrito}
        >
          Vaciar Carrito
        </button>


        {/* Derecha: Seguir comprando + Confirmar y Pagar */}
        <div className="d-flex" style={{ gap: "12px" }}>
          <button 
            className="btn btn-secondary px-4" 
            style={{ backgroundColor: "#6c757d", border: "none" }}
            onClick={() => navigate("/productos")}
          >
            {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
          </button>

          {carrito.length > 0 && (
            <button 
              className="btn px-4"
              style={{
                backgroundColor: "#1A8754",
                color: "white",
                border: "none",
                fontWeight: "bold"
              }}
              onClick={comprar}
            >
              Confirmar y Pagar
            </button>
          )}
        </div>
      </div>

    </main>
  );
}

