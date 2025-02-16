import { useEffect, useState } from "react";
import transformDate from '../../utils/transformDate';
import defaultImage from "../../assets/postagemDefaultImage.png";
import { useNavigate } from 'react-router-dom';
import api from "@/services/api";

export default function DoacoesDoador() {
    const [produtos, setProdutos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await api.get("/postagem/doador"); 
                setProdutos(response.data);
            } catch (err) {
                setError("Erro ao carregar doações.");
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <div className="flex overflow-auto flex-col pb-20 bg-background">
            <div className="px-4 sm:px-6 py-0 mx-auto my-0 w-full max-w-full sm:max-w-[1000px] relative">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center my-10">
                    Suas Doações
                </h1>

                <button 
                    onClick={() => navigate('/cadastroPostagem')} 
                    className="absolute right-4 sm:right-0 top-4 sm:top-0 px-6 sm:px-10 py-2 my-10 rounded-md text-base font-bold text-secondary bg-third cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                    Cadastrar Doação
                </button>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {loading ? (
                    <p className="text-center text-gray-500">Carregando produtos...</p>
                ) : (
                    <>
                        {produtos.length === 0 ? (
                            <p className="text-center text-gray-500">Nenhum produto disponível.</p>
                        ) : (
                            produtos.map((produto) => (
                                <div
                                    key={produto.id}
                                    className="flex gap-5 p-3 mb-9 border border-zinc-300 shadow-md flex-col sm:flex-row sm:items-center"
                                >
                                    <img
                                        src={produto.imagem != null ? `http://localhost:3000/uploads/${produto.imagem}` : defaultImage} 
                                        alt={produto.name}
                                        className="object-contain h-[156px] w-[143px] mb-4 sm:mb-0 sm:mr-5"
                                    />
                                    <div className="flex-1 text-lg sm:text-xl font-bold text-secondary">
                                        <p>Nome: {produto.Produto.nome}</p>
                                        <p>Quantidade: {produto.quantidade}</p>
                                        <p>Validade: {transformDate(produto.validade)}</p>
                                        <p>Local de Retirada: {`${produto.PostoColetum.nome}, ${produto.PostoColetum.cidade} - ${produto.PostoColetum.estado}`}</p>
                                        <button 
                                            className="px-8 py-2.5 mt-6 text-sm text-primary font-bold bg-third shadow-md w-full sm:w-auto"
                                        >
                                            Ver Detalhes
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