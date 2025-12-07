import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import atencion from "../assets/atencion.jpg";
import envio from "../assets/envio.jpg";
import especial from "../assets/especial.jpg";

// ===== Styled Components =====
const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  padding: 1.5rem;
  text-align: center;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  width: 100%;
  justify-items: center;
`;

const CardWrapper = styled.div`
  width: 100%;
  max-width: 380px; 
`;

const ServicioImg = styled.img`
  width: 140px;
  height: 170px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const ServicioTitulo = styled.h5`
  color: #EA9E3D;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ServicioDescripcion = styled.p`
  color: #555;
  font-size: 0.95rem;
  margin-top: 0.5rem;
`;

const VolverBtn = styled(Link)`
  display: inline-block;
  background-color: #EA9E3D;
  color: white;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 3rem;

  &:hover {
    background-color: #d6872f;
    transform: translateY(-2px);
  }
`;

// ====== Componente Funcional ======
export default function Servicios() {
  const servicios = [
    {
      id: 1,
      img: atencion,
      titulo: "Atención Personalizada",
      descripcion: "Te ayudamos a encontrar las figuras, model kits o accesorios que buscás."
    },
    {
      id: 2,
      img: envio,
      titulo: "Envíos a Todo el País",
      descripcion: "Comprá desde cualquier lugar. Envíos rápidos y seguros con seguimiento."
    },
    {
      id: 3,
      img: especial,
      titulo: "Pedidos Especiales",
      descripcion: "Traemos figuras exclusivas desde Japón y EE.UU. por pedido."
    }
  ];

  return (
    <main className="main-container">
      <div className="container text-center">
        <h1 className="mb-3 fw-bold">Nuestros Servicios</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "700px", marginBottom: "6rem" }}>
          En nuestra tienda de anime te ofrecemos mucho más que productos: brindamos una experiencia completa para todos los fans.
        </p>

        <CardsRow>
          {servicios.map((s) => (
            <CardWrapper key={s.id}>
              <Card>
                <ServicioImg src={s.img} alt={s.titulo} />
                <ServicioTitulo>{s.titulo}</ServicioTitulo>
                <ServicioDescripcion>{s.descripcion}</ServicioDescripcion>
              </Card>
            </CardWrapper>
          ))}
        </CardsRow>

        <VolverBtn to="/">Volver al Inicio</VolverBtn>
      </div>
    </main>
  );
}
