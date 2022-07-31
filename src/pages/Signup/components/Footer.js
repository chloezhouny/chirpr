import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from '../index.module.scss';

function Footer({ handleNext, disabled, btnLabel }) {
  return (
    <div className={styles.footer}>
      <Button
        className={disabled ? styles.footerBtnDisabled : styles.footerBtn}
        onClick={handleNext}
      >
        {btnLabel}
      </Button>
    </div>
  );
}

Footer.propTypes = {
  handleNext: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  btnLabel: PropTypes.string.isRequired,
};

export default Footer;
