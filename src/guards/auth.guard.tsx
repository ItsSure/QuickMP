import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isAuthenticated: boolean;
  user: any;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={'/signin'} />;

export const AuthGuard = ({ isAuthenticated, user }: Props) => {
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
