import { useEffect, useState } from "react";
import transformDate from '../../utils/transformDate';
import defaultImage from "../../assets/postagemDefaultImage.png";
import { useNavigate } from 'react-router-dom';
import api from "@/services/api";

export default function ReservasReceptor() {
    const [reservas, setReservas] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await api.get("/reserva/receptor"); 
                console.log(response);
                setReservas(response.data);
            } catch (err) {
                console.log(err)
                setError("Erro ao carregar produtos.");
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);


     const handleDelete = async (reservaId) => {
        try {
            await api.delete(`/reserva/${reservaId}`);
            alert('Reserva deletada com sucesso!');
            window.location.reload();
        } catch (error){
            alert(`Houve um erro ao excluir a postagem: ${error.response.data.message}`);
        }
    }

    return (
        <div className="flex overflow-auto flex-col pb-20 bg-orange-50">
            <div className="px-4 sm:px-6 py-0 mx-auto my-0 w-full max-w-full sm:max-w-[1200px]">
                <h1 className="mx-0 mt-10 mb-12 text-3xl sm:text-4xl font-bold text-center text-primary">
                    Suas Reservas
                </h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {loading ? (
                    <p className="text-center text-gray-500">Carregando produtos...</p>
                ) : (
                    <>
                        {reservas.length === 0 ? (
                            <p className="text-center text-gray-500">Nenhuma reserva encontrada.</p>
                        ) : (
                            reservas.map((reserva) => (
                                <div
                                    key={reserva.id}
                                    className="flex gap-5 p-5 mb-9 border border-zinc-300 shadow-md flex-col sm:flex-row sm:items-center"
                                >
                                    <img
                                        src={reserva.postagem.imagem != null ? `http://localhost:3000/uploads/${reserva.postagem.imagem}` : defaultImage} 
                                        alt={reserva.ReservaProdutos.Produto.nome}
                                        className="object-contain h-[156px] w-[143px] mb-4 sm:mb-0 sm:mr-5"
                                    />
                                    <div className="flex-1 text-lg sm:text-xl font-bold text-secondary">
                                        <p>Nome: {reserva.ReservaProdutos.Produto.nome}</p>
                                        <p>Quantidade: {reserva.ReservaProdutos.quantidade}</p>
                                        <p>Data Retirada: {reserva.dataRetirada != null ? transformDate(reserva.dataRetirada) : ''}</p>
                                        <p>Local de Retirada: {`${reserva.PostoColetum.nome}, ${reserva.PostoColetum.cidade} - ${reserva.PostoColetum.estado}`}</p>
                                        <button onClick={() => navigate(`/detalhesReserva/${reserva.id}`)} className="px-8 py-2.5 ml-0 sm:ml-12 mt-6 text-sm text-primary font-bold bg-third shadow-md">
                                            Ver Detalhes
                                        </button>
                                        <button onClick={() => handleDelete(reserva.id)} className="px-8 py-2.5 ml-0 sm:ml-12 mt-6 text-sm text-red-500 font-bold bg-third shadow-md">
                                            EXCLUIR RESERVA
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
