import { useState } from 'react';
import {
  Button, Form, Toast,
} from 'antd-mobile';
import TInput from '@components/TInput';
import loginAPI from '@utils/LoginAPI';
import logo from '../../assets/bird.png';
import styles from './index.module.scss';

function Login() {
  const [form] = Form.useForm();
  const [footerBtnDisabled, setFooterBtnDisabled] = useState(true);

  const handleValuesChange = async () => {
    try {
      const validated = await form.validateFields();
      if (validated) {
        setFooterBtnDisabled(false);
        return;
      }
    } catch (e) {
      if (e.errorFields.length === 0) {
        setFooterBtnDisabled(false);
        return;
      }
      setFooterBtnDisabled(true);
    }
  };

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    const res = await loginAPI(values.username, values.password);
    if (res.success && res.data.length > 0) {
      console.log(res);
      Toast.show({
        content: 'You are successfully logged in',
        position: 'top',
      });
      return;
    }
    Toast.show({
      content: 'Wrong username or password!',
    });
  };

  return (
    <>
      <header>
        <img src={logo} alt="twittuer-logo" className={styles.logo} />
      </header>
      <div className={styles.form}>
        <div className={styles.formTitle}>Sign in to Twittuer</div>
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          className={styles.formContainer}
        >
          <Form.Item name="username" rules={[{ required: true, message: '' }]}>
            <TInput label="Phone, email, or username" valid="1" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '' }]}>
            <TInput label="Password" type="password" valid="1" />
          </Form.Item>
        </Form>
        <Button className={styles.footerBtn} onClick={handleSubmit} disabled={footerBtnDisabled}>
          Log in
        </Button>
      </div>
      <div className={styles.signup}>
        Don&apos;t have an account?
        <a href="/" target="_blank">Sign up</a>
      </div>
    </>
  );
}

export default Login;
