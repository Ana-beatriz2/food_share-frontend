import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Logo from "@/components/ui/logo";
export function CadastroPostoDeColeta() {
    const { register, handleSubmit, setValue } = useForm();
    const baseUrl = "http://localhost:3000/api";
    


    const onSubmit = async (data) => {
        try {
            await axios.post(`${baseUrl}/collection-points`, data);
            alert("Cadastro realizado com sucesso");
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
                
                <Button>Finalizar</Button>
            </form>
        </div>
    );
}

const Button = ({ children, onClick, className }) => {
    return (
        <button onClick={onClick} className={`px-16 py-3 text-2xl font-bold bg-amber-200 shadow-lg w-[325px] ${className}`}>
            {children}
        </button>
    );
};

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
                className="px-4 py-2 border border-gray-300 w-[453px] bg-white text-black" // Força o fundo branco e texto preto
            />
        </div>
    );
};

