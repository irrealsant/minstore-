"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const API = "http://localhost:4000";

const emptyProductForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  categoryId: "",
  imageUrl: "",
};

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);

  // Categoria
  const [catForm, setCatForm] = useState({ name: "" });
  const [catEditingId, setCatEditingId] = useState(null);
  const [catSaving, setCatSaving] = useState(false);
  const [catError, setCatError] = useState("");

  // Produto
  const [prodForm, setProdForm] = useState(emptyProductForm);
  const [prodEditingId, setProdEditingId] = useState(null);
  const [prodSaving, setProdSaving] = useState(false);
  const [prodError, setProdError] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoadingLists(true);
    try {
      const [catsRes, prodsRes] = await Promise.all([
        fetch(`${API}/categories`),
        fetch(`${API}/products`),
      ]);
      setCategories(await catsRes.json());
      setProducts(await prodsRes.json());
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoadingLists(false);
    }
  }

  // ---------- Categorias ----------

  function handleEditCategory(cat) {
    setCatEditingId(cat.id);
    setCatForm({ name: cat.name });
    setCatError("");
  }

  function handleCancelEditCategory() {
    setCatEditingId(null);
    setCatForm({ name: "" });
    setCatError("");
  }

  async function handleSubmitCategory(e) {
    e.preventDefault();
    setCatError("");
    setCatSaving(true);

    try {
      const isEditing = !!catEditingId;
      const url = isEditing
        ? `${API}/categories/${catEditingId}`
        : `${API}/categories`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(catForm),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ||
            (isEditing ? "Erro ao atualizar categoria." : "Erro ao criar categoria.")
        );
      }

      setCatForm({ name: "" });
      setCatEditingId(null);
      await fetchAll();
    } catch (err) {
      setCatError(err.message);
    } finally {
      setCatSaving(false);
    }
  }

  async function handleDeleteCategory(id) {
    if (!confirm("Excluir esta categoria?")) return;

    try {
      const res = await fetch(`${API}/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erro ao excluir categoria.");
      if (catEditingId === id) handleCancelEditCategory();
      await fetchAll();
    } catch (err) {
      alert(err.message);
    }
  }

  // ---------- Produtos ----------

  function handleEditProduct(prod) {
    setProdEditingId(prod.id);
    setProdForm({
      name: prod.name ?? "",
      description: prod.description ?? "",
      price: prod.price ?? "",
      stock: prod.stock ?? "",
      categoryId: prod.categoryId ?? "",
      imageUrl: prod.imageUrl ?? "",
    });
    setProdError("");
  }

  function handleCancelEditProduct() {
    setProdEditingId(null);
    setProdForm(emptyProductForm);
    setProdError("");
  }

  async function handleSubmitProduct(e) {
    e.preventDefault();
    setProdError("");
    setProdSaving(true);

    try {
      const isEditing = !!prodEditingId;
      const url = isEditing
        ? `${API}/products/${prodEditingId}`
        : `${API}/products`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: prodForm.name,
          description: prodForm.description || null,
          price: Number(prodForm.price),
          stock: Number(prodForm.stock) || 0,
          categoryId: prodForm.categoryId || null,
          imageUrl: prodForm.imageUrl || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ||
            (isEditing ? "Erro ao atualizar produto." : "Erro ao criar produto.")
        );
      }

      setProdForm(emptyProductForm);
      setProdEditingId(null);
      await fetchAll();
    } catch (err) {
      setProdError(err.message);
    } finally {
      setProdSaving(false);
    }
  }

  async function handleDeleteProduct(id) {
    if (!confirm("Excluir este produto?")) return;

    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erro ao excluir produto.");
      if (prodEditingId === id) handleCancelEditProduct();
      await fetchAll();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="size-4" />
        Voltar para o início
      </Link>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>
              {catEditingId ? "Editar Categoria" : "Nova Categoria"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitCategory} className="flex flex-col gap-4">
              <FieldGroup>
                {catError && (
                  <p className="text-sm text-red-500">{catError}</p>
                )}
                <Field>
                  <FieldLabel htmlFor="cat-name">Nome</FieldLabel>
                  <Input
                    id="cat-name"
                    placeholder="Ex: Eletrônicos"
                    required
                    value={catForm.name}
                    onChange={(e) => setCatForm({ name: e.target.value })}
                  />
                </Field>
                <div className="flex gap-2">
                  <Button type="submit" disabled={catSaving} className="flex-1">
                    {catSaving
                      ? "Salvando..."
                      : catEditingId
                        ? "Salvar Alterações"
                        : "Criar Categoria"}
                  </Button>
                  {catEditingId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEditCategory}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </FieldGroup>
            </form>

            <div className="mt-6 flex flex-col gap-2">
              {loadingLists && (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              )}
              {!loadingLists && categories.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhuma categoria cadastrada.
                </p>
              )}
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                >
                  <span>{cat.name}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditCategory(cat)}
                      className="text-slate-700 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Produtos */}
        <Card>
          <CardHeader>
            <CardTitle>
              {prodEditingId ? "Editar Produto" : "Novo Produto"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitProduct} className="flex flex-col gap-4">
              <FieldGroup>
                {prodError && (
                  <p className="text-sm text-red-500">{prodError}</p>
                )}
                <Field>
                  <FieldLabel htmlFor="prod-name">Nome</FieldLabel>
                  <Input
                    id="prod-name"
                    required
                    value={prodForm.name}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, name: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="prod-description">Descrição</FieldLabel>
                  <Input
                    id="prod-description"
                    value={prodForm.description}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, description: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="prod-price">Preço (R$)</FieldLabel>
                  <Input
                    id="prod-price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={prodForm.price}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, price: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="prod-stock">Estoque</FieldLabel>
                  <Input
                    id="prod-stock"
                    type="number"
                    min="0"
                    value={prodForm.stock}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, stock: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="prod-category">Categoria</FieldLabel>
                  <select
                    id="prod-category"
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                    value={prodForm.categoryId}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, categoryId: e.target.value })
                    }
                  >
                    <option value="">Sem categoria</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="prod-image">URL da Imagem</FieldLabel>
                  <Input
                    id="prod-image"
                    placeholder="https://..."
                    value={prodForm.imageUrl}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, imageUrl: e.target.value })
                    }
                  />
                </Field>
                <div className="flex gap-2">
                  <Button type="submit" disabled={prodSaving} className="flex-1">
                    {prodSaving
                      ? "Salvando..."
                      : prodEditingId
                        ? "Salvar Alterações"
                        : "Criar Produto"}
                  </Button>
                  {prodEditingId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEditProduct}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </FieldGroup>
            </form>

            <div className="mt-6 flex flex-col gap-2">
              {loadingLists && (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              )}
              {!loadingLists && products.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhum produto cadastrado.
                </p>
              )}
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
                >
                  <div>
                    <p className="font-medium">{prod.name}</p>
                    <p className="text-xs text-muted-foreground">
                      R$ {Number(prod.price).toFixed(2)} · Estoque:{" "}
                      {prod.stock}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditProduct(prod)}
                      className="text-slate-700 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}