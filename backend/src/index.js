import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { requireAuth } from "./middleware/auth.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", toNodeHandler(auth));

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    message: "Bem-vindo ao seu perfil!",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Backend running",
    endpoints: {
      health: "GET /health",
      auth: "POST /api/auth/sign-up, /api/auth/sign-in, etc",
      products: {
        list: "GET    /products",
        getOne: "GET    /products/:id",
        create: "POST   /products        (requer login)",
        update: "PUT    /products/:id    (requer login)",
        delete: "DELETE /products/:id    (requer login)",
      },
      categories: {
        list: "GET    /categories",
        create: "POST   /categories      (requer login)",
        delete: "DELETE /categories/:id  (requer login)",
      },
      me: "GET /api/me (requer login)",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`);
  console.log(`Status disponível em http://localhost:${PORT}/health`);
});