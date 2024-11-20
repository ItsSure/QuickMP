import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Switch
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createOrUpdatePortfolio } from '../services/portfoly';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const { TextArea } = Input;
export const FormPortfoly = () => {
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    messageApi.open({
      type: 'loading',
      content: 'Login in progress..',
      duration: 0
    });
    const userJson = await JSON.parse(user);
    const { data, error } = await createOrUpdatePortfolio(
      userJson.userId,
      values
    );
    messageApi.destroy();
    if (data) {
      messageApi.open({
        type: 'success',
        content: `Cambios en el portafolio guardados!`
      });
    }
  };

  const handlePhoneChange = (part: any, value: any) => {
    const phoneCode = form.getFieldValue('phoneCode') || '57';
    const phoneNumber = form.getFieldValue('phoneNumber') || '';

    if (part === 'code') {
      form.setFieldsValue({
        phoneCode: value,
        phone: `+${value} ${phoneNumber}`
      });
    } else {
      form.setFieldsValue({
        phoneNumber: value,
        phone: `+${phoneCode} ${value}`
      });
    }
  };

  return (
    <Card title="Form Portfoly" className="h-fit my-10 w-[700px]">
      {contextHolder}
      <Form
        form={form}
        name="CV"
        layout="vertical"
        onFinish={onFinish}
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
          <Input placeholder="Nombre Completo" allowClear />
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
          <Input placeholder="Título" allowClear />
        </Form.Item>

        <Form.Item
          label="URL de la Imagen"
          name="image"
          rules={[
            {
              required: false,
              message: 'Por favor ingrese el enlace de su imagen!'
            }
          ]}
        >
          <Input placeholder="URL de la imagen" allowClear />
        </Form.Item>

        <Form.Item
          label="Correo Electrónico"
          name="email"
          rules={[
            {
              required: false,
              message: 'Por favor ingrese su correo!'
            },
            {
              type: 'email',
              message: 'Por favor ingrese un correo válido!'
            }
          ]}
        >
          <Input placeholder="Email" allowClear />
        </Form.Item>

        <Form.Item name="phone" hidden>
          <input />
        </Form.Item>
        <Space.Compact className="w-full">
          <Form.Item
            name="phoneCode"
            initialValue="57"
            noStyle
            rules={[
              { required: true, message: 'Por favor ingrese el código!' }
            ]}
          >
            <InputNumber
              addonBefore="+"
              style={{ width: '20%' }}
              controls={false}
              onChange={(value) => handlePhoneChange('code', value)}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: 'Por favor ingrese su teléfono!' }
            ]}
            noStyle
          >
            <InputNumber
              controls={false}
              style={{ width: '80%' }}
              placeholder="Teléfono"
              onChange={(value) => handlePhoneChange('number', value)}
            />
          </Form.Item>
        </Space.Compact>

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
          <TextArea placeholder="Resumen" allowClear />
        </Form.Item>

        <Form.Item
          label="Ciudad"
          name="city"
          rules={[{ required: false, message: 'Por favor, ingresa la ciudad' }]}
        >
          <Input placeholder="Ciudad" allowClear />
        </Form.Item>

        <Form.Item
          label="País"
          name="region"
          rules={[{ required: false, message: 'Por favor, ingresa la región' }]}
        >
          <Input placeholder="País" allowClear />
        </Form.Item>

        <Divider plain>Redes Sociales</Divider>

        <Form.List name="profiles">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: '20px',
                    border: '1px solid #0A0A0A',
                    borderRadius: 4,
                    padding: 8
                  }}
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
                    <Select
                      style={{ width: 120 }}
                      placeholder="Red social"
                      options={[
                        { value: 'LinkedIn', label: 'LinkedIn' },
                        { value: 'GitHub', label: 'GitHub' },
                        { value: 'X', label: 'X' }
                      ]}
                    />
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
                    <Input placeholder="Nombre de usuario" allowClear />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Enlace"
                    name={[name, 'url']}
                    rules={[
                      { required: true, message: 'Por favor, ingrese una URL' }
                    ]}
                  >
                    <Input placeholder="Enlace" allowClear />
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

        <Divider plain>Experiencia Laboral</Divider>

        <Form.List name="works">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '20px',
                    border: '1px solid #0A0A0A',
                    borderRadius: 4,
                    padding: 8
                  }}
                  classNames={{ item: 'flex justify-center w-full' }}
                >
                  <Form.Item
                    {...restField}
                    label="Nombre de la Empresa"
                    name={[name, 'name']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, Ingrese el nombre de la empresa'
                      }
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="Nombre de la empresa" allowClear />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Cargo"
                    name={[name, 'position']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese un cargo'
                      }
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="Cargo" allowClear />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Enlace"
                    name={[name, 'url']}
                    rules={[
                      { required: false, message: 'Por favor, ingrese una URL' }
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="Enlace" allowClear />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Fecha Inicio"
                    name={[name, 'startDate']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese una fecha'
                      }
                    ]}
                    className="w-full"
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Fecha Fin"
                    name={[name, 'endDate']}
                    rules={[
                      {
                        required: false,
                        message: 'Por favor, ingrese una fecha'
                      }
                    ]}
                    className="w-full"
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Resumen"
                    name={[name, 'summary']}
                    rules={[
                      {
                        required: false,
                        message: 'Por favor, ingrese un resumen'
                      }
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="Enlace" allowClear />
                  </Form.Item>
                  <MinusCircleOutlined
                    className="mb-4"
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Agregar Experiencia Laboral
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider plain>Educación</Divider>

        <Form.List name="educations">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '20px',
                    border: '1px solid #0A0A0A',
                    borderRadius: 4,
                    padding: 8
                  }}
                  classNames={{ item: 'flex justify-center w-full' }}
                >
                  <Form.Item
                    {...restField}
                    label="Nombre de la institución"
                    name={[name, 'institution']}
                    rules={[
                      {
                        required: true,
                        message:
                          'Por favor, Ingrese el nombre de la institución'
                      }
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="Nombre de la institución" allowClear />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Enlace"
                    name={[name, 'url']}
                    rules={[
                      { required: false, message: 'Por favor, ingrese una URL' }
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="Enlace" allowClear />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Area"
                    name={[name, 'area']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese area'
                      }
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="ejemplo: Ingeniería" allowClear />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Fecha Inicio"
                    name={[name, 'startDate']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese una fecha'
                      }
                    ]}
                    className="w-full"
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Fecha Fin"
                    name={[name, 'endDate']}
                    rules={[
                      {
                        required: false,
                        message: 'Por favor, ingrese una fecha'
                      }
                    ]}
                    className="w-full"
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>

                  <MinusCircleOutlined
                    className="mb-4"
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Agregar estudios
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider plain>Proyectos</Divider>

        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '20px',
                    border: '1px solid #0A0A0A',
                    borderRadius: 4,
                    padding: 8
                  }}
                  classNames={{ item: 'flex justify-center w-full' }}
                >
                  <Form.Item
                    {...restField}
                    label="Nombre del proyecto"
                    name={[name, 'name']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, Ingrese el nombre del proyecto'
                      }
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="Nombre del proyecto" allowClear />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Activo?"
                    name={[name, 'isActive']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, seleccione si esta activo'
                      }
                    ]}
                    className="w-full"
                  >
                    <Switch defaultChecked={false} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Descripción"
                    name={[name, 'description']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese una descripción'
                      }
                    ]}
                    className="w-full"
                  >
                    <TextArea placeholder="Descripción" allowClear />
                  </Form.Item>

                  <Form.List name={[name, 'highlights']}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: 'flex',
                              marginBottom: '20px',
                              border: '1px solid #0A0A0A',
                              borderRadius: 4,
                              padding: 8
                            }}
                            align="center"
                          >
                            <Form.Item
                              {...restField}
                              label="Tecnología"
                              name={[name, 'highlight']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Por favor, ingrese una tecnología'
                                }
                              ]}
                              className="w-full"
                            >
                              <Input placeholder="Tecnología" allowClear />
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
                            Agregar tecnologías
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Form.Item
                    {...restField}
                    label="Enlace"
                    name={[name, 'url']}
                    rules={[
                      { required: false, message: 'Por favor, ingrese una URL' }
                    ]}
                    className="w-full"
                  >
                    <Input placeholder="Enlace" allowClear />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="Github"
                    name={[name, 'github']}
                    rules={[
                      { required: false, message: 'Por favor, ingrese una URL' }
                    ]}
                    className="w-full"
                  >
                    <Input
                      placeholder="Enlace del repositorio Github"
                      allowClear
                    />
                  </Form.Item>

                  <MinusCircleOutlined
                    className="mb-4"
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Agregar proyectos
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider plain>Habilidades</Divider>

        <Form.List name="skill">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    border: '1px solid #0A0A0A',
                    borderRadius: 4,
                    padding: 8
                  }}
                  align="center"
                >
                  <Form.Item
                    {...restField}
                    label="Tecnología"
                    name={[name, 'name']}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, ingrese una tecnología'
                      }
                    ]}
                    className="w-full"
                  >
                    <Select
                      style={{ width: 120 }}
                      options={[
                        { value: 'HTML', label: 'HTML' },
                        { value: 'CSS', label: 'CSS' },
                        { value: 'JavaScript', label: 'JavaScript' },
                        { value: 'Tailwind', label: 'Tailwind' },
                        { value: 'TypeScript', label: 'TypeScript' },
                        { value: 'Node', label: 'Node' },
                        { value: 'MySQL', label: 'MySQL' },
                        { value: 'Git', label: 'Git' },
                        { value: 'GitHub', label: 'GitHub' },
                        { value: 'Next.js', label: 'Next' },
                        { value: 'React', label: 'React' },
                        { value: 'React Native', label: 'React Native' }
                      ]}
                    />
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
                  Agregar habilidades tecnológicas
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
