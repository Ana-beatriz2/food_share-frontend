import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import transformDate from "../../utils/transformDate";
import defaultImage from "../../assets/postagemDefaultImage.png";
import api from "@/services/api";

export default function DetalhesPostagem() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [postagem, setPostagem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataRetirada, setDataRetirada] = useState("");
    const [quantidadeReserva, setQuantidadeReserva] = useState("");

    useEffect(() => {
        const fetchPostagem = async () => {
            try {
                const response = await api.get(`/postagem/${id}`);
                setPostagem(response.data);
            } catch (err) {
                setError("Erro ao carregar detalhes da postagem.");
            } finally {
                setLoading(false);
            }
        };
        fetchPostagem();
    }, [id]);

    const handleConfirmarReserva = async () => {
        if (!dataRetirada || !quantidadeReserva) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await api.post(`/reserva`, {
                postoColetaId: postagem.postoColetaId,
                produtoId: postagem.Produto.id,
                dataRetirada,
                quantidade: quantidadeReserva
            });
            console.log(response);
            alert("Reserva realizada com sucesso!");
            setIsModalOpen(false);
        } catch (error) {
            alert(`Erro ao reservar: ${error.response?.data?.message || "Erro desconhecido"}`);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Carregando detalhes...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!postagem) return <p className="text-center text-gray-500">Postagem não encontrada.</p>;

    return (
        <div className="flex flex-col items-center pb-20 bg-background mt-10">
            <div className="px-2 sm:px-6 py-10 mx-auto sm:w-full max-w-5xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12">
                    <img
                        src={postagem.imagem ? `http://localhost:3000/uploads/${postagem.imagem}` : defaultImage}
                        alt={postagem.Produto.nome}
                        className="object-cover w-full sm:w-[40%] max-w-lg h-auto sm:h-[500px]"
                    />
                    <div className="flex-1 text-lg sm:text-xl text-secondary text-left self-start">
                        <p>Nome: {postagem.Produto.nome}</p>
                        <p>Marca: {postagem.Produto.marca}</p>
                        <p>Quantidade: {postagem.quantidade}</p>
                        <p>Validade: {transformDate(postagem.validade)}</p>
                        <p>Local de Retirada: {`${postagem.PostoColetum.nome}, ${postagem.PostoColetum.cidade} - ${postagem.PostoColetum.estado}`}</p>
                        <p>Contato Doador: {postagem.Usuario.telefone}</p>

                        <div className="flex gap-4 mt-20">
                            <button onClick={() => navigate('/inicioReceptor')} className="px-8 py-2.5 text-sm text-red-500 font-bold bg-third shadow-md">
                                Voltar
                            </button>
                            <button onClick={() => setIsModalOpen(true)} className="px-8 py-2.5 text-sm text-primary font-bold bg-third shadow-md">
                                RESERVAR
                            </button>
                        </div>
                    </div>
                </div>       
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-background p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-center text-primary">Reserva de Produto</h2>

                        <label className="block text-secondary text-sm font-bold mb-2">
                            Data de Retirada:
                        </label>
                        <input
                            type="date"
                            value={dataRetirada}
                            onChange={(e) => setDataRetirada(e.target.value)}
                            className="w-full bg-background px-3 py-2 border rounded-md mb-4"
                        />

                        <label className="block text-secondary text-sm font-bold mb-2">
                            Quantidade:
                        </label>
                        <input
                            type="number"
                            min="1"
                            max={postagem.quantidade}
                            value={quantidadeReserva}
                            onChange={(e) => setQuantidadeReserva(e.target.value)}
                            className="w-full bg-background px-3 py-2 border rounded-md mb-4"
                        />

                        <div className="flex justify-end gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-md">
                                Cancelar
                            </button>
                            <button onClick={handleConfirmarReserva} className="px-4 py-2 bg-third text-secondary rounded-md">
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
