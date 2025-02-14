import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import transformDate from "../../utils/transformDate";
import defaultImage from "../../assets/postagemDefaultImage.png";
import api from "@/services/api";

export default function DetalhesReserva() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [reserva, setPostagem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchPostagem = async () => {
            try {
                const response = await api.get(`/reserva/${id}`);
                console.log(response);
                setPostagem(response.data);
            } catch (err) {
                setError("Erro ao carregar detalhes da reserva.");
            } finally {
                setLoading(false);
            }
        };
        fetchPostagem();
    }, [id]);


    if (loading) return <p className="text-center text-gray-500">Carregando detalhes...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!reserva) return <p className="text-center text-gray-500">Postagem não encontrada.</p>;

    return (
        <div className="flex flex-col items-center pb-20 bg-background mt-10">
            <div className="px-2 sm:px-6 py-10 mx-auto sm:w-full max-w-5xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12">
                    <img
                        src={reserva.imagem ? `http://localhost:3000/uploads/${reserva.imagem}` : defaultImage}
                        alt={reserva.ReservaProdutos[0].Produto.nome}
                        className="object-cover w-full sm:w-[40%] max-w-lg h-auto sm:h-[500px]"
                    />
                    <div className="flex-1 text-lg sm:text-xl text-secondary text-left self-start">
                        <p>Nome: {reserva.ReservaProdutos[0].Produto.nome}</p>
                        <p>Marca: {reserva.ReservaProdutos[0].Produto.marca}</p>
                        <p>Quantidade: {reserva.ReservaProdutos[0].quantidade}</p>
                        {/* <p>Validade: {transformDate(postagem.validade)}</p> */}
                        <p>Local de Retirada: {`${reserva.PostoColetum.nome}, ${reserva.PostoColetum.cidade} - ${reserva.PostoColetum.estado}`}</p>
                        {/* <p>Contato Doador: {postagem.Usuario.telefone}</p> */}

                        <div className="flex gap-4 mt-20">
                            <button onClick={() => navigate('/reservasReceptor')} className="px-8 py-2.5 text-sm text-primary font-bold bg-third shadow-md">
                                Voltar
                            </button>
                            <button className="px-8 py-2.5 text-sm text-primary font-bold bg-third shadow-md">
                                RESERVADO
                            </button>
                            <button className="px-8 py-2.5 text-sm text-red-500 font-bold bg-third shadow-md">
                                EXCLUIR RESERVA
                            </button>
                        </div>
                    </div>
                </div>       
            </div>
        </div>
    );
}
