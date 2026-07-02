import { prisma } from "../lib/prisma.js";

export async function listarCategorias() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function criarCategoria(data) {
  return prisma.category.create({ data });
}

export async function deletarCategoria(id) {
  return prisma.category.delete({ where: { id } });
}

export async function atualizarCategoria(id, data) {
  return prisma.category.update({ where: { id }, data });
}