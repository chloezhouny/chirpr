import { useState, useEffect } from 'react';
import {
  Button, Form, Toast,
} from 'antd-mobile';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import TInput from '@components/TInput';
import { LoginAPI } from '@utils/LoginAPI';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import styles from './index.module.scss';

const Login = () => {
  const [form] = Form.useForm();
  const [footerBtnDisabled, setFooterBtnDisabled] = useState(true);
  const [, setStore] = useAppContext();
  const goTo = useGoTo();

  useEffect(() => {
    setStore({
      handleClose: null,
      step: null,
    });
  }, []);

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
    const res = await LoginAPI.login(values.username, values.password);
    if (res.success && res.data.length > 0) {
      Toast.show({
        content: 'You are successfully logged in',
        position: 'top',
      });
      Cookies.set('userId', res.data[0].id);
      goTo('home');
      return;
    }
    Toast.show({
      content: 'Wrong username or password!',
    });
  };

  return (
    <>
      <div className={styles.form}>
        <div className={styles.formTitle}>Sign in to Twittuer</div>
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          className={styles.formContainer}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '' }]}
          >
            <TInput label="Phone, email, or username" valid />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '' }]}>
            <TInput label="Password" type="password" valid />
          </Form.Item>
        </Form>
        <Button className={styles.footerBtn} onClick={handleSubmit} disabled={footerBtnDisabled}>
          Log in
        </Button>
      </div>
      <div className={styles.signup}>
        Don&apos;t have an account?
        <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
