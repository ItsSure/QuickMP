import { Button, Card, Divider, Form, Input, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
export const FormPortfoly = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Card title="Form Portfoly" className="h-fit my-10 w-[700px]">
      <Form
        form={form}
        name="CV"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86'
        }}
        style={{ maxWidth: 700 }}
        scrollToFirstError
      >
        <Form.Item
          label="Nombre Completo"
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
          label="Título Profesional"
          name="label"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su título!'
            }
          ]}
        >
          <Input placeholder="Título" />
        </Form.Item>

        <Form.Item
          label="URL de la Imagen"
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
          label="Correo Electrónico"
          name="email"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su correo!'
            },
            {
              type: 'email',
              message: 'Por favor ingrese un correo válido!'
            }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese su teléfono!'
            },
            {
              type: 'number',
              message: 'Por favor ingrese un teléfono válido!'
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
          label="Resumen Profesional"
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

        <Form.Item
          label="Ciudad"
          name="city"
          rules={[{ required: true, message: 'Por favor, ingresa la ciudad' }]}
        >
          <Input placeholder="Ciudad" />
        </Form.Item>

        <Form.Item
          label="País"
          name="region"
          rules={[{ required: true, message: 'Por favor, ingresa la región' }]}
        >
          <Input placeholder="País" />
        </Form.Item>

        <Divider plain>Redes Sociales</Divider>

        <Form.List name="profiles">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="center"
                >
                  <Form.Item
                    {...restField}
                    label="Red Social"
                    name={[name, 'network']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, Ingrese una Red social'
                      }
                    ]}
                  >
                    <Input placeholder="Red Social" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Nombre de Usuario"
                    name={[name, 'username']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese un nombre de usuario'
                      }
                    ]}
                  >
                    <Input placeholder="Nombre de usuario" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Enlace"
                    name={[name, 'url']}
                    rules={[
                      { required: true, message: 'Por favor, ingrese una URL' }
                    ]}
                  >
                    <Input placeholder="Enlace" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Agregar Red Social
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Button type="primary" htmlType="submit" className="float-right">
          Guardar
        </Button>
      </Form>
    </Card>
  );
};
