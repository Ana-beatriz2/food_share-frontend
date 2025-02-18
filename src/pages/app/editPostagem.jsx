import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom"; 
import api from "@/services/api";
import { toast } from 'react-toastify';

export function EdicaoPostagem() {
    const { register, handleSubmit, setValue } = useForm();
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [postosColeta, setPostosColeta] = useState([]);

    useEffect(() => {
        const fetchDadosIniciais = async () => {
            try {
                const [produtosRes, postosRes] = await Promise.all([
                    api.get(`/produto`),
                    api.get(`/postoColeta/doador`)
                ]);
    
                setProdutos(produtosRes.data);
                setPostosColeta(postosRes.data);
    
                if (id) {
                    const postagemRes = await api.get(`/postagem/${id}`);
                    const postagem = postagemRes.data;
                    
                    console.log(postagem.validade)
                    const validadeFormatada = postagem.validade
                        ? postagem.validade.split("T")[0]
                        : "";
    
                    setValue("produtoId", postagem.produtoId);
                    setValue("postoColetaId", postagem.postoColetaId);
                    setValue("quantidade", postagem.quantidade);
                    setValue("validade", validadeFormatada); 
                    setValue("observacao", postagem.observacao || "");
                }
            } catch (error) {
                toast.error(`Erro ao buscar dados: ${error.response?.data?.message || error.message}`);
            }
        };
    
        fetchDadosIniciais();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            await api.put(`/postagem/${id}`, data);

            toast.success("Postagem atualizada com sucesso!");
            navigate(`/detalhesPostagemDoador/${id}`)
        } catch (error) {
            toast.error(`Erro ao atualizar: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="flex overflow-hidden flex-col items-center pb-2210 min-h-screen bg-background">
            <div className="flex flex-col items-center px-5 py-0 w-full max-w-[453px]">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 mt-14 max-md:mt-10">
                    
                    <SelectField label="*Nome Produto:" id="produtoId" register={register} options={produtos} />
                    <SelectField label="*Posto de Coleta:" id="postoColetaId" register={register} options={postosColeta} />
                    <InputField label="*Quantidade:" placeholder="Digite a Quantidade do Produto" register={register("quantidade")} />
                    <InputField label="*Validade:" placeholder="Validade do Produto" type="date" register={register("validade")} />
                    <InputField label="Observação:" placeholder="Deseja Acrescentar alguma Observação da Doação?" register={register("observacao")} />

                    <div className="flex justify-center gap-4 mt-12 mb-7">
                        <button onClick={() => navigate(`/detalhesPostagemDoador/${id}`)} type="button" className="px-6 py-2 text-lg font-bold text-secondary bg-third cursor-pointer border-none shadow-md">
                            Voltar
                        </button>
                        <button type="submit" className="px-6 py-2 text-lg font-bold text-primary bg-third cursor-pointer border-none shadow-md">
                            Salvar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

const InputField = ({ label, placeholder, className, register, type = "text" }) => {
    const id = React.useId();

    return (
        <div className="flex flex-col gap-3.5">
            <label htmlFor={id} className="text-xl font-bold text-secondary">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register}
                className={`px-4 py-2 ml-4 max-w-full text-base border border-white border-solid bg-background bg-opacity-0 shadow-md w-[453px] ${className} placeholder-[#955306]`}
            />
        </div>
    );
};

const SelectField = ({ label, id, register, options }) => (
    <div className="flex flex-col gap-3.5">
        <label htmlFor={id} className="text-xl font-bold text-secondary">
            {label}
        </label>
        <select
            id={id}
            {...register(id)}
            className="px-4 py-2 ml-4 max-w-full text-base border border-white border-solid bg-background bg-opacity-0 shadow-md w-[453px]"
        >
            <option value="">Selecione</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.nome}
                </option>
            ))}
        </select>
    </div>
);
