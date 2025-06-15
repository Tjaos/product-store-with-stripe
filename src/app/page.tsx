"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 text-center">
      <h1 className="text-4xl font-bold mb-6">
        Bem-vindo à Plataforma de Cursos!
      </h1>

      {loading ? (
        <p>Carregando...</p>
      ) : session ? (
        <>
          <p className="text-xl mb-4">
            Olá, <strong>{session.user?.name || session.user?.email}</strong>!
          </p>

          <div className="space-y-4">
            {/* Aqui você pode verificar se o usuário está assinado */}
            <Link href="/products">
              <Button>Ver Cursos</Button>
            </Link>

            <Button variant="secondary" onClick={() => signOut()}>
              Sair
            </Button>
          </div>
        </>
      ) : (
        <div className=" flex flex-col p-5 items-center justify-center space-y-3">
          <p className="text-lg mb-6">Faça login para acessar nossos cursos.</p>

          <Button
            className="p-5 bg-gray-800 text-white text-lg"
            onClick={() => signIn("github")}
          >
            Entrar com GitHub
          </Button>
          <Button
            className="p-5 bg-red-600 text-white text-lg"
            onClick={() => signIn("google")}
          >
            Entrar com o Google
          </Button>
        </div>
      )}
    </main>
  );
}
