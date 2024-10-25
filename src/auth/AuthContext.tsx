import { createContext, useState } from 'react';
import { authService, logout } from '../services/auth';
import useLocalStorage from 'react-use/lib/useLocalStorage';
const AuthContext = createContext();
const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useLocalStorage('user');

  const login = async (correo: string, contrasena: string) => {
    // const response = await authService({
    //   email: correo,
    //   password: contrasena
    // });
    setUser('JP');
    setIsAuthenticated(true);
  };

  const logoutf = async () => {
    // const response = await logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logoutf, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
