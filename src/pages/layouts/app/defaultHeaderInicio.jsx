import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Outlet } from 'react-router-dom';
import logo from '../../../assets/logo-bege.png';

export default function HeaderInicio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  return (
    <div>
      <header className="flex justify-between items-center px-20 py-5 w-full bg-primary">
        <img src={logo} alt="Logo" className="mb-2 hidden md:block" />
        <button className="bg-primary" onClick={toggleMenu}>
          <img
            src="src/assets/menu-aberto.png"
            alt="Menu icon"
            className="h-[50px] w-[50px]"
          />
        </button>

        {menuOpen && (
          <div className="absolute top-20 right-5 bg-white shadow-lg rounded-md p-5 w-40 z-50">
            <ul>
              <li className="mb-2">
                <Link to="http://localhost:5173/cadastro" className="text-primary">Cadastrar</Link>
              </li>
              <li className="mb-2">
                <Link to="http://localhost:5173/login" className="text-primary">Entrar</Link>
              </li>
              <li>
                <Link to="http://localhost:5173/" className="text-primary">Inicio</Link>
              </li>
            </ul>
          </div>
        )}
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
