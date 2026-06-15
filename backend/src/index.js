
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { prisma } from "./lib/prisma.js";
import { toNodeHandler } from "better-auth/node";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
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
      auth: "POST /api/auth/sign-up, /api/auth/sign-in, etc",
      products: "GET /products"
    }
  });
});

// Rota de produtos
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });
    
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
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