import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import api from "@/services/api";

export function CadastroPostagem() {
    const { register, handleSubmit, setValue } = useForm();
    const [produtos, setProdutos] = useState([]);
    const [postosColeta, setPostosColeta] = useState([]);
    const navigate = useNavigate();

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

            if (transformedData.file) {
                formData.append("file", transformedData.file);
            }

            await api.post("/postagem", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Cadastro realizado com sucesso");
            navigate('/login');
        } catch (error) {
            console.log("error: ", error);
            toast.error(`Erro ao cadastrar: ${error.response?.data?.message || "Erro desconhecido"}`);
        }
    };

    return (
        <div className="flex flex-col items-center pb-10 min-h-screen bg-background px-4">
            <div className="flex flex-col items-center w-full max-w-md">
                <div className="mt-8 mb-8 text-4xl text-primary font-bold text-center">Cadastrar Postagem</div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 w-full">
                    <InputSelect label="*Nome Produto:" id="produtoId" options={produtos} register={register("produtoId")} />
                    <InputSelect label="*Posto de Coleta:" id="postoColetaId" options={postosColeta} register={register("postoColetaId")} />
                    <InputField label="*Quantidade:" placeholder="Digite a Quantidade do Produto" register={register("quantidade")} />
                    <InputField label="*Validade:" placeholder="Validade do Produto" type="date" register={register("validade")} />
                    <InputFile label="Foto do Alimento:" register={register} setValue={setValue} />
                    <InputField label="Observação:" placeholder="Deseja Acrescentar alguma Observação da Doação?" register={register("observacao")} />
                    <button type="submit" className="px-4 py-3 mt-6 w-full text-2xl font-bold text-center text-secondary bg-third shadow-md">
                        Finalizar
                    </button>
                </form>
            </div>
        </div>
    );
}

const InputField = ({ label, placeholder, register, type = "text" }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xl font-bold text-secondary">{label}</label>
            <input type={type} placeholder={placeholder} {...register} className="px-4 py-2 w-full text-base border border-white bg-background shadow-md placeholder-secondary" />
        </div>
    );
};

const InputSelect = ({ label, id, options, register }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor={id} className="text-xl font-bold text-secondary">{label}</label>
            <select id={id} {...register} className="px-4 py-2 w-full text-base border border-white bg-background shadow-md">
                <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>{option.nome}</option>
                ))}
            </select>
        </div>
    );
};

const InputFile = ({ label, register, setValue }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setValue("file", file); // Armazena no react-hook-form
        document.getElementById("file-label").textContent = file?.name || "Nenhum arquivo selecionado";
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xl font-bold text-secondary">{label}</label>
            <input
                type="file"
                accept="image/*"
                {...register("file")}
                id="file"
                className="hidden"
                onChange={handleFileChange} // Usa a função para capturar o arquivo
            />
            <label htmlFor="file" className="px-4 py-2 border border-white bg-background shadow-md text-secondary cursor-pointer">
                Selecionar arquivo
            </label>
            <span id="file-label" className="text-sm text-secondary">Nenhum arquivo selecionado</span>
        </div>
    );
};
