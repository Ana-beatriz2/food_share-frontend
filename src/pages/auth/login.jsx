import { useForm } from "react-hook-form";
import axios from "axios";
import Logo from "@/components/ui/logo";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const baseUrl = "http://localhost:3000/api";

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, data);
      
      alert("Login realizado com sucesso!");
      localStorage.setItem("token", response.data.token);

    } catch (error) {
      alert(`Erro ao fazer login: ${error.response?.data?.message || "Erro desconhecido"}`);
    }
  };

  return (
    <div className="flex overflow-hidden flex-col items-center pb-72 tracking-tighter text-yellow-800 bg-orange-50 max-md:pb-24">
      <Logo size="large" />

      <div className="mt-36 text-3xl font-bold text-primary max-md:mt-10">
        Seja bem-vindo(a)!
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-12 mt-20 max-md:mt-10">
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-xl font-bold">
            Email:
          </label>
          <input
            {...register("email", { required: true })}
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="px-4 py-2 mt-3 max-w-full text-base whitespace-nowrap border border-white border-solid bg-blend-normal bg-violet-200 bg-opacity-0 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[453px] max-md:pr-5"
            aria-label="Email"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="text-xl font-bold">
            Senha:
          </label>
          <input
            {...register("senha", { required: true })}
            id="password"
            type="password"
            className="px-4 py-2 mt-3 max-w-full text-base whitespace-nowrap border border-white border-solid bg-blend-normal bg-violet-200 bg-opacity-0 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[453px] max-md:pr-5"
            aria-label="Senha"
          />
        </div>

        <button
          type="submit"
          className="px-16 pt-3.5 pb-5 mt-20 max-w-full text-2xl font-bold whitespace-nowrap bg-third bg-blend-normal shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[446px] max-md:px-5 max-md:mt-10"
        >
          CONTINUAR
        </button>
      </form>
    </div>
  );
}
