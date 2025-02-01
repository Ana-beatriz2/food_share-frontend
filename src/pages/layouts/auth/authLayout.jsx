import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return(
        <div>
            <div> 
                <h1>Olá</h1>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}