// src/routes/product.routes.js
import { Router } from "express";
import * as ProductController from "../controllers/product.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", ProductController.listar);
router.get("/:id", ProductController.buscar);
router.post("/", requireAuth, ProductController.criar);
router.put("/:id", requireAuth, ProductController.atualizar);
router.delete("/:id", requireAuth, ProductController.deletar);

export default router;