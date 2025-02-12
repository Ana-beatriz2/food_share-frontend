import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token); 
        const userId = decoded.id;

        const response = await axios.get(`http://localhost:3000/api/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data); 
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export { UserProvider };
export const useUser = () => useContext(UserContext);