import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from '../index.module.scss';

function Footer({ handleSubmit, disabled }) {
  return (
    <div className={styles.footer}>
      <Button
        className={disabled ? styles.footerBtnDisabled : styles.footerBtn}
        onClick={handleSubmit}
      >
        Next
      </Button>
    </div>
  );
}

Footer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Footer;
