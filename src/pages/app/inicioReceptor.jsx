import { useEffect, useState } from "react";
import transformDate from '../../utils/transformDate';
import defaultImage from "../../assets/postagemDefaultImage.png";
import api from "@/services/api";

export default function InicioReceptor() {
    const [produtos, setProdutos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await api.get("/postagem"); 
                setProdutos(response.data);
            } catch (err) {
                setError("Erro ao carregar produtos.");
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <div className="flex overflow-hidden flex-col pb-20 bg-orange-50">
            <div className="px-5 py-0 mx-auto my-0 w-full max-w-[1200px]">
                <h1 className="mx-0 mt-10 mb-12 text-4xl font-bold text-center text-primary">
                    Doações Disponíveis
                </h1>

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
                                    className="flex gap-5 p-5 mb-9 border border-zinc-300 shadow-md max-md:flex-col max-md:items-center"
                                >
                                    <img
                                        src={produto.imagem != null ? `http://localhost:3000/uploads/${produto.imagem}` : defaultImage} 
                                        alt={produto.name}
                                        className="object-contain h-[156px] w-[143px]"
                                    />
                                    <div className="flex-1 text-xl font-bold text-secondary">
                                        <p>Nome: {produto.Produto.nome}</p>
                                        <p>Quantidade: {produto.quantidade}</p>
                                        <p>Validade: {transformDate(produto.validade)}</p>
                                        <p>Local de Retirada: {`${produto.PostoColetum.nome}, ${produto.PostoColetum.cidade} - ${produto.PostoColetum.estado}`}</p>
                                        <button className="px-8 py-2.5 ml-12 mt-6 text-sm text-primary font-bold bg-third shadow-md">
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
