// src/controllers/product.controller.js
import * as ProductModel from "../models/product.model.js";

// GET /products
export async function listar(req, res) {
  const produtos = await ProductModel.listarProdutos();
  return res.json(produtos);
}

// GET /products/:id
export async function buscar(req, res) {
  const { id } = req.params;
  const produto = await ProductModel.buscarProdutoPorId(id);

  if (!produto) {
    return res.status(404).json({ error: "Produto não encontrado." });
  }

  return res.json(produto);
}

// POST /products
export async function criar(req, res) {
  const { name, description, price, stock, categoryId, imageUrl } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ error: "Nome e preço são obrigatórios." });
  }

  const produto = await ProductModel.criarProduto({
    name,
    description,
    price,
    stock: stock ?? 0,
    categoryId: categoryId ?? null,
    imageUrl: imageUrl ?? null,
  });

  return res.status(201).json(produto);
}

// PUT /products/:id
export async function atualizar(req, res) {
  const { id } = req.params;
  const { name, description, price, stock, categoryId, imageUrl } = req.body;

  const existe = await ProductModel.buscarProdutoPorId(id);
  if (!existe) {
    return res.status(404).json({ error: "Produto não encontrado." });
  }

  const produto = await ProductModel.atualizarProduto(id, {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(price !== undefined && { price }),
    ...(stock !== undefined && { stock }),
    ...(categoryId !== undefined && { categoryId }),
    ...(imageUrl !== undefined && { imageUrl }),
  });

  return res.json(produto);
}

// DELETE /products/:id
export async function deletar(req, res) {
  const { id } = req.params;

  const existe = await ProductModel.buscarProdutoPorId(id);
  if (!existe) {
    return res.status(404).json({ error: "Produto não encontrado." });
  }

  await ProductModel.deletarProduto(id);
  return res.status(204).send();
}