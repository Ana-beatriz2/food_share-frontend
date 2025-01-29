import { Route, Routes } from "react-router-dom";
import Inicio from "./app/inicio";
import Login from "./auth/login";
import DefaultLayout from "./layouts/app/defaultLayout";
import AuthLayout from "./layouts/auth/authLayout";

export default function Router() {
    return (
        <Routes> 
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Inicio/>} />
            </Route>
            <Route path="/login" element={<AuthLayout/>} >
                <Route path="/login" element={<Login/>} />
            </Route>
        </Routes>
    )
}