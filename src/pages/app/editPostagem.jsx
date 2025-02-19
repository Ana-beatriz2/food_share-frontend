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
            navigate(`/detalhesPostagemDoador/${id}`);
        } catch (error) {
            toast.error(`Erro ao atualizar: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-background p-4">
            <div className="w-full max-w-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-10">
                    <SelectField label="*Nome Produto:" id="produtoId" register={register} options={produtos} />
                    <SelectField label="*Posto de Coleta:" id="postoColetaId" register={register} options={postosColeta} />
                    <InputField label="*Quantidade:" placeholder="Digite a Quantidade do Produto" register={register("quantidade")} />
                    <InputField label="*Validade:" placeholder="Validade do Produto" type="date" register={register("validade")} />
                    <InputField label="Observação:" placeholder="Deseja Acrescentar alguma Observação da Doação?" register={register("observacao")} />

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <button onClick={() => navigate(`/detalhesPostagemDoador/${id}`)} type="button" className="px-6 py-2 text-lg font-bold text-secondary bg-third border-none shadow-md">
                            Voltar
                        </button>
                        <button type="submit" className="px-6 py-2 text-lg font-bold text-primary bg-third border-none shadow-md">
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
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-lg font-bold text-secondary">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register}
                className={`px-4 py-2 text-base border border-white bg-background shadow-md w-full ${className} placeholder-[#955306]`}
            />
        </div>
    );
};

const SelectField = ({ label, id, register, options }) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-lg font-bold text-secondary">
            {label}
        </label>
        <select
            id={id}
            {...register(id)}
            className="px-4 py-2 text-base border border-white bg-background shadow-md w-full"
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