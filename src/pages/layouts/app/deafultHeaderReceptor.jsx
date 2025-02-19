import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/logo-bege.png";

export default function DefaultHeaderReceptor() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="flex justify-between items-center px-6 sm:px-20 py-5 w-full bg-primary">
                <div className="flex items-center gap-6">
                    <img src={logo} alt="Logo" className="mb-2 h-12 sm:h-16" />

                    <div className="hidden sm:flex items-center text-lg gap-4 ml-14">
                        <button
                            onClick={() => navigate("/suasReservas")}
                            className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                        >
                            Suas Reservas
                        </button>
                        <button
                            onClick={() => navigate("/doacoesDisponiveis")}
                            className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                        >
                            Doações Disponíveis
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="bg-primary">
                        <img
                            src="src/assets/perfil-de-usuario.png"
                            alt="User icon"
                            className="h-[27px] w-[27px]"
                        />
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="bg-transparent text-black border border-red-600 px-4 py-2 rounded-lg font-bold transition duration-300 hover:bg-red-600 hover:text-white"
                    >
                        Logout
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="sm:hidden text-third focus:outline-none bg-primary"
                    >
                        <img
                            src="src/assets/menu-aberto.png"
                            alt="Menu"
                            className="h-6 w-6"
                        />
                    </button>
                </div>
            </header>

            {isMenuOpen && (
                <div className="sm:hidden flex flex-col items-center bg-primary p-4 gap-3">
                    <button
                        onClick={() => navigate("/suasReservas")}
                        className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                    >
                        Suas Reservas
                    </button>
                    <button
                        onClick={() => navigate("/doacoesDisponiveis")}
                        className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                    >
                        Doações Disponíveis
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="bg-transparent text-black border border-red-600 px-4 py-2 rounded-lg font-bold transition duration-300 hover:bg-red-600 hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            )}

            <div>
                <Outlet />
            </div>
        </div>
    );
}
