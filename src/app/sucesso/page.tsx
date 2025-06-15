import Link from "next/link";

export default function SucessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-semibold text-green-600 mb-4">
        Pagamento realizado com sucesso!
      </h1>
      <p className="text-lg">
        Obrigado pela sua assinatura, desfrute do seu acesso a todos os cursos!
        Quaisquer dúvidas entre em contato.
      </p>
      <p>
        <Link className="text-lg text-blue-800 font-bold" href="/products">
          Acessar cursos
        </Link>
      </p>
    </div>
  );
}
