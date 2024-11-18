import { Button, Card, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Signin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const response = await login(values.email, values.password);
    if (response) {
      navigate('/form');
    }
  };

  return (
    <Card className="h-fit mt-10">
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item className="mb-0">
          <Flex justify="space-between" align="center">
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item> */}

        <Form.Item className="mb-0">
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <Link to="/my-account">Register now!</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};
