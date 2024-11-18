import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

interface Props {
  isAuthenticated: boolean;
  user: any;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={'/signin'} />;

export const AuthGuard = () => {
  const { logoutf, isAuthenticated, user } = useContext(AuthContext);
  console.log('entro', isAuthenticated, user);
  return user ? (
    isAuthenticated ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={'/signin'} />
  );
};

export default AuthGuard;
