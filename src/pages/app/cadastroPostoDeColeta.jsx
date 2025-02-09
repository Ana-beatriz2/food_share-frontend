import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Logo from "@/components/ui/logo";

export function CadastroPostoDeColeta() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a exibição do modal
    const { register, handleSubmit, setValue, reset } = useForm();
    const baseUrl = "http://localhost:3000/api";

    // Função para exibir o modal
    const openModal = () => setIsModalOpen(true);
    // Função para fechar o modal
    const closeModal = () => setIsModalOpen(false);

    // Função para enviar os dados do formulário
    const onSubmit = async (data) => {
        try {
            await axios.post(`${baseUrl}/collection-points`, data);
            alert("Cadastro realizado com sucesso");
            closeModal(); // Fecha o modal após o envio
        } catch (error) {
            alert(`Erro ao cadastrar: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center pb-12 min-h-screen bg-white">
            <Logo />
            <div className="mt-8 text-5xl font-bold" style={{ color: '#99A146' }}>Cadastro Posto de Coleta</div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 mt-10">
                <InputField label="Nome do Posto de Coleta" placeholder="Digite o nome" register={() => register("nomePosto", { required: true })} />

                <div className="flex flex-col gap-3.5">
                    <label className="text-xl font-bold text-yellow-800">Tipo de posto</label>
                    <select {...register("Tipo de Posto", { required: "Selecione um tipo de posto" })} className="px-4 py-2 border border-gray-300 w-[453px] bg-white text-black">
                        <option value="">Selecione um tipo</option>
                        <option value="ONG">ONG</option>
                        <option value="Supermercado">Supermercado</option>
                        <option value="Restaurante">Restaurante</option>
                    </select>
                </div>

                <InputField label="Estado" placeholder="Digite o Estado" register={register} required="Este campo é obrigatório" />
                <InputField label="Cidade" placeholder="Digite a cidade" register={register("cidade", { required: true })} />
                <InputField label="Bairro" placeholder="Digite o bairro" register={register("bairro", { required: true })} />
                <InputField label="Complemento" placeholder="Opcional" register={register("complemento")} />

                <button 
                    type="button" // Modificado para "button" e não "submit"
                    onClick={openModal}
                    className="px-0 py-3.5 mt-8 w-full text-2xl font-bold text-center text-yellow-800 bg-third cursor-pointer border-[none] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                    Funcionamento do Estabelecimento
                </button>

                <button type="submit" className="px-0 py-3.5 mt-8 w-full text-2xl font-bold text-center text-yellow-800 bg-third cursor-pointer border-[none] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    CONTINUAR
                </button>
            </form>

            {/* Modal para Funcionamento do Estabelecimento */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-[550px]">
                        <h2 className="text-2xl font-bold mb-4">Funcionamento do Estabelecimento</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <InputField label="Dias de Funcionamento" placeholder="Digite os dias da semana" register={register("diasFuncionamento", { required: true })} />
                            <InputField label="Horário início" placeholder="Digite o horário de funcionamento" register={register("horarioFuncionamento", { required: true })} />
                            <InputField label="Horário Final" placeholder="Digite o horário de funcionamento" register={register("horarioFuncionamento", { required: true })} />
                            
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-300 text-black rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-yellow-800 text-white rounded"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const InputField = ({ label, placeholder, register }) => {
    const id = React.useId();
    
    return (
        <div className="flex flex-col gap-3.5">
            <label htmlFor={id} className="text-xl font-bold text-yellow-800">{label}</label>
            <input 
                id={id} 
                type="text" 
                placeholder={placeholder} 
                {...register} 
                className="px-4 py-2 border border-gray-300 w-[453px] bg-white text-black"
            />
        </div>
    );
};
