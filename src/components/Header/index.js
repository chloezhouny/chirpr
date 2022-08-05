import { useAppContext } from '@utils/context';
import close from '../../assets/close.svg';
import leftArrow from '../../assets/left-arrow.png';
import logo from '../../assets/bird.png';
import styles from './index.module.scss';

const STEP = {
  FIRST: 1,
  SECOND: 2,
};

function Header() {
  const [store] = useAppContext();
  return (
    <div className={styles.header}>
      { store.handleClose
      && (
      <img
        src={store.step === STEP.FIRST ? close : leftArrow}
        alt="close"
        className={store.step === STEP.FIRST ? styles.close : styles.leftArrow}
        onClick={store.handleClose}
      />
      )}
      <img src={logo} alt="twittuer-logo" className={!store.step ? styles.logoLogin : styles.logo} />
      {' '}
    </div>
  );
}

export default Header;
