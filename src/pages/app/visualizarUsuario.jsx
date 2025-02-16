import React from "react";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import Logo from "@/components/ui/logo";

export function VisualizarUsuario(userId) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/${userId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar usuário");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  return (
    <div>
      <h2>Detalhes do Usuário</h2>
      <p>Nome: {user.fullName}</p>
      <p>Email: {user.email}</p>
      <p>Telefone: {user.phone}</p>
      <p>Endereço: {user.address}, {user.neighborhood}, {user.city} - {user.state}</p>
    </div>
  );
}


const InputField = ({ label, placeholder, className, register }) => {
  const id = React.useId();
  
  return (
    <div className="flex flex-col gap-3.5">
      <label htmlFor={id} className="text-xl font-bold text-yellow-800">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        {...register}
        className={`px-4 py-2 ml-4 max-w-full text-base border border-white border-solid bg-blend-normal bg-violet-200 bg-opacity-0 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[453px] max-md:pr-5 ${className}`}
      />
    </div>
  );
};

const ActionButtons = ({ handleSubmit, onSubmit }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 justify-between mt-14 w-80 max-w-full text-sm font-bold text-black whitespace-nowrap max-md:mt-10">
          <button
            type="submit"
            className="px-0 py-3.5 mt-8 w-full text-2xl font-bold text-center text-yellow-800 bg-third cursor-pointer border-[none] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Relatório
          </button>
      <button
            type="submit"
            className="px-0 py-3.5 mt-8 w-full text-2xl font-bold text-center text-yellow-800 bg-third cursor-pointer border-[none] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Voltar
          </button>
          <button
            type="submit"
            className="px-0 py-3.5 mt-8 w-full text-2xl font-bold text-center text-yellow-800 bg-third cursor-pointer border-[none] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            Salvar
          </button>
    </form>
  );
};

const AccountDetails = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://seu-backend.com/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erro ao salvar os dados");
      }
      alert("Dados salvos com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  const inputFields = [
    { label: "*Nome Completo:", name: "fullName" },
    { label: "CNPJ:", name: "cnpj" },
    { label: "CPF", name: "cpf" },
    { label: "*Email:", name: "email", isEmail: true },
    { label: "*Telefone:", name: "phone" },
    { label: "Tipo Usuário:", name: "userType" },
    { label: "*Estado:", name: "state" },
    { label: "*Cidade:", name: "city" },
    { label: "*Bairro:", name: "neighborhood" },
    { label: "*Logradouro:", name: "address" },
    { label: "*Complemento:", name: "complement" },
    { label: "Senha:", name: "password" },
  ];

  return (
    <div className="flex overflow-hidden flex-col items-center pb-20 tracking-tighter text-black bg-orange-50">
                <Logo />
                <div className="mt-8 text-5xl font-bold" style={{ color: "#99A146" }}>
                    Cadastro Posto de Coleta
                </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputFields.map((field, index) => (
          <InputField key={index} register={register} {...field} />
        ))}
        <ActionButtons handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </form>
    </div>
  );
};

export default AccountDetails;
