"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-10 text-center bg-gray-50">
      <h1 className="text-3xl sm:text-5xl font-bold mb-8 max-w-lg leading-tight">
        Bem-vindo à Plataforma de Cursos!
      </h1>

      {loading ? (
        <p className="text-gray-700">Carregando...</p>
      ) : session ? (
        <>
          <p className="text-xl mb-6">
            Olá, <strong>{session.user?.name || session.user?.email}</strong>!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="w-full sm:w-auto" asChild>
              <a href="/products">Ver Cursos</a>
            </Button>

            <Button
              variant="secondary"
              onClick={() => signOut()}
              className="w-full sm:w-auto"
            >
              Sair
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5 w-full max-w-xs">
          <p className="text-lg mb-4">Faça login para acessar nossos cursos.</p>

          <Button
            className="w-full bg-gray-800 text-white text-lg"
            onClick={() => signIn("github")}
          >
            Entrar com GitHub
          </Button>

          <Button
            className="w-full bg-red-600 text-white text-lg"
            onClick={() => signIn("google")}
          >
            Entrar com o Google
          </Button>
        </div>
      )}
    </main>
  );
}
