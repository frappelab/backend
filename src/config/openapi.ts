import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

export const openApiSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Projects",
      version: "1.0.0",
      description: "Documentación de endpoints de la API",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Servidor local",
      },
      {
        url: "https://collaborate-ook5.onrender.com/api/v1",
        description: "Servidor Producción",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingresa el token JWT en formato Bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "../modules/**/*.routes.{ts,js}")],
});