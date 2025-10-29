# UnClickMas - Documentación Frontend

## Descripción General

UnClickMas es una aplicación web de juego competitivo donde los usuarios compiten por acumular la mayor cantidad de clicks. El frontend está desarrollado con React y proporciona una interfaz moderna y responsiva para la interacción del usuario.

## Arquitectura del Proyecto

### Estructura de Carpetas

```
frontend/
├── public/                 # Archivos públicos estáticos
├── src/
│   ├── components/
│   │   ├── Auth/          # Componentes de autenticación
│   │   ├── Game/          # Componentes del juego
│   │   ├── Layout/        # Componentes de layout
│   │   ├── Leaderboard/   # Componentes de clasificación
│   │   └── Profile/       # Componentes de perfil
│   ├── context/           # Context API para estado global
│   ├── services/          # Servicios de API y configuración
│   ├── App.js             # Componente raíz con enrutamiento
│   ├── index.js           # Punto de entrada
│   └── index.css          # Estilos globales
├── .env                   # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

### Patrón de Arquitectura

La aplicación sigue una arquitectura basada en componentes con las siguientes capas:

1. **Capa de Presentación**: Componentes React organizados por funcionalidad
2. **Capa de Estado**: Context API para gestión de estado global (autenticación)
3. **Capa de Servicios**: Servicios de API centralizados con Axios
4. **Capa de Enrutamiento**: React Router para navegación entre vistas

## Librerías Utilizadas

### Dependencias Principales

#### **React (v18.2.0)**
- **Propósito**: Framework principal para construir la interfaz de usuario

#### **React Router DOM (v6.20.0)**
- **Propósito**: Manejo de rutas y navegación en la aplicación

#### **Axios (v1.6.0)**
- **Propósito**: Cliente HTTP para comunicación con el backend

#### **Bootstrap (v5.3.0)**
- **Propósito**: Framework CSS para diseño responsivo

#### **SweetAlert2 (v11.10.0)**
- **Propósito**: Biblioteca para alertas y notificaciones elegantes

#### **@vercel/speed-insights (v1.2.0)**
- **Propósito**: Monitoreo de rendimiento de la aplicación

## Configuración

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto frontend:

```properties
REACT_APP_API_URL=https://tu-backend.com/api/users
```

## Componentes Principales

### GameButton
- Componente principal del juego
- Maneja clicks y actualización de puntos
- Auto-guardado cada 10 clicks
- Muestra estadísticas en tiempo real

### Leaderboard
- Muestra los top 10 jugadores
- Destaca la posición del usuario actual
- Actualización manual del ranking
- Badges especiales para top 3

### Profile
- Estadísticas detalladas del usuario
- Posición global y progreso
- Cálculo de puntos necesarios para siguiente posición

## Instalación y Ejecución

### Paso a Paso

```bash
# 1. Navegar a la carpeta del frontend
cd frontend

# 2. Configurar variables de entorno
.env

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm start
```

