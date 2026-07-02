import * as CategoryModel from "../models/category.model.js";

function gerarSlug(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function listar(req, res) {
  const categorias = await CategoryModel.listarCategorias();
  return res.json(categorias);
}

export async function criar(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nome é obrigatório." });
  }

  const categoria = await CategoryModel.criarCategoria({
    name,
    slug: gerarSlug(name),
  });

  return res.status(201).json(categoria);
}

export async function deletar(req, res) {
  const { id } = req.params;
  await CategoryModel.deletarCategoria(id);
  return res.status(204).send();
}

export async function atualizar(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nome é obrigatório." });
  }

  const categoria = await CategoryModel.atualizarCategoria(id, {
    name,
    slug: gerarSlug(name),
  });

  return res.json(categoria);
}