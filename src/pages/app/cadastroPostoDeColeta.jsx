import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import Logo from "@/components/ui/logo";

export function CadastroPostoDeColeta() {
    const { register, handleSubmit, setValue } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para exibir o modal

    const onSubmit = async (data) => {
        try {
            await api.post("/collection-points", data);
            alert("Cadastro realizado com sucesso");
        } catch (error) {
            alert(`Erro ao cadastrar: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center pb-12 min-h-screen bg-white">
            <Logo />
            <div className="mt-8 text-5xl font-bold" style={{ color: "#99A146" }}>
                Cadastro Posto de Coleta
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 mt-10">
                <InputField label="Nome do Posto de Coleta" placeholder="Digite o nome" register={register("nomePosto", { required: true })} />
                
                <div className="flex flex-col gap-3.5">
                    <label className="text-xl font-bold text-yellow-800">Tipo de posto</label>
                    <select {...register("tipoPosto", { required: "Selecione um tipo de posto" })} className="px-4 py-2 border border-gray-300 w-[453px] bg-white text-black">
                        <option value="">Selecione um tipo</option>
                        <option value="ONG">ONG</option>
                        <option value="Supermercado">Supermercado</option>
                        <option value="Restaurante">Restaurante</option>
                    </select>
                </div>

                <InputField label="Estado" placeholder="Digite o Estado" register={register("estado", { required: true })} />
                <InputField label="Cidade" placeholder="Digite a cidade" register={register("cidade", { required: true })} />
                <InputField label="Bairro" placeholder="Digite o bairro" register={register("bairro", { required: true })} />
                <InputField label="Complemento" placeholder="Opcional" register={register("complemento")} />

                {/* Botão para abrir o modal */}
                <button type="button" onClick={() => setIsModalOpen(true)} className="px-0 py-3.5 mt-8 w-full text-2xl font-bold text-center text-yellow-800 bg-third cursor-pointer border-[none] shadow-md">
                    Funcionamento do Estabelecimento
                </button>

                <button type="submit" className="px-0 py-3.5 mt-8 w-full text-2xl font-bold text-center text-yellow-800 bg-third cursor-pointer border-[none] shadow-md">
                    CONTINUAR
                </button>
            </form>

            {/* Modal de Funcionamento */}
            {isModalOpen && <FuncionamentoModal closeModal={() => setIsModalOpen(false)} setValue={setValue} />}
        </div>
    );
}

const FuncionamentoModal = ({ closeModal, setValue }) => {
    const { register, handleSubmit } = useForm();

    const onModalSubmit = async (data) => {
        try {
            const response = await api.post("/funcionamento", data); // Agora o token será incluído automaticamente
            const funcionamentoId = response.data.id;
            setValue("funcionamentoId", funcionamentoId);
            alert("Funcionamento salvo com sucesso!");
            closeModal();
        } catch (error) {
            alert(`Erro ao salvar funcionamento: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Funcionamento do Estabelecimento</h2>
                
                <form onSubmit={handleSubmit(onModalSubmit)} className="flex flex-col gap-4">
                    <InputField label="Horário Início" placeholder="Ex: 08:00 " register={register("hora_incio", { required: true })} />
                    <InputField label="Horário de Fechamento" placeholder="Ex: 18:00" register={register("hora_fim", { required: true })} />
                        <div className="flex flex-col gap-3.5">
                            <label className="text-xl font-bold text-yellow-800">Dias de Funcionamento</label>
                            <select 
                                {...register("diasFuncionamento", { required: "Selecione os dias de funcionamento" })} 
                                className="px-4 py-2 border border-gray-300 w-full bg-white text-black">
                                <option value="">Selecione os dias</option>
                                <option value="segunda_a_sexta">Segunda a Sexta</option>
                                <option value="segunda_a_sabado">Segunda a Sábado</option>
                                <option value="segunda_a_domingo">Segunda a Domingo</option>
                                <option value="fim_de_semana">Somente Finais de Semana</option>
                            </select>
                        </div>

                    
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-yellow-700 text-white rounded">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ label, placeholder, register }) => {
    const id = React.useId();
    
    return (
        <div className="flex flex-col gap-3.5 w-full max-w-[500px]">  {/* Ajuste para largura máxima */}
            <label htmlFor={id} className="text-xl font-bold text-yellow-800">{label}</label>
            <input 
                id={id} 
                type="text" 
                placeholder={placeholder} 
                {...register} 
                className="px-4 py-2 border border-gray-300 w-full bg-white text-black"
            />
        </div>
    );
};

export default CadastroPostoDeColeta;
