"use client";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Bem-vindo ao seu painel</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total de Vendas</p>
          <p className="text-2xl font-bold mt-2">R$ 0,00</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Pedidos</p>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Clientes</p>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Atividade Recente</h2>
        <div className="text-center py-8">
          <p className="text-slate-500">Nenhuma atividade recente</p>
        </div>
      </div>
    </div>
  );
}