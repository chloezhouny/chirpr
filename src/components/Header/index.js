import PropTypes from 'prop-types';
import close from '../../assets/close.svg';
import leftArrow from '../../assets/left-arrow.png';
import logo from '../../assets/bird.png';
import styles from './index.module.scss';

const STEP = {
  FIRST: 1,
  SECOND: 2,
};

function Header({ handleClose, step }) {
  return (
    <div className={styles.header}>
      { handleClose
      && (
      <img
        src={step === STEP.FIRST ? close : leftArrow}
        alt="close"
        className={step === STEP.FIRST ? styles.close : styles.leftArrow}
        onClick={handleClose}
      />
      )}
      <img src={logo} alt="twittuer-logo" className={styles.logo} />
      {' '}
    </div>
  );
}

Header.propTypes = {
  handleClose: PropTypes.func,
  step: PropTypes.string,
};

Header.defaultProps = {
  handleClose: null,
  step: '',
};

export default Header;
