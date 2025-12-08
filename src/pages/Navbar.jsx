import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import styled from 'styled-components';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import CarritoModal from "../components/CarritoModal";

function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion } = useAuthContext();
  const { vaciarCarrito, carrito } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const manejarCerrarSesion = () => {
    navigate("/productos");
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  const [abrirCarrito, setAbrirCarrito] = useState(false);

  useEffect(() => {
    if (abrirCarrito) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
  }, [abrirCarrito]);

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <NavbarContainer className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">

          {/* LOGO */}
          <Logo 
            to="/" 
            className="navbar-brand"
            onClick={() => setExpanded(false)}
          >
            AnimeStore
          </Logo>

          {/* CARRITO Y USUARIO — SIEMPRE VISIBLES EN MOBILE */}
          <div className="d-flex align-items-center gap-3 d-lg-none">

            {/* Carrito */}
            <ContenedorCarrito>
              <IconoCarrito
                as="button"
                onClick={() => {
                  setAbrirCarrito(true);
                  setExpanded(false);
                }}
                className="nav-link d-flex align-items-center bg-transparent border-0"
              >
                <FaShoppingCart />
                {totalItemsCarrito > 0 && (
                  <ContadorCarrito>{totalItemsCarrito}</ContadorCarrito>
                )}
              </IconoCarrito>
            </ContenedorCarrito>

            {/* Icono usuario */}
            <Link to={isAuthenticated ? "/perfil" : "/iniciar-sesion"} className="text-white fs-4">
              <FaUser />
            </Link>

          </div>

          {/* BOTÓN HAMBURGUESA */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU COLAPSABLE */}
          <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>

            {/* ITEMS DEL MENU */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" onClick={() => setExpanded(false)}>
                  Inicio
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/productos" className="nav-link" onClick={() => setExpanded(false)}>
                  Productos
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/servicios" className="nav-link" onClick={() => setExpanded(false)}>
                  Servicios
                </NavLink>
              </li>

              {usuario?.nombre === "admin" && (
                <li className="nav-item">
                  <NavLinkAdmin 
                    to="/formulario-producto" 
                    className="nav-link"
                    onClick={() => setExpanded(false)}
                  >
                    Agregar Producto
                  </NavLinkAdmin>
                </li>
              )}
            </ul>

            {/* SECCIÓN USUARIO (SOLO DESKTOP) */}
            <SeccionUsuario className="d-none d-lg-flex align-items-center gap-3">

              {/* Carrito */}
              <ContenedorCarrito>
                <IconoCarrito
                  as="button"
                  onClick={() => {
                    setAbrirCarrito(true);
                    setExpanded(false);
                  }}
                  className="nav-link d-flex align-items-center bg-transparent border-0"
                >
                  <FaShoppingCart />
                  {totalItemsCarrito > 0 && (
                    <ContadorCarrito>{totalItemsCarrito}</ContadorCarrito>
                  )}
                </IconoCarrito>
              </ContenedorCarrito>

              {isAuthenticated ? (
                <ContenedorUsuario className="d-flex align-items-center gap-3">
                  <Bienvenida>Hola, {usuario.nombre}</Bienvenida>

                  {usuario.nombre === "admin" && (
                    <NavLinkAdmin 
                      to="/dashboard" 
                      className="nav-link"
                      onClick={() => setExpanded(false)}
                    >
                      Dashboard
                    </NavLinkAdmin>
                  )}

                  <BotonCerrarSesion onClick={manejarCerrarSesion}>
                    Cerrar Sesión
                  </BotonCerrarSesion>
                </ContenedorUsuario>
              ) : (
                <NavLink to="/iniciar-sesion" className="nav-link">
                  Iniciar Sesión
                </NavLink>
              )}
            </SeccionUsuario>

          </div>
        </div>
      </NavbarContainer>

      <NavbarSpacer />

      <CarritoModal 
        mostrar={abrirCarrito}
        cerrar={() => setAbrirCarrito(false)}
      />
    </>
  );
}

export default Navbar;



// ===== Styled Components =====
const NavbarContainer = styled.nav`
  background-color: #EA9E3D !important;
  padding: 0.5rem 1rem;
`;

const NavbarSpacer = styled.div`
  height: 80px;
  @media (max-width: 991.98px) {
    height: 76px;
  }
`;

const Logo = styled(Link)`
  color: white !important;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  margin-right: 5rem;
  &:hover {
    color: #fff !important;
  }
`;

const NavLink = styled(Link)`
  color: white !important;
  text-decoration: none;
  padding: 0.5rem 1rem;
  &:hover {
    color: gold !important;
    text-decoration: underline;
  }
`;

const NavLinkAdmin = styled(Link)`
  color: white !important;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  &:hover {
    color: gold !important;
    text-decoration: underline;
  }
`;

const Bienvenida = styled.span`
  color: white;
  font-size: 0.9rem;
`;

const BotonCerrarSesion = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  &:hover {
    background: white;
    color: #EA9E3D;
  }
`;

const ContenedorCarrito = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

const IconoCarrito = styled(Link)`
  color: white !important;
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1rem;
  gap: 8px;
  &:hover {
    color: gold !important;
  }
    svg {
    order: -1; 
    font-size: 1.6rem;
  }
`;

const ContadorCarrito = styled.span`
  position: absolute;
  top: -8px;
  right: -18px;
  background: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

const SeccionUsuario = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  @media (max-width: 991.98px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;
  }
`;

const ContenedorUsuario = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 991.98px) {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;
