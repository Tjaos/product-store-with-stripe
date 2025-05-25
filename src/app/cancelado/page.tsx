import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-semibold text-red-600 mb-4">
        Pagamento Cancelado
      </h1>
      <p className="text-lg">
        Você cancelou opagamento. Se precisar de ajuda, entre em contato.
      </p>
      <p>
        <Link className="text-lg text-blue-800 font-bold" href="/products">
          Voltar para a loja
        </Link>
      </p>
    </div>
  );
};

export default CancelPage;
