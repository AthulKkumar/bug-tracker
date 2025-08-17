import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await api.get("/user", { withCredentials: true });
//         setUser(data || null);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

  const login = async (credentials) => {
    const { data } = await api.post("/user/login", credentials, {
      withCredentials: true,
    });
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await api.post("/user/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
