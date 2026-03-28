# FitHub API

Backend y base de datos para la plataforma de gestión de centros deportivos **FitHub**.

## Tecnologías

- **Runtime:** Node.js
- **Framework:** Express 5
- **Base de datos:** PostgreSQL (Supabase)
- **Driver:** node-postgres (pg)

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- Una base de datos PostgreSQL (se recomienda [Supabase](https://supabase.com/))

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/DavidECerros/fithub_proyect_db.git
cd fithub_proyect_db
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DATABASE_URL=postgresql://usuario:password@host:puerto/nombre_db
PORT=3000
```

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `DATABASE_URL` | Cadena de conexión a la base de datos PostgreSQL | Sí |
| `PORT` | Puerto en el que correrá el servidor (por defecto 3000) | No |

4. Ejecutar los scripts SQL en la base de datos, en este orden:

```bash
# Primero el esquema (tablas)
psql $DATABASE_URL -f sql/schema.sql

# Luego los datos de prueba
psql $DATABASE_URL -f sql/seed.sql
```

O bien, copiar y ejecutar el contenido de cada archivo directamente en el editor SQL de Supabase.

5. Iniciar el servidor:

```bash
node index.js
```

El servidor estará disponible en `http://localhost:3000`.

## Estructura del proyecto

```
fithub_proyect_db/
├── docs/               # Diagramas (Chen, Crow's Foot, BD)
├── postman/            # Colección y entorno de Postman
├── routes/
│   ├── actividades.js  # Rutas de actividades
│   ├── pagos.js        # Rutas de pagos
│   ├── personas.js     # Rutas de personas
│   └── reservas.js     # Rutas de reservas
├── sql/
│   ├── schema.sql      # DDL - Creación de tablas
│   └── seed.sql        # DML - Datos de prueba
├── db.js               # Configuración de conexión a BD
├── errorHandler.js     # Middleware de manejo de errores
├── index.js            # Punto de entrada del servidor
├── package.json
└── .env                # Variables de entorno (no se sube al repo)
```

## Endpoints de la API

Base URL: `http://localhost:3000`

### Personas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/personas` | Listar todas las personas |
| GET | `/api/personas/:id` | Obtener persona por ID |
| POST | `/api/personas` | Crear una persona |
| PUT | `/api/personas/:id` | Actualizar una persona |
| DELETE | `/api/personas/:id` | Eliminar una persona |

### Actividades

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/actividades` | Listar todas las actividades |
| GET | `/api/actividades/:id` | Obtener actividad por ID |
| POST | `/api/actividades` | Crear una actividad |
| PUT | `/api/actividades/:id` | Actualizar una actividad |
| DELETE | `/api/actividades/:id` | Eliminar una actividad |

### Reservas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/reservas` | Listar todas las reservas |
| GET | `/api/reservas/:id` | Obtener reserva por ID |
| POST | `/api/reservas` | Crear una reserva |
| PUT | `/api/reservas/:id` | Actualizar una reserva |
| DELETE | `/api/reservas/:id` | Eliminar una reserva |

### Pagos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/pagos` | Listar todos los pagos |
| GET | `/api/pagos/:id_reserva/:num_pago` | Obtener pago específico |
| POST | `/api/pagos` | Crear un pago |
| PUT | `/api/pagos/:id_reserva/:num_pago` | Actualizar un pago |
| DELETE | `/api/pagos/:id_reserva/:num_pago` | Eliminar un pago |

## Pruebas con Postman

1. Importar la colección desde `postman/FitHub.postman_collection.json`.
2. Importar el entorno desde `postman/FitHub.postman_environment.json`.
3. Asegurarse de que la variable `baseUrl` apunte a `http://localhost:3000`.
4. Ejecutar las peticiones organizadas por carpeta (POST, GET, PUT, DELETE).

## Base de datos

La base de datos contiene las siguientes tablas:

- **persona** - Datos generales de usuarios (generalización)
- **cliente** - Clientes registrados (especialización de persona)
- **empleado** - Empleados del centro (especialización de persona)
- **telefono_persona** - Teléfonos de contacto (atributo multivaluado)
- **centro_deportivo** - Centros deportivos disponibles
- **actividad** - Actividades ofrecidas por los centros
- **imparte** - Relación empleado-actividad (entidad asociativa)
- **membresia** - Membresías de los clientes
- **reserva** - Reservas de actividades
- **pago** - Pagos asociados a reservas

## Equipo

| Integrante | Rol BD | Rol Backend |
|------------|--------|-------------|
| Osman Neptalio Mejia Diaz | Modelo Conceptual (Chen) | Arquitectura inicial |
| David Enrique Cerros Lopez | Modelo Lógico y DDL | Servicio CREATE (POST) |
| Jorge Alberto Pineda Castellanos | Población de datos (seed) | Servicio READ (GET) |
| Mario David Soler Sabillon | Diagrama final de BD | Servicio UPDATE (PUT/PATCH) |
| Mario Tadeo Tabora Martinez | README e integración | Servicio DELETE, Postman |
