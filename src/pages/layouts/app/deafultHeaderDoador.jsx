import { Outlet } from "react-router-dom";
import logo from '../../../assets/logo-bege.png';

export default function DefaultHeaderDoador() {
    return (
        <div>
            <header className="flex justify-between items-center px-20 py-5 w-full bg-primary">
                <div className="flex items-center gap-6">
                    <img src={logo} alt="Logo" className="mb-2" />
                    
                    <div className="flex items-center text-lg gap-4 ml-14">
                        <button className="bg-primary text-third px-4 py-2 rounded-lg font-bold">
                            Suas Doações
                        </button>
                        <button className="bg-primary text-third px-4 py-2 rounded-lg font-bold">
                            Cadastrar Postagem
                        </button>
                        <button className="bg-primary text-third px-4 py-2 rounded-lg font-bold">
                            Posto de Coleta
                        </button>
                    </div>
                </div>
                <button className="bg-primary">
                    <img
                        src="src/assets/perfil-de-usuario.png"
                        alt="User icon"
                        className="h-[27px] w-[27px]"
                    />
                </button>
            </header>

            <div>
                <Outlet />
            </div>
        </div>
    );
}
