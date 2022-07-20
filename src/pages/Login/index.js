import {
  Button, Input, Form, Dialog,
} from 'antd-mobile';

import loginAPI from '../../utils/LoginAPI';
import './index.css';

function Login() {
  const [form] = Form.useForm();
  const onSubmit = async () => {
    const values = form.getFieldsValue();
    const res = await loginAPI(values.username, values.password);
    if (res && res.length > 0) {
      Dialog.alert({
        content: 'You are successfully logged in',
      });
      return;
    }
    Dialog.alert({
      content: 'Incorrect username or password',
    });
  };
  return (
    <div className="login">
      <Form
        form={form}
        layout="horizontal"
        mode="card"
        footer={(
          <Button block color="primary" onClick={onSubmit} size="large">
            Log in
          </Button>
   )}
      >
        <Form.Item name="username">
          <Input placeholder="Phone, email, or username" />
        </Form.Item>
        <Form.Item name="password">
          <Input placeholder="Password" clearable type="password" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
