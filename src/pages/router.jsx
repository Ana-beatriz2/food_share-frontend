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

export default function Router() {
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
        </Routes>
    )
}