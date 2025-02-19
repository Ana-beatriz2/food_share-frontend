import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/logo-bege.png";

export default function DefaultHeaderDoador() {
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
                            onClick={() => navigate("/doacoesDoador")}
                            className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                        >
                            Suas Doações
                        </button>
                        <button
                            onClick={() => navigate("/cadastroPostagem")}
                            className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                        >
                            Cadastrar Postagem
                        </button>
                        <button
                            onClick={() => navigate("/inicioPostoDeColeta")}
                            className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                        >
                            Posto de Coleta
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
                        onClick={() => navigate("/doacoesDoador")}
                        className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                    >
                        Suas Doações
                    </button>
                    <button
                        onClick={() => navigate("/cadastroPostagem")}
                        className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                    >
                        Cadastrar Postagem
                    </button>
                    <button
                        onClick={() => navigate("/inicioPostoDeColeta")}
                        className="bg-primary text-third px-4 py-2 rounded-lg font-bold"
                    >
                        Posto de Coleta
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="text-third px-4 py-2 font-bold bg-primary transition duration-300"
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
