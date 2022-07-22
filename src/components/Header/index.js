import close from '../../assets/close.svg';
import logo from '../../assets/cat-512.png';

import styles from './index.module.css';

function Header() {
  return (
    <div className={styles.header}>
      <img src={close} alt="close" className={styles.close} />
      <img src={logo} alt="twittuer-logo" className={styles.logo} />
      {' '}
    </div>
  );
}

export default Header;
