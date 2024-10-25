import {
  Layout,
  Button,
  Drawer,
  Divider,
  Dropdown,
  Avatar,
  MenuProps
} from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { AuthContext } from '../auth/AuthContext';

const MainLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated, logoutf } = useContext(AuthContext);

  const userInitials = 'JP';

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const signOut = () => {
    logoutf();
    console.log('Sign Out');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={signOut}>Log Out</div>
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header>
          <div className="flex justify-between items-center min-h-full text-white">
            {/* Logo */}
            <div className="text-xl">Quick Minimalist Portfoly</div>

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
                <Dropdown menu={{ items }} trigger={['click']}>
                  <Avatar style={{ backgroundColor: '#87d068' }} size="large">
                    {userInitials}
                  </Avatar>
                </Dropdown>
              ) : (
                <>
                  <Link to="/signin">Sign In</Link>
                  <Link to="/my-account">Sign Up</Link>
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
                  {userInitials}
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
        <Content className="flex justify-center m-2">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
