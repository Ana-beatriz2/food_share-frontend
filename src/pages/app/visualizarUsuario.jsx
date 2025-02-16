import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import Logo from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";

export function VisualizarUsuario(usuarioID) {
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get("/usuario/:id");
        if (!response.ok) {
          throw new Error("Erro ao buscar usuário");
        }
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsuario();
  }, [usuarioID]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (!usuario) {
    return <p>Usuário não encontrado.</p>;
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-bold">Detalhes do Usuário</h2>
      <p>Nome: {usuario.nome}</p>
      <p>Email: {usuario.email}</p>
      <p>Senha: {usuario.senha}</p>
      <p>Tipo de Usuário: {usuario.tipoUsuario}</p>
      <p>Telefone: {usuario.telefone}</p>
      <p>
        Endereço: {usuario.bairro}, {usuario.cidade}, {usuario.logradouro} -{" "}
        {usuario.complemento}, {usuario.estado}
      </p>
      <p>CPF: {usuario.cpf}</p>
      <p>CNPJ: {usuario.cnpj}</p>
    </div>
  );
}

const InputField = ({ label, placeholder, register, readOnly }) => {
  const id = React.useId();

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg">
      <label htmlFor={id} className="text-lg font-bold text-yellow-800">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        {...register}
        className={`px-4 py-2 border border-gray-300 rounded-md w-full text-base shadow-md ${
          readOnly ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        }`}
        readOnly={readOnly}
      />
    </div>
  );
};

const ActionButtons = ({ handleSubmit, onSubmit, handleLogout, usuarioID  }) => {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-4 mt-8 w-full max-w-lg"
    >
      <button
        type="submit"
        className="px-4 py-2 bg-yellow-500 text-white rounded-md font-bold w-full"
      >
        Relatório
      </button>
      <button
        type="button"
        onClick={() => navigate(`/editarUsuario/${usuarioID}`)} 
        className="px-4 py-2 bg-gray-300 text-black rounded-md font-bold w-full"
      >
        Editar
      </button>
      <button
        type="button"
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md font-bold w-full"
      >
        Logout
      </button>
    </form>
  );
};

const AccountDetails = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api", {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const inputFields = [
    { label: "*Nome Completo:", name: "nome", readOnly: true },
    { label: "CNPJ:", name: "cnpj", readOnly: true },
    { label: "CPF:", name: "cpf", readOnly: true },
    { label: "*Email:", name: "email", readOnly: true },
    { label: "*Telefone:", name: "telefone", readOnly: true },
    { label: "Tipo Usuário:", name: "tipoUsuario", readOnly: true },
    { label: "*Estado:", name: "estado", readOnly: true },
    { label: "*Cidade:", name: "cidade", readOnly: true },
    { label: "*Bairro:", name: "bairro", readOnly: true },
    { label: "*Logradouro:", name: "logradouro", readOnly: true },
    { label: "*Complemento:", name: "complemento", readOnly: true },
    { label: "Senha:", name: "senha", readOnly: true },
  ];

  return (
    <div className="flex flex-col items-center p-4 md:p-8 bg-orange-50 text-black">
      <Logo />
      <div
        className="mt-4 text-3xl md:text-4xl font-bold"
        style={{ color: "#99A146" }}
      >
        Detalhes da Conta
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mt-6">
        {inputFields.map((field, index) => (
          <InputField
            key={index}
            register={register(field.name)}
            {...field}
          />
        ))}
        <ActionButtons handleSubmit={handleSubmit} onSubmit={onSubmit} handleLogout={handleLogout} />
      </form>
    </div>
  );
};

export default AccountDetails;
