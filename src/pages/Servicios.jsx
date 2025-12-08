import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import atencion from "../assets/atencion.jpg";
import envio from "../assets/envio.jpg";
import especial from "../assets/especial.jpg";

// ===== Styled Components =====
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
`;

const Title = styled.h1`
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #555;
  max-width: 700px;
  text-align: center;
  margin-bottom: 4rem;
`;

const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  justify-items: stretch;
  align-items: stretch; /* estira todas las filas a la misma altura */
`;

const CardWrapper = styled.div`
  width: 100%;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

// Contenedor del contenido de la card
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ServicioImg = styled.img`
  width: 140px;
  height: 170px;
  min-height: 170px;   /* fuerza que todas las imágenes tengan la misma altura */
  object-fit: cover;    /* mantiene proporción y evita huecos */
  border-radius: 10px;
  margin-bottom: 1rem;
  align-self: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
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
  flex-grow: 1; /* ayuda a que todas las cards tengan altura uniforme */
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  width: 100%;
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

  &:hover {
    background-color: #d6872f;
    transform: translateY(-2px);
  }
`;

// ===== Componente Funcional =====
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
    <MainContainer>
      <Title>Nuestros Servicios</Title>
      <Subtitle>
        En nuestra tienda de anime te ofrecemos mucho más que productos: brindamos una experiencia completa para todos los fans.
      </Subtitle>

      <CardsRow>
        {servicios.map((s) => (
          <CardWrapper key={s.id}>
            <Card>
              <CardContent>
                <ServicioImg src={s.img} alt={s.titulo} />
                <TextWrapper>
                  <ServicioTitulo>{s.titulo}</ServicioTitulo>
                  <ServicioDescripcion>{s.descripcion}</ServicioDescripcion>
                </TextWrapper>
              </CardContent>
            </Card>
          </CardWrapper>
        ))}
      </CardsRow>

      <ButtonWrapper>
        <VolverBtn to="/">Volver al Inicio</VolverBtn>
      </ButtonWrapper>
    </MainContainer>
  );
}
