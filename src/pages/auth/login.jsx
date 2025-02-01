import React from "react";
import Logo from "@/components/ui/logo";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center pb-72 tracking-tighter text-yellow-800 bg-orange-50 max-md:pb-24">
      <Logo size="large" />

      <form className="flex flex-col items-center w-full">
        <h1 className="mt-36 text-3xl font-bold text-lime-500 max-md:mt-10">
          Seja bem-vindo(a)!
        </h1>

        <div className="mt-20 max-md:mt-10">
          <InputField label="Email" type="email" />
        </div>

        <div className="mt-12 max-md:mt-10">
          <InputField label="Senha" type="password" />
        </div>

        <button
          type="submit"
          className="px-16 pt-3.5 pb-5 mt-20 max-w-full text-2xl font-bold whitespace-nowrap bg-amber-200 shadow-lg w-[446px] max-md:px-5 max-md:mt-10"
        >
          CONTINUAR
        </button>
      </form>
    </div>
  );
};

export default LoginPage;