import { Card, Form, Input, InputNumber } from 'antd';
const { TextArea } = Input;
export const FormPortfoly = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Card title="Form Portfoly" className="h-fit mt-10 w-[600px]">
      <Form
        form={form}
        name="CV"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86'
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su nombre!'
            }
          ]}
        >
          <Input placeholder="Nombre Completo" />
        </Form.Item>

        <Form.Item
          name="label"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su titulo!'
            }
          ]}
        >
          <Input placeholder="Titulo" />
        </Form.Item>

        <Form.Item
          name="image"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese el enlace de su imagen!'
            }
          ]}
        >
          <Input placeholder="URL de la imagen" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su correo!'
            },
            {
              type: 'email',
              message: 'Por favor ingrese un correo valido!'
            }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su teléfono!'
            },
            {
              type: 'number',
              message: 'Por favor ingrese un teléfono valido!'
            }
          ]}
        >
          <InputNumber
            className="w-full"
            controls={false}
            placeholder="Teléfono"
          />
        </Form.Item>

        <Form.Item
          name="summary"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese una descripción!'
            }
          ]}
        >
          <TextArea placeholder="Resumen" />
        </Form.Item>
      </Form>
    </Card>
  );
};
