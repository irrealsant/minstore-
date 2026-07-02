import { Router } from "express";
import * as CategoryController from "../controllers/category.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", CategoryController.listar);
router.post("/", requireAuth, CategoryController.criar);
router.put("/:id", requireAuth, CategoryController.atualizar);
router.delete("/:id", requireAuth, CategoryController.deletar);

export default router;