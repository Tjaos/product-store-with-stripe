const SucessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-semibold text-green-600 mb-4">
        Pagamento realizado com sucesso!
      </h1>
      <p className="text-lg">
        Obrigado pela sua compra, você receberá atualizações via e-mail
      </p>
      <p>
        <a
          className="text-lg text-blue-800 font-bold"
          href="http://localhost:3000/products"
        >
          Voltar para a loja
        </a>
      </p>
    </div>
  );
};

export default SucessPage;
