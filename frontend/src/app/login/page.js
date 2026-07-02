// frontend/src/app/login/page.js
import LoginForm from "@/components/ui/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}