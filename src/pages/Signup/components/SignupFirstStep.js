import { useState } from 'react';
import { Form } from 'antd-mobile';
import { PropTypes } from 'prop-types';
import DatePickerInput from '@components/DatePickerInput';
import TInput from '@components/TInput';
import Footer from './Footer';
import styles from '../index.module.scss';

const ACCOUNT_TYPE = {
  PHONE: 'phone',
  EMAIL: 'email',
};
function SignupFirstStep({ handleNextStep }) {
  const [form] = Form.useForm();

  const [formData] = useState({
    username: '',
    phone: '',
    email: '',
    birthDate: '',
  });

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.PHONE);
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);

  const [footerBtnDisabled, setFooterBtnDisabled] = useState(true);

  const onUsernameTypeChange = () => {
    if (accountType === ACCOUNT_TYPE.PHONE) {
      setAccountType(ACCOUNT_TYPE.EMAIL);
      return;
    }
    setAccountType(ACCOUNT_TYPE.PHONE);
  };

  const handleNext = async () => {
    const validated = await form.validateFields();
    if (validated) {
      handleNextStep(validated);
    }
  };

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

  const checkName = (_, val) => {
    if (val.length > 0) {
      setValidName(true);
      return Promise.resolve();
    }
    setValidName(false);
    return Promise.reject(new Error("What's your name?"));
  };

  const checkPhone = (_, val) => {
    const phoneRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
    if (phoneRegex.test(val)) {
      setValidPhone(true);
      return Promise.resolve();
    }
    setValidPhone(false);
    return Promise.reject(new Error('Please enter a valid phone number.'));
  };

  const checkEmail = (_, val) => {
    const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/g;
    if (emailRegex.test(val)) {
      setValidEmail(true);
      return Promise.resolve();
    }
    setValidEmail(false);
    return Promise.reject(new Error('Please enter a valid email.'));
  };

  return (
    <>
      <div className={styles.form}>
        <div className={styles.formTitle}>Create your account</div>
        <Form
          form={form}
          initialValues={formData}
          onValuesChange={handleValuesChange}
          className={styles.formContainer}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '' }, { validator: checkName }]}
          >
            <TInput length={50} label="Name" valid={validName} />
          </Form.Item>
          {accountType === ACCOUNT_TYPE.PHONE && (
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: '' },
                { validator: checkPhone },
              ]}
            >
              <TInput label="Phone" valid={validPhone} />
            </Form.Item>
          )}
          {accountType === ACCOUNT_TYPE.EMAIL && (
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: '',
                },
                { validator: checkEmail },
              ]}
            >
              <TInput label="Email" valid={validEmail} />
            </Form.Item>
          )}
          <div className={styles.useEmail} onClick={onUsernameTypeChange}>
            {accountType === ACCOUNT_TYPE.PHONE
              ? 'Use email instead'
              : 'Use phone instead'}
          </div>
          <div className={styles.birthDateTitle}>Date of birth</div>
          <div className={styles.birthDateContent}>
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </div>
          <Form.Item
            name="birthDate"
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <DatePickerInput />
          </Form.Item>
        </Form>
      </div>
      <Footer
        handleNext={handleNext}
        disabled={footerBtnDisabled}
        btnLabel="Next"
      />
    </>
  );
}

SignupFirstStep.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default SignupFirstStep;
