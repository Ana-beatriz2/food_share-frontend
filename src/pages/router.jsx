import { Route, Routes } from "react-router-dom";
import Inicio from "./app/inicio";
import Login from "./auth/login";
import DefaultLayout from "./layouts/app/defaultLayout";
import DeafultHeaderDoador from "./layouts/app/deafultHeaderDoador";
import { UserRegister } from "./app/cadastro";
import { CadastroPostagem } from "./app/cadastroPostagem";

export default function Router() {
    return (
        <Routes> 
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Inicio/>} />
            </Route>
            <Route path="/cadastro" element={<DefaultLayout/>}>
                <Route path="/cadastro" element={<UserRegister/>} />
            </Route>
            <Route path="/login" element={<DefaultLayout/>} >
                <Route path="/login" element={<Login/>} />
            </Route>
            <Route path="/cadastroPostagem" element={<DeafultHeaderDoador/>}>
                <Route path="/cadastroPostagem" element={<CadastroPostagem/>} />
            </Route>
        </Routes>
    )
}