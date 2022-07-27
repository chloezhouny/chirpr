import { useState } from 'react';
import { Button, Input, Form } from 'antd-mobile';

import Header from '@components/Header';
import DatePickerInput from '@components/DatePickerInput';
import styles from './index.module.scss';

const USERNAME_TYPE = {
  PHONE: 'phone',
  EMAIL: 'email',
};
function Signup() {
  const [formData] = useState({
    name: '',
    phone: '',
    email: '',
    birthDate: '',
  });

  const [usernameType, setUsernameType] = useState(USERNAME_TYPE.PHONE);
  const onUsernameTypeChange = () => {
    if (usernameType === USERNAME_TYPE.PHONE) {
      setUsernameType(USERNAME_TYPE.EMAIL);
      return;
    }
    setUsernameType(USERNAME_TYPE.PHONE);
  };

  return (
    <div>
      <Header />
      <div className={styles.form}>
        <div className={styles.formTitle}>Create your account</div>
        <Form initialValues={formData} className={styles.formContainer}>
          <Form.Item name="name">
            <Input placeholder="Name" className={styles.input} />
          </Form.Item>
          {usernameType === USERNAME_TYPE.PHONE && (
          <Form.Item name="phone">
            <Input placeholder="Phone" className={styles.input} />
            {' '}
          </Form.Item>
          )}
          {usernameType === USERNAME_TYPE.EMAIL && (
          <Form.Item name="email">
            <Input placeholder="Email" className={styles.input} />
          </Form.Item>
          )}
          <div className={styles.useEmail} onClick={onUsernameTypeChange}>
            {usernameType === USERNAME_TYPE.PHONE ? 'Use email instead' : 'Use phone instead'}
          </div>
          <div className={styles.birthDateTitle}>Date of birth</div>
          <div className={styles.birthDateContent}>
            This will not be shown publicly.
            Confirm your own age, even if this account is for a business, a pet, or something else.
          </div>
          <Form.Item name="birthDate">
            <DatePickerInput />
          </Form.Item>
        </Form>
      </div>
      <div className={styles.footer}>
        <Button className={styles.footerBtn}>Next</Button>
      </div>
    </div>
  );
}

export default Signup;
