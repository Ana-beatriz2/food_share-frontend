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
      localStorage.setItem("token", response.data);
    } catch (error) {
      alert(`Erro ao fazer login: ${error.response?.data?.message || "Erro desconhecido"}`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 bg-orange-50 text-yellow-800">
      <Logo size="large" />

      <div className="mt-10 text-3xl font-bold text-primary text-center">
        Seja bem-vindo(a)!
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-md gap-6 mt-10">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-lg font-bold">
            Email:
          </label>
          <input
            {...register("email", { required: true })}
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            aria-label="Email"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="text-lg font-bold">
            Senha:
          </label>
          <input
            {...register("senha", { required: true })}
            id="password"
            type="password"
            className="w-full px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            aria-label="Senha"
          />
        </div>

        <button
          type="submit"
          className="w-full px-14 py-3 mt-10 text-2xl font-bold bg-third shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-third-dark focus:ring-2 focus:ring-primary focus:outline-none"
        >
          CONTINUAR
        </button>
      </form>
    </div>
  );
}