import { useEffect, useState } from "react";
import api from "@/services/api";

export default function InicioPostoDeColeta() {
    const [postoColeta, setPostoColeta] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPostos = async () => {
            try {
                const response = await api.get("/inicioPostoDeColeta"); 
                setPostoColeta(response.data);
            } catch (err) {
                setError("Erro ao carregar posto de coleta.");
            } finally {
                setLoading(false);
            }
        };

        fetchPostos();
    }, []);

    return (
        <div className="flex flex-col pb-70 bg-orange-0">
            <div className="px-5 py-0 mx-auto my-0 w-full max-w-[1200px]">
                <h1 className="mx-0 mt-10 mb-12 text-4xl font-bold text-center text-primary">
                    Posto de Coleta Cadastrados
                </h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {loading ? (
                    <p className="text-center text-gray-500">Carregando Posto de Coleta...</p>
                ) : (
                    <>
                        {postoColeta.length === 0 ? (
                            <p className="text-center text-gray-500">Nenhum Posto de Coleta Disponível.</p>
                        ) : (
                            postoColeta.map((posto) => (
                                <div
                                    key={posto.id}
                                    className="flex gap-5 p-5 mb-9 border border-zinc-300 shadow-md max-md:flex-col max-md:items-center"
                                >

                                    <div className="flex-1 text-xl font-bold text-secondary">
                                        <p>Nome: {posto.PostoColetum.nome}</p>
                                        <p>Tipo: {posto.tipo}</p>
                                        <p>Bairro: {posto.bairro}</p>
                                        <p>Cidade: {posto.cidade}</p>
                                        <p>Logadouro: {posto.logadouro}</p>
                                        <p>Complemento: {posto.complemento}</p>
                                        <p>Estado: {posto.estado}</p>
                                        <p>Ponto de Referência: {posto.ponto_referencia}</p>
                                        <button className="px-2.5 py-1.5 my-auto bg-amber-200 bg-blend-normal shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                                            EXCLUIR POSTO
                                        </button>
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
