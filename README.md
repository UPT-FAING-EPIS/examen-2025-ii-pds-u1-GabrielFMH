[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/A-aUFMBb)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=20616860)


nombre: Gabriel Melendez Huarachi
link del ulimo despligue: https://frontend-bv1uqqswi-gabriel-melendezs-projects-915f013d.vercel.app/

# Sistema de Gestión de Asistencia

Una aplicación completa para la gestión de asistencia estudiantil con interfaz de tutor y estudiante.



## 🚀 Características

- **Interfaz de Tutor**: Gestión completa de cursos, sesiones y asistencia
- **Interfaz de Estudiante**: Registro de asistencia simple
- **API REST**: Backend en .NET 8.0 con Entity Framework
- **Base de Datos**: SQLite para desarrollo
- **Frontend**: React con TypeScript
- **Autenticación**: Selección de rol (estudiante/tutor)
- **Internacionalización**: Interfaz completamente en español

## 📋 Prerrequisitos

- **.NET 8.0 SDK** - [Descargar aquí](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 20+** - [Descargar aquí](https://nodejs.org/)
- **Git** - Para clonar el repositorio

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/examen-2025-ii-pds-u1-GabrielFMH.git
cd examen-2025-ii-pds-u1-GabrielFMH
```

### 2. Configurar el Backend

```bash
# Navegar al directorio del backend
cd backend

# Restaurar dependencias
dotnet restore

# Ejecutar migraciones de base de datos (crea la base de datos SQLite)
dotnet ef database update

# Verificar que compile
dotnet build
```

### 3. Configurar el Frontend

```bash
# Navegar al directorio del frontend
cd ../frontend

# Instalar dependencias
npm install

# Verificar que compile
npm run build
```

## 🚀 Ejecutar la Aplicación

### Opción 1: Ejecutar Backend y Frontend por separado

#### Terminal 1 - Backend (.NET API)
```bash
cd backend
dotnet run
```
El backend estará disponible en: `http://localhost:5238`

#### Terminal 2 - Frontend (React)
```bash
cd frontend
npm start
```
El frontend estará disponible en: `http://localhost:3000`

### Opción 2: Ejecutar con scripts

#### Windows (PowerShell)
```powershell
# Ejecutar backend
Start-Process -FilePath "dotnet" -ArgumentList "run" -WorkingDirectory "backend"

# Ejecutar frontend
Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory "frontend"
```

#### Linux/Mac
```bash
# Terminal 1 - Backend
cd backend && dotnet run &

# Terminal 2 - Frontend
cd frontend && npm start &
```

## 🔧 Configuración

### Variables de Entorno

#### Backend
El backend usa configuración por defecto. Para personalizar:

- **Base de datos**: Modificar `appsettings.json` o variables de entorno
- **Puerto**: El backend corre en `http://localhost:5238` por defecto

#### Frontend
El frontend está configurado para conectarse al backend en `http://localhost:5238`. Para cambiar:

```javascript
// frontend/src/services/api.ts
const API_BASE_URL = 'http://localhost:5238/api'; // Cambiar si es necesario
```

## 📱 Uso de la Aplicación

### 1. Acceso Inicial
- Abrir `http://localhost:3000` en el navegador
- Seleccionar rol: **Estudiante** o **Tutor**

### 2. Como Estudiante
- Ingresar **Nombre** y **DNI**
- Seleccionar sesión disponible
- Registrar asistencia

### 3. Como Tutor
- Gestionar **Cursos**: Crear, ver cursos
- Gestionar **Sesiones**: Crear sesiones para cursos
- Gestionar **Asistencia**: Ver y actualizar asistencia de estudiantes
- Ver **Reportes**: Reportes de asistencia por curso/estudiante

## 🧪 Ejecutar Pruebas

### Backend - Pruebas Unitarias
```bash
cd backend
dotnet test
```

### Frontend - Pruebas
```bash
cd frontend
npm test
```

## 📦 Despliegue

### Producción

#### Backend - Railway
```bash
# Configurar secrets en GitHub:
# RAILWAY_API_KEY
# RAILWAY_PROJECT_ID
# RAILWAY_SERVICE_ID
```

#### Frontend - Vercel
```bash
# Configurar secrets en GitHub:
# VERCEL_TOKEN
```

### Desarrollo Local con Docker

```bash
# Construir imágenes
docker build -t attendance-backend ./backend
docker build -t attendance-frontend ./frontend

# Ejecutar contenedores
docker run -p 5238:80 attendance-backend
docker run -p 3000:80 attendance-frontend
```

## 🏗️ Arquitectura

```
├── backend/                 # API .NET 8.0
│   ├── Controllers/         # Controladores REST API
│   ├── Models/             # Modelos de datos
│   ├── Data/               # Contexto de base de datos
│   └── Tests/              # Pruebas unitarias
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # Servicios API
│   │   └── types/          # Definiciones TypeScript
│   └── public/             # Archivos estáticos
└── .github/workflows/      # CI/CD con GitHub Actions
```

## 🔒 Seguridad

- Validación de entrada en todos los endpoints
- Protección contra inyección SQL con Entity Framework
- CORS configurado para desarrollo
- Autenticación por rol (estudiante/tutor)

## 📊 Base de Datos

### Esquema
- **Students**: Información de estudiantes (ID, Name, Email, DNI)
- **Courses**: Cursos disponibles (ID, Name, Description, InstructorId)
- **Sessions**: Sesiones de clase (ID, CourseId, Date, Topic)
- **Attendance**: Registros de asistencia (ID, SessionId, StudentId, Status)

### Migraciones
```bash
cd backend
dotnet ef migrations add MigrationName
dotnet ef database update
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- Crear issue en GitHub
- Revisar documentación en `/docs`
- Contactar al equipo de desarrollo
