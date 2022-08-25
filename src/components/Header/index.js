import PropTypes from 'prop-types';
import { useAppContext } from '@utils/context';
import { useGoTo, useCurTab } from '@utils/hooks';
import close from '@assets/close.svg';
import leftArrow from '@assets/left-arrow.svg';
import logo from '@assets/bird.png';
import styles from './index.module.scss';

const STEP = {
  FIRST: 1,
  SECOND: 2,
};

function Header({
  children,
}) {
  const [store] = useAppContext();
  const goTo = useGoTo();
  const curTab = useCurTab();
  const result = [];
  console.log(store);

  // header for twittuer member pages
  if (store.user) {
    if (curTab?.hideAppHeader) {
      result.push(
        <div key="contentPageHeader" className={styles.contentPageHeader}>
          <img src={leftArrow} alt="" onClick={() => goTo()} className={styles.leftArrow} />
          {curTab.title && (
          <span className={styles.title}>
            {curTab.title}
          </span>
          )}
          {children}
        </div>,
      );
    } else {
      result.push(
        <div key="homePageHeader" className={styles.homePageHeader}>
          <img src={store.user?.profile_image_url} alt="" className={styles.avatar} />
          <span className={styles.title}>
            {store.title}
          </span>
          ,
        </div>,
      );
    }
  }

  // header for login and signup pages
  if (store.handleClose) {
    result.push(
      <img
        key="signupCloseIcon"
        src={store.step === STEP.FIRST ? close : leftArrow}
        alt="close"
        className={store.step === STEP.FIRST ? styles.close : styles.leftArrow}
        onClick={store.handleClose}
      />,
    );
  }
  if (!store.user) {
    result.push(<img key="twittuerLogo" src={logo} alt="twittuer-logo" className={store.handleClose ? styles.logo : styles.logoLogin} />);
  }
  return (
    <div className={styles.header}>
      {' '}
      {result}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
