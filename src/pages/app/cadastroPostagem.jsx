import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import api from "@/services/api";

export function CadastroPostagem() {
    const { register, handleSubmit, setValue } = useForm();
    const [produtos, setProdutos] = useState([]);
    const [postosColeta, setPostosColeta] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await api.get(`/produto`);
                setProdutos(response.data);
            } catch (error) {
                toast.error(`Erro ao buscar produtos: ${error.response.data.message}`);
            }
        };

        const fetchPostosColeta = async () => {
            try {
                const response = await api.get(`/postoColeta/doador`);
                setPostosColeta(response.data);
            } catch (error) {
                toast.error(`Erro ao buscar postos de coleta: ${error.response.data.message}`);
            }
        };

        fetchProdutos();
        fetchPostosColeta();
    }, []);

    const onSubmit = async (data) => {
        try {
            const transformedData = { ...data };

            Object.keys(transformedData).forEach((key) => {
                if (transformedData[key] === "") {
                    transformedData[key] = null;
                }
            });

            const formData = new FormData();
            
            formData.append("produtoId", transformedData.produtoId);
            formData.append("postoColetaId", transformedData.postoColetaId);
            formData.append("quantidade", transformedData.quantidade);
            formData.append("validade", transformedData.validade);
            formData.append("observacao", transformedData.observacao);
            
            if (data.file && data.file[0]) {
                formData.append("file", data.file[0]);
            }

            await api.post("/postagem", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Cadastro realizado com sucesso");
        } catch (error) {
            console.log("error: ", error);
            toast.error(`Erro ao cadastrar: ${error.response.data.message}`);
        }
    };

    return (
        <div className="flex overflow-hidden flex-col items-center pb-2210 min-h-screen bg-background">
            <div className="flex flex-col items-center px-5 py-0 w-full max-w-[453px]">
                <div className="mt-8 mb-8 text-4xl text-primary font-bold">Cadastrar Postagem</div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 mt-14 max-md:mt-10">
                    

                    <div className="flex flex-col gap-3.5">
                        <label htmlFor="produtoId" className="text-xl font-bold text-secondary">
                            *Nome Produto:
                        </label>
                        <select
                            id="produtoId"
                            {...register("produtoId")}
                            className="px-4 py-2 ml-4 max-w-full text-base border border-white border-solid bg-blend-normal bg-violet-200 bg-opacity-0 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[453px] max-md:pr-5"
                        >
                            <option value="">Selecione o Produto</option>
                            {produtos.map((produto) => (
                                <option key={produto.id} value={produto.id}>
                                    {produto.nome}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="flex flex-col gap-3.5">
                        <label htmlFor="postoColetaId" className="text-xl font-bold text-secondary">
                            *Posto de Coleta:
                        </label>
                        <select
                            id="postoColetaId"
                            {...register("postoColetaId")}
                            className="px-4 py-2 ml-4 max-w-full text-base border border-white border-solid bg-blend-normal bg-violet-200 bg-opacity-0 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[453px] max-md:pr-5"
                        >
                            <option value="">Selecione o Posto de Coleta</option>
                            {postosColeta.map((posto) => (
                                <option key={posto.id} value={posto.id}>
                                    {posto.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <InputField label="*Quantidade:" placeholder="Digite a Quantidade do Produto" register={register("quantidade")} />
                    <InputField label="*Validade:" placeholder="Validade do Produto" type="date" register={register("validade") } />


                    <div className="flex flex-col gap-3.5">
                        <label htmlFor="file" className="text-xl font-bold text-secondary">
                            Foto do Alimento:
                        </label>

                        <div className="relative w-[453px]">
                            <input
                                id="file"
                                type="file"
                                accept="image/*"
                                {...register("file")}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <button
                                type="button"
                                className="px-4 py-3 w-full text-left text-sm text-secondary border ml-2 shadow-md hover:bg-opacity-80 transition-all bg-background"
                                onClick={() => document.getElementById("file")?.click()}
                            >
                                Carregar a foto da doação
                            </button>
                        </div>
                    </div>

                    <InputField label="Observação:" placeholder="Deseja Acrescentar alguma Observação da Doação?" register={register("observacao")} />

                    <button
                        type="submit"
                        className="px-0 py-2.5 mt-12 mb-7 w-full text-2xl font-bold text-center text-secondary bg-third cursor-pointer border-[none] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                    >
                        Finalizar
                    </button>
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
                className={`px-4 py-2 ml-4 max-w-full text-base border border-white border-solid bg-blend-normal bg-background bg-opacity-0 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[453px] max-md:pr-5 ${className} placeholder-[#955306]`}
            />
        </div>
    );
};
