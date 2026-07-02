// frontend/src/app/register/page.js
import RegisterForm from "@/components/ui/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}