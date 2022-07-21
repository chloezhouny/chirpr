import { Button, Input } from 'antd-mobile';
import Header from '../../components/Header';
import DatePicker from '../../components/DatePicker';
import styles from './index.module.css';

function Signup() {
  console.log('');
  return (
    <div>
      <Header />
      <div className={styles.form}>
        <div className={styles.formTitle}>Create your account</div>
        <Input placeholder="Name" className={styles.input} />
        <Input placeholder="Phone number or email address" className={styles.input} />
        <div className={styles.useEmail}>Use email instead</div>
        <div className={styles.datePickerTitle}>Date of birth</div>
        <div>
          This will not be shown publicly.
          Confirm your own age, even if this account is for a business, a pet, or something else.
        </div>
        <DatePicker />
      </div>
      <div className={styles.footer}>
        <Button className={styles.footerBtn}>Next</Button>
      </div>
    </div>
  );
}

export default Signup;
