import { NextResponse } from "next/server";

const rotasPrivadas = ["/dashboard", "/links"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  const estaLogado = !!sessionToken;

  if (!estaLogado && rotasPrivadas.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/relatorio/:path*"],
};