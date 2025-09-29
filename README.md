# 🛠️ Proyecto Backend – NestJS + TypeORM + PostgreSQL

Este proyecto consiste en una **API RESTful** creada con **NestJS**, empleando **TypeORM** como ORM, **PostgreSQL** como motor de base de datos y documentada mediante **Swagger**.  

La aplicación ofrece funcionalidades para:  
- Administración de usuarios.  
- Autenticación con **JWT**.  
- Autorización por roles.  
- Gestión de productos y órdenes en un e-commerce.  
- Carga de imágenes de productos (solo administradores) utilizando **Cloudinary**.  

---

## 📌 Tecnologías principales  

### ⚙️ Framework / Backend  
- NestJS (core, common, platform-express, config, mapped-types)  

### 🗄️ Base de datos / ORM  
- PostgreSQL  
- TypeORM  
- @nestjs/typeorm  

### 🔐 Autenticación y seguridad  
- JWT (@nestjs/jwt)  
- bcrypt  

### ✅ Validación y transformación de datos  
- class-validator  
- class-transformer  

### 📖 Documentación de la API  
- Swagger (@nestjs/swagger, swagger-ui-express)  

### 🖼️ Gestión de archivos / Multimedia  
- Cloudinary (cloudinary, buffer-to-stream)  

### 🌱 Variables de entorno  
- dotenv  

### 🔧 Utilidades  
- reflect-metadata  
- rxjs  

### 💻 Desarrollo  
- TypeScript  
- ts-node  
- ESLint + Prettier  
- tsconfig-paths  

---

## 🚀 Instalación y ejecución  

1. **Clonar el repositorio**  
```bash
git clone https://github.com/Natalia-Barragan/ecommerceM4.git
cd ecommerceM4
```

2. **Instalar dependencias**  
```bash
npm install
```

3. **Configurar variables de entorno**  
Crear un archivo `.env` con el siguiente contenido:  
```env
PORT=3000

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=mi_base_de_datos

# JWT
JWT_SECRET=mi_clave_secreta

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

4. **Levantar el servidor en modo desarrollo**  
```bash
npm run start:dev
```

---

## 📚 Documentación de la API  

Con el servidor en ejecución, la documentación de endpoints, schemas y DTOs está disponible en:  
👉 [http://localhost:3000/api](http://localhost:3000/api)  

---

## 👩‍💻 Autora  

Este proyecto fue desarrollado por **Natalia Barragán**.  
La API y este README fueron elaborados como parte del **Módulo 4**, con el fin de afianzar los conocimientos adquiridos en NestJS, TypeORM y PostgreSQL.  
