import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import { useNavigate } from 'react-router-dom';

export function CadastroPostoDeColeta() {
    const { register, handleSubmit } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [funcionamentos, setFuncionamentos] = useState([]);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const transformedData = { ...data };
            Object.keys(transformedData).forEach((key) => {
                if (transformedData[key] === "") {
                    transformedData[key] = null;
                }
            });

            const postoResponse = await api.post("/postoColeta", transformedData);
            const postoId = postoResponse.data.id;

            await Promise.all(
                funcionamentos.map(async (funcionamento) => {
                    await api.post("/funcionamento", { ...funcionamento, postoColetaId: postoId });
                })
            );

            
            navigate("/inicioPostoDeColeta");
            alert("Cadastro realizado com sucesso!");
        } catch (error) {
            alert(`Erro ao cadastrar: ${error.response?.data?.message || error.message}`);
        }
    };

    const adicionarFuncionamento = (novoFuncionamento) => {
        setFuncionamentos([...funcionamentos, novoFuncionamento]);
    };

    return (
        <div className="flex flex-col items-center min-h-screen w-full bg-background p-4">
            <div className="mt-8 text-4xl font-bold text-primary text-center">
                Cadastro Posto de Coleta
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 mt-10 w-full max-w-lg">
                <InputField label="Nome do Posto de Coleta" placeholder="Digite o nome" register={register("nome", { required: true })} />

                <div className="flex flex-col w-full">
                    <label className="text-xl font-bold text-secondary">Tipo de posto</label>
                    <select {...register("tipo", { required: "Selecione um tipo de posto" })} className="px-4 py-2 border border-gray-300 w-full bg-background text-secondary">
                        <option value="">Selecione um tipo</option>
                        <option value="ONG">ONG</option>
                        <option value="Supermercado">Supermercado</option>
                        <option value="Restaurante">Restaurante</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>

                <InputField label="Estado" placeholder="Digite o Estado" register={register("estado", { required: true })} />
                <InputField label="Cidade" placeholder="Digite a cidade" register={register("cidade", { required: true })} />
                <InputField label="Bairro" placeholder="Digite o bairro" register={register("bairro", { required: true })} />
                <InputField label="Complemento" placeholder="Opcional" register={register("complemento")} />

                <button type="button" onClick={() => setIsModalOpen(true)} className="w-full py-3 mt-6 text-xl font-bold text-secondary bg-third rounded shadow-md">
                    Funcionamento do Estabelecimento
                </button>

                <button type="submit" className="w-full py-3 mt-4 text-xl font-bold text-secondary bg-third rounded shadow-md">
                    CONTINUAR
                </button>
            </form>

            {isModalOpen && <FuncionamentoModal closeModal={() => setIsModalOpen(false)} adicionarFuncionamento={adicionarFuncionamento} />}
        </div>
    );
}

const FuncionamentoModal = ({ closeModal, adicionarFuncionamento }) => {
    const { register, handleSubmit, reset } = useForm();

    const onModalSubmit = (data) => {
        const formattedData = {
            ...data,
            hora_inicio: `${data.hora_inicio}:00`, 
            hora_fim: `${data.hora_fim}:00`
        };

        adicionarFuncionamento(formattedData);
        reset();
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="p-6 rounded-lg shadow-lg bg-background w-[350px]">
                <h2 className="text-xl font-bold text-center text-primary mb-4">Funcionamento</h2>

                <form onSubmit={handleSubmit(onModalSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-xl font-bold text-secondary">Dias de Funcionamento:</label>
                        <select {...register("dia", { required: "Selecione os dias de funcionamento" })} className="px-4 py-2 border border-gray-300 w-full bg-background text-secondary">
                            <option value="segunda">Segunda</option>
                            <option value="terca">Terça</option>
                            <option value="quarta">Quarta</option>
                            <option value="quinta">Quinta</option>
                            <option value="sexta">Sexta</option>
                            <option value="sabado">Sábado</option>
                            <option value="domingo">Domingo</option>
                        </select>
                    </div>

                    <InputField label="Horário Início" placeholder="Ex: 08:00" register={register("hora_inicio", { required: true })} type="time" />
                    <InputField label="Horário de Fechamento" placeholder="Ex: 18:00" register={register("hora_fim", { required: true })} type="time" />

                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-third text-secondary font-bold rounded">Continuar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ label, placeholder, register, type = "text" }) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-xl font-bold text-secondary">{label}</label>
            <input type={type} placeholder={placeholder} {...register} className="px-4 py-2 border  bg-background border-gray-300 w-full text-secondary placeholder-secondary rounded" />
        </div>
    );
};

export default CadastroPostoDeColeta;
