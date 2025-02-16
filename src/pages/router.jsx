import { Routes, Route } from "react-router-dom";
import Inicio from "./app/inicio";
import InicioReceptor from "./app/inicioReceptor";
import Login from "./auth/login";
import DefaultHeaderInicio from "./layouts/app/defaultHeaderInicio";
import DefaultHeaderDoador from "./layouts/app/deafultHeaderDoador";
import DefaultHeaderReceptor from "./layouts/app/deafultHeaderReceptor";
import { UserRegister } from "./app/cadastro";
import { CadastroPostagem } from "./app/cadastroPostagem";
import { CadastroPostoDeColeta } from "./app/cadastroPostoDeColeta";
import InicioPostoDeColeta from "./app/inicioPostoDeColeta";
import VisualizarUsuario from "./app/visualizarUsuario";
import EditarUsuario from "./app/EditarUsuario";

export default function AppRoutes() {
    return (
        <Routes> 
            <Route path="/" element={<DefaultHeaderInicio/>}>
                <Route index element={<Inicio />} />
                <Route path="cadastro" element={<UserRegister />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route path="/cadastroPostagem" element={<DefaultHeaderDoador />}>
                <Route index element={<CadastroPostagem />} />
            </Route>
            <Route path="/inicioReceptor" element={<DefaultHeaderReceptor />}>
                <Route index element={<InicioReceptor />} />
            </Route>
            <Route path="/cadastroPostoDeColeta" element={<DefaultHeaderDoador />}>
                <Route index element={<CadastroPostoDeColeta />} />
            </Route>
            <Route path="/inicioPostoDeColeta" element={<DefaultHeaderDoador />}>
                <Route index element={<InicioPostoDeColeta />} />
            </Route>
            <Route path="/visualizarUsuario" element={<DefaultHeaderDoador />}>
                <Route index element={<VisualizarUsuario />} />
            </Route>
            <Route path="/editar/:usuarioID" element={<EditarUsuario />} />
        </Routes>
    );
}
