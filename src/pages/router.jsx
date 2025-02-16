import { Route, Routes } from "react-router-dom";
import Inicio from "./app/inicio";
import InicioReceptor from "./app/inicioReceptor";
import Login from "./auth/login";
import DefaultHeaderInicio from "./layouts/app/defaultHeaderInicio";
import DefaultHeaderDoador from "./layouts/app/deafultHeaderDoador";
import DefaultHeaderReceptor from "./layouts/app/deafultHeaderReceptor";
import { UserRegister } from "./app/cadastro";
import { CadastroPostagem } from "./app/cadastroPostagem";
import { CadastroPostoDeColeta } from "./app/cadastroPostoDeColeta";
import ReservasReceptor from "./app/reservasReceptor";
import DoacoesDoador from "./app/doacoesDoador";
import DetalhesPostagemReceptor from "./app/detalhesPostagemReceptor";
import DetalhesReserva from "./app/detalhesReserva";
import { UserProvider } from "@/context/AuthContext"; 
import InicioPostoDeColeta from "./app/inicioPostoDeColeta";

export default function Router() {
    return (
        <UserProvider>
        <Routes> 
            <Route path="/" element={<DefaultHeaderInicio/>}>
                <Route index element={<Inicio />} />
                <Route path="cadastro" element={<UserRegister />} />
                <Route path="login" element={<Login />} />
            </Route>

            {/* Doador */}
            <Route path="/cadastroPostagem" element={<DefaultHeaderDoador />}>
                <Route index element={<CadastroPostagem />} />
            </Route>
            <Route path="/cadastroPostoDeColeta" element={<DefaultHeaderDoador />}>
                <Route index element={<CadastroPostoDeColeta />} />
            </Route>
            <Route path="/doacoesDoador" element={<DefaultHeaderDoador />}>
                <Route index element={<DoacoesDoador />} />
            </Route>
            <Route path="/inicioPostoDeColeta" element={<DefaultHeaderDoador />}>
                <Route index element={<InicioPostoDeColeta />} />
            </Route>

            {/* Receptor */}
            <Route path="/inicioReceptor" element={<DefaultHeaderReceptor />}>
                <Route index element={<InicioReceptor />} />
            </Route>
            <Route path="/reservasReceptor" element={<DefaultHeaderReceptor />}>
                <Route index element={<ReservasReceptor />} />
            </Route>
            <Route path="/detalhesPostagemReceptor/:id" element={<DefaultHeaderReceptor />}>
                <Route index element={<DetalhesPostagemReceptor />} />
            </Route>
            <Route path="/detalhesReserva/:id" element={<DefaultHeaderReceptor />}>
                <Route index element={<DetalhesReserva />} />
            </Route>
        </Routes>
        </UserProvider>
    )
}