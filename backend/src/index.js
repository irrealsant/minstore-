
import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Logging de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rotas de autenticação do Better Auth
// Isso cria todas as rotas automaticamente!
app.use("/api/auth", toNodeHandler(auth));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res.status(500).json({ error: err.message || "Erro interno" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`)
  console.log(`Status disponível em http://localhost:${PORT}/health`);
});