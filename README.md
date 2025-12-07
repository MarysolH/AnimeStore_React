# AnimeStore – Proyecto Final React 
# Talento Tech 2025 - Comisión 25234

AnimeStore es una aplicación e-commerce. Permite visualizar productos, gestionar un carrito de compras, administrar productos mediante CRUD con MockAPI, manejar autenticación de usuarios y ofrecer una experiencia completa y responsiva.

---
## Vista previa del proyecto
<p align="center">
  <img src=".\src\assets\Inicio.png" width="750" alt="Vista previa del proyecto"/>
</p>

---
## Links del Proyecto

- **Repositorio GitHub:** [https://github.com/MarysolH/AnimeStore_React.git](https://github.com/MarysolH/AnimeStore_React.git)
- **Deploy en Vercel:** [https://anime-store-react.vercel.app/](https://anime-store-react.vercel.app/)

---
## Credenciales administrador
- **Nombre completo:** admin
- **Email:** 1234@admin

---
# Requerimiento #1: Gestión del Carrito y Autenticación

## Carrito de Compras (Context API)
- Implementado **CarritoContext**
- Agregar productos al carrito
- Eliminar productos individualmente
- Vaciar carrito
- Estado global con Context API
- Selector de cantidad en carrito y pago
- Cálculo de subtotal y total
- Modal lateral estilo e-commerce para visualizar carrito

---
## Autenticación de Usuarios
- Autenticación con **AuthContext**
- Login simulado con `localStorage`
- Token persistido
- Cierre de sesión con vaciado de carrito
- Rutas protegidas (carrito, pagar, CRUD)
- Redirecciones automáticas para usuarios no autenticados

---
# Requerimiento #2: CRUD de Productos (MockAPI)

## Alta de Productos
- Formulario controlado con `useState`
- Validaciones:
  - Nombre obligatorio  
  - Precio mayor a 0  
  - Descripción mínima de 10 caracteres  
  - Imagen requerida  
- Envío a MockAPI (POST)
- Notificaciones con Toastify

---
## Edición y Eliminación
- Editar productos desde formulario con datos precargados  
- Actualizar MockAPI (PUT)  
- Eliminar productos con modal de confirmación  
- Manejo de errores de red y validaciones  
- Loading states durante llamadas a la API  

---
# Requerimiento #3: Diseño y Responsividad

## Diseño Responsivo
- Uso de **Bootstrap** para grillas y layout
- Cards responsivas
- Modal lateral responsivo
- Diseño mobile-first

---
## Styled-components
- Componentes customizados  
- Estilos reutilizables y modulados  

---
## Interactividad Mejorada
- Iconos con **React Icons**  
- Alertas con **React Toastify**  
- Modal animado y limpio  

---

## SEO y Accesibilidad 
- Metadatos básicos para SEO  
 
---
# Requerimiento #4: Búsqueda y Paginación

## Búsqueda
- Barra de búsqueda con filtros por **nombre** o **categoría**
- Búsqueda en tiempo real (`onChange`)
- Resultados instantáneos

---
## Paginación
- Paginador funcional  
- Productos divididos en páginas  
- Navegación entre páginas sin perder estado  
- Mejora en la usabilidad del catálogo  

---
# Requerimiento #5: Preparación para el Despliegue

## Pruebas de Compatibilidad
- Probado en:  
  - Chrome  
  - Edge  
  - Firefox  
- Responsive en móvil, tablet y escritorio  

---
## Optimización del Código
- Eliminación de archivos innecesarios  
- Estados globales optimizados  
- Componentes reutilizables  

---
# Tecnologías y Librerías Utilizadas

### **React + Vite**

### Librerías principales:
- **React Router DOM** → rutas protegidas, navegación  
- **Bootstrap 5** → grillas, botones, layout  
- **React Icons** → íconos  
- **React Toastify** → alertas  
- **Styled-components** → estilos personalizados  
- **Axios o fetch** → comunicación con MockAPI  
- **Context API** → carrito + autenticación  
- **localStorage** → persistencia  

---
# Estructura del Proyecto
```bash
📁 src
 ├── 📁 assets
 │    ├── 📄 imagenes.jpg
 │
 ├── 📄 productos.json
 │
 ├── 📁 components
 │    ├── 📄 CarritoModal.jsx
 │    ├── 📄 EliminarProducto.jsx
 │    ├── 📄 FormularioProducto.jsx
 │
 ├── 📁 context
 │    ├── 📄 CarritoContext.jsx
 │    ├── 📄 CartContext.jsx
 │    ├── 📄 ProductsContext.jsx
 ├── 📁 pages
 │    ├── 📄 Dashboard.jsx
 │    ├── 📄 DetalleProducto.jsx
 │    ├── 📄 Footer.jsx
 │    ├── 📄 IniciarSesion.jsx
 │    ├── 📄 Inicio.jsx
 │    ├── 📄 Navbar.jsx
 │    ├── 📄 Pagar.jsx
 │    ├── 📄 Productos.jsx
 │    ├── 📄 RutaProtegida.jsx
 │    ├── 📄 Servicios.jsx │
 │ 
 ├── 📄 App.jsx
 ├── 📄 main.jsx
 └── 📄 index.css
```
---
## Dependencias instaladas
```bash
npm install bootstrap
npm install bootstrap-icons
npm install react-toastify
npm install react-router-dom
npm install styled-components
```
---
# Instalación y Ejecución

## Clonar repositorio
```bash
git clone https://github.com/tu-usuario/AnimeStore.git

cd AnimeStore
```

## Instalar dependencias 
```bash
npm install
```

## Ejecutar el proyecto
```bash
npm run dev
```
**Abrir la app:** [http://localhost:5173/](http://localhost:5173/)

---
## Despliegue en Vercel

El proyecto está preparado y desplegado en **Vercel**.

###  Pasos utilizados para el despliegue

1. Subir el proyecto a **GitHub**  
2. Entrar a **Vercel** → *Import Project*  
3. Seleccionar el repositorio  
4. Vercel detecta automáticamente que es un proyecto **Vite**  
5. Configuración por defecto:  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`  
6. Click en **Deploy**  
7. Obtener la **URL pública** generada por Vercel  

Cada vez que se hace un **push a la rama `main`**, Vercel reconstruye y despliega automáticamente la aplicación.


# Desarrollado por 
## Marysol Haedo
<p align="center">
  <img src="https://t3.ftcdn.net/jpg/07/41/57/52/360_F_741575203_mEjveFX3gZtflUwlOUoqIYTq2BCRUcw8.jpg" width="420" alt="Anime banner"/>
</p>
