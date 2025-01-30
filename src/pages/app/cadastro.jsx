export function UserRegister() {
  const formFields = [
    { label: "Nome Completo", id: "fullName", placeholder: "Sofia Leal", required: true },
    { label: "CNPJ", id: "cnpj" },
    { label: "CPF", id: "cpf", placeholder: "111.111.111-11" },
    { label: "Email", id: "email", type: "email", placeholder: "sofialealtexeira@gmail.com", required: true },
    { label: "Telefone", id: "phone", type: "tel", placeholder: "(21)11111-1111", required: true },
    { label: "Tipo Usuário", id: "userType", placeholder: "Selecione o Tipo de Usuário" },
    { label: "Estado", id: "state", placeholder: "Rio de Janeiro", required: true },
    { label: "Cidade", id: "city", placeholder: "Rio de Janeiro", required: true },
    { label: "Bairro", id: "neighborhood", placeholder: "Cachambi", required: true },
    { label: "Logradouro", id: "address", placeholder: "Rua da Paz, 777", required: true },
    { label: "Complemento", id: "addressComplement", placeholder: "Casa 7", required: true },
    { label: "Senha", id: "password", type: "password"}
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex overflow-hidden flex-col items-center pb-10 min-h-screen bg-orange-50">
      <div className="flex flex-col items-center px-5 py-0 w-full max-w-[453px] max-sm:px-4 max-sm:py-0">
        Logo
        <div className="mb-8 text-3xl text-primary font-bold max-sm:text-3xl">
          Seja bem-vindo(a)!
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          {formFields.map(({ id, label, type = "text", placeholder, required }) => (
            <div key={id} className="mb-4">
              <label htmlFor={id} className="block mb-1 font-bold text-secondary text-left">
                {label} {required && <span className="text-secondary">*</span>}
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder || ""}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder-[#955306]"
              />
            </div>
          ))}

          <button 
            type="submit"
            className="px-0 py-3.5 mt-8 w-full text-2xl font-bold text-center text-yellow-800 bg-third cursor-pointer border-[none] shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-sm:text-xl"
          >
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
}
