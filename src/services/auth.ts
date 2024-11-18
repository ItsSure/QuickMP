import { useFetch } from '../Utils/useFetch';

export const refresh = async () => {
  const response = await useFetch(`auth/refresh`);
  return response;
};

export const signIn = async (email: string, password: string) => {
  const response = await useFetch(`auth/signin`, {
    method: 'POST',
    body: {
      email,
      password
    }
  });
  return response;
};

export const signUp = async (email: string, name: string, password: string) => {
  const response = await useFetch(`auth/signup`, {
    method: 'POST',
    body: {
      email,
      name,
      password
    }
  });
  return response;
};

export const logout = async (userId: number) => {
  const userToINT = Number(userId);
  const response = await useFetch(`auth/logout/${userToINT}`, {
    method: 'POST'
  });
  return response;
};
