import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { formataDiasFuncionamento, formataHorariosFuncionamento } from '../../utils/filterFuncionamento';
import api from "@/services/api";
import { toast } from 'react-toastify';

export default function InicioPostoDeColeta() {
    const [postoColeta, setPostoColeta] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostos = async () => {
            try {
                const response = await api.get("/postoColeta/doador"); 
                setPostoColeta(response.data);
            } catch (err) {
                setError("Erro ao carregar posto de coleta.");
            } finally {
                setLoading(false);
            }
        };

        fetchPostos();
    }, []);

    const handleDelete = async (postoColetaId) => {
        try {
            await api.delete(`/postoColeta/${postoColetaId}`);
            toast.success('Posto de coleta deletado com sucesso!');
            window.location.reload();
        } catch (error) {
            toast.error(`Houve um erro ao excluir o posto de coleta: ${error.response.data.message}`);
        }
    };

    return (
        <div className="flex overflow-auto flex-col pb-20 bg-background">
            <div className="px-4 sm:px-6 py-0 mx-auto my-0 w-full max-w-full sm:max-w-[1000px] relative pt-20 sm:pt-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center my-6">
                    Postos de Coleta
                </h1>
                <button 
                    onClick={() => navigate('/cadastroPostoDeColeta')} 
                    className="sm:hidden block mx-auto mb-10 px-6 sm:px-10 py-2 rounded-md text-base font-bold text-secondary bg-third cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                    Cadastrar Posto de Coleta
                </button>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {loading ? (
                    <p className="text-center text-gray-500">Carregando postos de coleta...</p>
                ) : (
                    <>
                        {postoColeta.length === 0 ? (
                            <p className="text-center text-gray-500">Nenhum posto de coleta disponível.</p>
                        ) : (
                            postoColeta.map((posto) => (
                                <div
                                    key={posto.id}
                                    className="flex gap-5 p-3 mb-9 border border-zinc-300 shadow-md flex-col sm:flex-row sm:items-center"
                                >
                                    <div className="flex-1 text-lg sm:text-xl font-bold text-secondary">
                                        <p>Nome: {posto.nome}</p>
                                        <p>Tipo: {posto.tipo}</p>
                                        <p>Bairro: {posto.bairro}</p>
                                        <p>Cidade: {posto.cidade}</p>
                                        <p>Logradouro: {posto.logradouro}</p>
                                        <p>Complemento: {posto.complemento}</p>
                                        <p>Estado: {posto.estado}</p>
                                        <p>Ponto de Referência: {posto.ponto_referencia}</p>
                                        <p>Hora funcionamento: {formataHorariosFuncionamento(posto.Funcionamentos)}</p>
                                        <p>Dias funcionamento: {formataDiasFuncionamento(posto.Funcionamentos)}</p>
                                        <div className="flex items-center gap-4 mt-6">
                                            <button className="p-3 bg-background rounded-md">
                                                <img
                                                    src="src/assets/edit.png"
                                                    alt="Edit icon"
                                                    className="w-15 h-8 bg-background"
                                                />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(posto.id)}
                                                className="px-8 py-2.5 mt-6 mb-8 text-sm text-red-500 font-bold bg-third shadow-md w-full sm:w-auto"
                                            >
                                                EXCLUIR POSTO
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
}