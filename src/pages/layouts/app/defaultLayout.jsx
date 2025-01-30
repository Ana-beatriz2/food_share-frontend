import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return(
        <div>
            <div> 
            <header className="flex justify-between items-center px-20 py-5 w-full bg-primary">
            Logo
            <button className="bg-primary">
                <img
                    src="src/assets/perfil-de-usuario.png"
                    alt="User icon"
                    className="h-[27px] w-[27px]"
                />
            </button>
        </header>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}