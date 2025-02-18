import { useForm } from "react-hook-form";import axios from "axios";
import Logo from "@/components/ui/logo";
import { toast } from 'react-toastify';

export function UserRegister() {
  const { register, handleSubmit } = useForm();
  const baseUrl = "http://localhost:3000/api"

  const onSubmit = async (data) => {
    try {
      const transformedData = { ...data };

      Object.keys(transformedData).forEach((key) => {
        if (transformedData[key] === "") {
          transformedData[key] = null;
        }
      });

      await axios.post(`${baseUrl}/usuario`, transformedData);
      toast.success("Cadastro realizado com sucesso")
    } catch (error) {
      toast.error(`Erro ao cadastrar: ${error.response.data.message}`);
    }
  };

  return (
    <div className="flex overflow-hidden flex-col items-center pb-10 min-h-screen bg-background">
      <div className="flex flex-col items-center px-5 py-0 w-full max-w-[453px]">
        <Logo />
        <div className="mt-8 mb-8 text-3xl text-primary font-bold">Seja bem-vindo(a)!</div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {[ 
            { label: "Nome Completo", id: "nome", placeholder: "Sofia Leal", required: true },
            { label: "CNPJ", id: "cnpj" },
            { label: "CPF", id: "cpf", placeholder: "11111111111" },
            { label: "Email", id: "email", type: "email", placeholder: "sofialealtexeira@gmail.com", required: true },
            { label: "Telefone", id: "telefone", type: "tel", placeholder: "21111111111", required: true },
            { label: "Estado", id: "estado", placeholder: "RJ", required: true },
            { label: "Cidade", id: "cidade", placeholder: "Rio de Janeiro", required: true },
            { label: "Bairro", id: "bairro", placeholder: "Cachambi", required: true },
            { label: "Logradouro", id: "logradouro", placeholder: "Rua da Paz, 777", required: true },
            { label: "Complemento", id: "complemento", placeholder: "Casa 7", required: true },
            { label: "Senha", id: "senha", type: "password", required: true },
          ].map(({ id, label, type = "text", placeholder, required }) => (
            <div key={id} className="mb-4">
              <label htmlFor={id} className="block mb-1 font-bold text-secondary text-left">
                {label} {required && <span className="text-secondary">*</span>}
              </label>
              <input
                {...register(id, { required })}
                id={id}
                type={type}
                placeholder={placeholder}
                className="w-full px-3 py-2 bg-background border shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-[#955306]"
              />
            </div>
          ))}


          <div className="mb-4">
            <label htmlFor="tipoUsuario" className="block mb-1 font-bold text-secondary text-left">
              Tipo Usuário <span className="text-secondary">*</span>
            </label>
            <select
              {...register("tipoUsuario", { required: true })}
              id="tipoUsuario"
              className="w-full px-3 py-2 bg-background border shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value="receptor">Receptor</option>
              <option value="doador">Doador</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-0 py-3.5 mt-8 w-full text-2xl font-bold text-center text-yellow-800 bg-third cursor-pointer border-[none] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          >
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
}

