import {
  Layout,
  Button,
  Drawer,
  Divider,
  Dropdown,
  Avatar,
  MenuProps,
  Image
} from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { AuthContext } from '../auth/AuthContext';

const MainLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated, logoutf, user } = useContext(AuthContext);
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user != undefined) {
      const userJson = JSON.parse(user);
      setUserName(
        userJson
          ? userJson.name
              .split(' ')
              .map((n: string) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
          : 'User'
      );
    }
  }, [user]);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const signOut = async () => {
    const userJson = await JSON.parse(user);
    logoutf(userJson.userId);
    console.log('Sign Out');
    navigate('/');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/form">Editar mi Portafolio</Link>
    },
    {
      key: '2',
      label: <div onClick={signOut}>Log Out</div>
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header className="bg-black">
          <div className="flex justify-between items-center min-h-full text-white">
            <div className="flex items-center">
              <Image
                preview={false}
                src="/Logp.svg"
                alt="Logo quickMP"
                width={40}
                height={40}
              />
              <Link className="text-xl" to="/">
                Quick Minimalist Portfoly
              </Link>
            </div>
            {/* Hamburger Icon for Mobile */}
            <Button
              type="text"
              icon={<MenuOutlined className="text-white" />}
              className="md:hidden"
              onClick={showDrawer}
            />

            {/* Desktop Buttons / Avatar */}
            <div className="hidden md:flex space-x-4">
              {isAuthenticated ? (
                <Dropdown
                  className="cursor-pointer"
                  menu={{ items }}
                  trigger={['click']}
                >
                  <Avatar style={{ backgroundColor: '#87d068' }} size="large">
                    {userName}
                  </Avatar>
                </Dropdown>
              ) : (
                <>
                  <Link to="/signin">Iniciar Sesión</Link>
                  <Link to="/my-account">Registrarme</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <Drawer
            title="Menu"
            placement="right"
            onClose={closeDrawer}
            open={isDrawerOpen}
            className="md:hidden"
          >
            {isAuthenticated ? (
              <>
                {/* <Avatar
                  style={{ backgroundColor: '#87d068', marginBottom: '16px' }}
                  size="large"
                >
                  {userName}
                </Avatar> */}
                <Button danger block onClick={signOut}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">Sign In</Link>
                <Divider />
                <Link to="/my-account">Sign Up</Link>
              </>
            )}
          </Drawer>
        </Header>
        <Content className="flex bg-white justify-center">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
