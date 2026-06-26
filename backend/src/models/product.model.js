// src/models/product.model.js
import { prisma } from "../lib/prisma.js";

export async function listarProdutos() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });
}

export async function buscarProdutoPorId(id) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function criarProduto(data) {
  return prisma.product.create({
    data,
    include: { category: true },
  });
}

export async function atualizarProduto(id, data) {
  return prisma.product.update({
    where: { id },
    data,
    include: { category: true },
  });
}

export async function deletarProduto(id) {
  return prisma.product.delete({ where: { id } });
}