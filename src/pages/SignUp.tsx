import { Button, Card, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { useContext } from 'react';

export const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { signUpF } = useContext(AuthContext);

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    if (values.agreement) {
      const response = await signUpF(
        values.email,
        values.name,
        values.password
      );
      if (response) {
        form.resetFields();
        navigate('/signin');
      }
    }
  };
  return (
    <Card className="h-fit mt-10">
      <Form
        form={form}
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: 360 }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            {
              type: 'string',
              message: 'The input is not valid full name!'
            },
            {
              required: true,
              message: 'Please enter your full name!'
            }
          ]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              }
            })
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item
          name="agreement"
          className="mb-0"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement'))
            }
          ]}
        >
          <Checkbox>
            He leído el{' '}
            <span className="cursor-pointer text-blue-600"> acuerdo</span>
          </Checkbox>
        </Form.Item>
        <Form.Item className="mb-0">
          <Button block type="primary" htmlType="submit">
            Registrar
          </Button>
          <Link to="/signin">Ya tienes una cuenta?</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};
