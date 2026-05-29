
import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Rotas de autenticação do Better Auth
// Isso cria todas as rotas automaticamente!
app.use("/api/auth", toNodeHandler(auth));

// Rota raiz
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend running",
    endpoints: {
      health: "GET /health",
      auth: "POST /api/auth/sign-up, /api/auth/sign-in, etc"
    }
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`)
  console.log(`Status disponível em http://localhost:${PORT}/health`);
});