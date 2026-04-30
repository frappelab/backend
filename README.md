# 🚀 Backend API - Node.js + Express + MongoDB

API REST construida con **Node.js**, **Express**, **MongoDB** y **TypeScript**, siguiendo buenas prácticas como arquitectura modular, validaciones con Zod, documentación con Swagger y autenticación con JWT.

---

## 📦 Tecnologías utilizadas

- Node.js
- Express 5
- MongoDB
- TypeScript
- JWT (jsonwebtoken) → Autenticación
- bcrypt → Encriptación de contraseñas
- Zod → Validación de datos
- Swagger (OpenAPI) → Documentación de API
- Helmet → Seguridad HTTP
- CORS
- Morgan → Logging

---

## 📁 Estructura del proyecto

```bash
src/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── projects/
│   ├── tasks/
│   └── comments/
│
├── config/
├── middlewares/
├── routes/
├── database/
└── server.ts
```

---

## ⚙️ Instalación

```bash
git clone https://github.com/frappelab/backend.git
cd backend
npm install
```

## 🏃‍♂️ Ejecución

```bash
npm run build
npm start
```

---

## 🔐 Autenticación

Usa JWT:

```
Authorization: Bearer <token>
```

---

## 📚 Swagger

```
https://collaborate-ook5.onrender.com/api/v1/docs/
```

---

## 📊 Scripts

```bash
npm run build
npm start
```

---

## 👨‍💻 Autor

Carlos Andrés Hernández Vega
