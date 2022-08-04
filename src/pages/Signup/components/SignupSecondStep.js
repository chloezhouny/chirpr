import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd-mobile';
import moment from 'moment';
import TInput from '@components/TInput';
import Footer from './Footer';
import styles from '../index.module.scss';

function SignupSecondStep({
  userInfo, handleSignupSubmit, setSigupFirstStepStore,
}) {
  const [form] = Form.useForm();
  const [password, setPassword] = useState();
  const [footerBtnDisabled, setFooterBtnDisabled] = useState(true);
  const [validPwd, setValidPwd] = useState(true);
  const [validConfirmedPwd, setValidConfirmedPwd] = useState(true);

  const handleClick = () => setSigupFirstStepStore();
  const handleSubmit = () => {
    handleSignupSubmit(password);
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

  const checkPwd = (_, val) => {
    setPassword(val);
    if (val.length >= 8) {
      setValidPwd(true);
      return Promise.resolve();
    }
    setValidPwd(false);
    return Promise.reject(
      new Error(
        'Your password needs to be at least 8 characters. Please enter a longer one.',
      ),
    );
  };

  const checkConfirmedPwd = (_, val) => {
    if (val === password) {
      setValidConfirmedPwd(true);
      return Promise.resolve();
    }
    setValidConfirmedPwd(false);
    return Promise.reject(new Error('Passwords does not match.'));
  };

  return (
    <div className={styles.secondStep}>
      <div className={styles.form}>
        <div className={styles.formTitle}>You&apos;ll need a password</div>
        <div className={styles.formSubTitle}>
          Make sure it&apos;s 8 characters or more.
        </div>
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfo} onClick={handleClick}>
            <div>Name</div>
            <div>
              {userInfo.username}
            </div>
          </div>
          {userInfo.email && (
            <div className={styles.userInfo} onClick={handleClick}>
              <div>Email</div>
              <div>
                {userInfo.email}
              </div>
            </div>
          )}
          {userInfo.phone && (
            <div className={styles.userInfo} onClick={handleClick}>
              <div>Phone</div>
              <div>
                {userInfo.phone}
              </div>
            </div>
          )}
          <div className={styles.userInfo} onClick={handleClick}>
            <div>Birth date</div>
            <div>
              {moment(userInfo.birthDate).format('MMM DD, YYYY')}
            </div>
          </div>
        </div>
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          className={styles.formContainer}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '',
              },
              { validator: checkPwd },
            ]}
          >
            <TInput
              className={styles.passwordInput}
              valid={validPwd}
              label="Password"
              type="password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: '',
              },
              { validator: checkConfirmedPwd },
            ]}
          >
            <TInput
              className={styles.passwordInput}
              valid={validConfirmedPwd}
              label="Confirm password"
              type="password"
            />
          </Form.Item>
        </Form>
      </div>
      <Footer
        disabled={footerBtnDisabled}
        btnLabel="Sign up"
        handleNext={handleSubmit}
      />
    </div>
  );
}

SignupSecondStep.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    birthDate: PropTypes.string,
  }).isRequired,
  handleSignupSubmit: PropTypes.func.isRequired,
  setSigupFirstStepStore: PropTypes.func.isRequired,
};

export default SignupSecondStep;
