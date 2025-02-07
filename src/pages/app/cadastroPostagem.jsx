import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Logo from "@/components/ui/logo";

export function CadastroPostagem() {
    const { register, handleSubmit, setValue } = useForm();
    const baseUrl = "http://localhost:3000/api";
    const [produtos, setProdutos] = useState([]);
  
    useEffect(() => {
        // Fetch products from the API
        const fetchProdutos = async () => {
            try {
                const response = await axios.get(`${baseUrl}/produtos`); // Ajuste o endpoint conforme necessário
                setProdutos(response.data);
            } catch (error) {
                alert(`Erro ao buscar produtos: ${error.response.data.message}`);
            }
        };
  
        fetchProdutos();
    }, []);
  
    const onSubmit = async (data) => {
        try {
            const transformedData = { ...data };
  
            Object.keys(transformedData).forEach((key) => {
                if (transformedData[key] === "") {
                    transformedData[key] = null;
                }
            });

            // Aqui você pode enviar o arquivo de imagem se for necessário fazer upload
            const formData = new FormData();
            formData.append('produto', JSON.stringify(transformedData));
            formData.append('foto', data.foto[0]); // Adicionando o arquivo de imagem
            
            await axios.post(`${baseUrl}/produto`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert("Cadastro realizado com sucesso");
        } catch (error) {
            alert(`Erro ao cadastrar: ${error.response.data.message}`);
        }
    };
  
    return (
        <div className="flex overflow-hidden flex-col items-center pb-2210 min-h-screen bg-background">
            <div className="flex flex-col items-center px-5 py-0 w-full max-w-[453px]">
                <Logo />
                <div className="mt-8 mb-8 text-3xl text-primary font-bold">Cadastrar Postagem</div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 mt-14 max-md:mt-10">
                    {/* Produto com select */}
                    <div className="flex flex-col gap-3.5">
                        <label htmlFor="nomeProduto" className="text-xl font-bold text-yellow-800">
                            *Nome Produto:
                        </label>
                        <select
                            id="nomeProduto"
                            {...register("nomeProduto")}
                            className="px-4 py-2 ml-4 max-w-full text-base border border-white border-solid bg-blend-normal bg-violet-200 bg-opacity-0 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[453px] max-md:pr-5"
                        >
                            <option value="">Selecione o Produto</option>
                            {produtos.map((produto) => (
                                <option key={produto.id} value={produto.nome}>
                                    {produto.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <InputField label="*Quantidade:" placeholder="Digite a Quantidade do Produto" register={register("quantidade")} />
                    <InputField label="*Validade:" placeholder="Validade do Produto" register={register("validade")} />
                    
                    {/* Campo de upload de imagem */}
                    <div className="flex flex-col gap-3.5">
                        <label htmlFor="foto" className="text-xl font-bold text-yellow-800">
                            Foto do Alimento:
                        </label>
                        <input
                            id="foto"
                            type="file"
                            accept="image/*"
                            {...register("foto")}
                            className="px-4 py-2 ml-4 max-w-full text-base border border-white border-solid bg-blend-normal bg-violet-200 bg-opacity-0 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[453px] max-md:pr-5"
                        />
                    </div>
                    
                    <InputField label="Observação:" placeholder="Deseja Acrescentar alguma Observação da Doação?" register={register("observacao")} />
                    
                    <div className="mt-60 max-md:mt-10">
                        <Button>Finalizar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-16 pt-3.5 pb-5 text-2xl font-bold whitespace-nowrap bg-amber-200 bg-blend-normal shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[325px] max-md:px-5 ${className}`}
    >
      {children}
    </button>
  );
};

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
