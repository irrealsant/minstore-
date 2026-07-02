"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SiteHeader() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="flex items-center gap-4 text-sm">
      <Link href="/products" className="text-slate-700">Produtos</Link>
      <Link href="/cart" className="text-slate-700">Carrinho</Link>

      {!isPending && session?.user ? (
        <>
          <Link href="/dashboard" className="text-slate-700">Dashboard</Link>
          <button
            onClick={handleLogout}
            className="rounded-md bg-slate-900 px-3 py-1 text-white"
          >
            Sair
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="text-slate-700">Login</Link>
          <Link href="/register" className="rounded-md bg-slate-900 px-3 py-1 text-white">
            Cadastro
          </Link>
        </>
      )}
    </nav>
  );
}