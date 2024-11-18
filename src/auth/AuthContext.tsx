import { createContext, useEffect, useMemo, useState } from 'react';
import { logout, refresh, signIn, signUp } from '../services/auth';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { message } from 'antd';
const AuthContext = createContext<any>({});
const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useLocalStorage('user');
  const [responseRefresh, setResponseRefresh] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchRefresh = async () => {
    const response = await refresh();
    setResponseRefresh(response);
  };

  useEffect(() => {
    fetchRefresh();
  }, []);

  useEffect(() => {
    if (responseRefresh) {
      const { data, error } = responseRefresh;
      console.log(data);
      if (data) {
        console.log(data, error);
        setUser(JSON.stringify(data.user));
        setIsAuthenticated(true);
      }
    }
  }, [responseRefresh]);

  const login = async (correo: string, contrasena: string) => {
    messageApi.open({
      type: 'loading',
      content: 'Login in progress..',
      duration: 0
    });
    console.log('login', correo, contrasena);
    const { data, error } = await signIn(correo, contrasena);
    console.log(data, error);
    messageApi.destroy();
    if (data.user) {
      messageApi.open({
        type: 'success',
        content: `Bienvenido ${data.user.name}`
      });
      setUser(JSON.stringify(data.user));
      setIsAuthenticated(true);
      return true;
    } else {
      messageApi.open({
        type: 'error',
        content: `${error}`
      });
      return false;
    }
  };

  const signUpF = async (email: string, name: string, password: string) => {
    messageApi.open({
      type: 'loading',
      content: 'Register in progress..'
    });
    const { data, error } = await signUp(email, name, password);
    messageApi.destroy();
    if (data) {
      messageApi.open({
        type: 'success',
        content: `Bienvenido ${name}, el registro fue exitoso!`
      });
      return true;
    } else {
      messageApi.open({
        type: 'error',
        content: `${error}`
      });
      return false;
    }
  };

  const logoutf = async (userId: number) => {
    messageApi.open({
      type: 'loading',
      content: 'Login in progress..',
      duration: 0
    });
    const { data, error } = await logout(userId);
    console.log(data, error);
    messageApi.destroy();
    if (data) {
      messageApi.open({
        type: 'success',
        content: `Goodbye!`
      });
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logoutf,
      user,
      signUpF
    }),
    [isAuthenticated, login, logoutf, user, signUpF]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
