import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes
} from 'react-router-dom';
import { Signin } from '../pages/Signin';
import { Home } from '../pages/Home';
import { Portfoly } from '../pages/Portfoly';
import MainLayout from '../layouts/MainLayout';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { SignUp } from '../pages/SignUp';
import { FormPortfoly } from '../pages/FormPortfoly';
import AuthGuard from '../guards/auth.guard';

const Routes = () => {
  const { logoutf, isAuthenticated, user } = useContext(AuthContext);

  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/my-account" element={<SignUp />} />
          <Route
            path="/form"
            element={
              <AuthGuard user={user} isAuthenticated={isAuthenticated} />
            }
          >
            <Route path="/form" element={<FormPortfoly />} />
            <Route />
          </Route>
        </Route>
        <Route path="/Portfoly" element={<Portfoly />}></Route>
      </RouterRoutes>
    </Router>
  );
};

export default Routes;