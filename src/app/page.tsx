"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 p-10 text-center">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl max-w-lg w-full p-10">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-900">
          Bem-vindo à Plataforma de Cursos!
        </h1>

        {loading ? (
          <p className="text-lg text-gray-700">Carregando...</p>
        ) : session ? (
          <>
            <p className="text-2xl mb-8 text-gray-800">
              Olá,{" "}
              <strong className="font-semibold text-indigo-600">
                {session.user?.name || session.user?.email}
              </strong>
              !
            </p>

            <div className="flex flex-col gap-6">
              <Link href="/products" className="w-full">
                <Button className="w-full py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition">
                  Ver Cursos
                </Button>
              </Link>

              <Button
                variant="secondary"
                onClick={() => signOut()}
                className="w-full py-4 text-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
              >
                Sair
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-lg text-gray-700 mb-4">
              Faça login para acessar nossos cursos.
            </p>

            <Button
              className="w-full py-4 text-lg font-semibold bg-gray-900 hover:bg-gray-800 transition"
              onClick={() => signIn("github")}
            >
              Entrar com GitHub
            </Button>

            <Button
              className="w-full py-4 text-lg font-semibold bg-red-600 hover:bg-red-700 transition"
              onClick={() => signIn("google")}
            >
              Entrar com o Google
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
