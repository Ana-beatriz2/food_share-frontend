import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return(
        <div>
            <div> 
                <h1>Olá app</h1>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}