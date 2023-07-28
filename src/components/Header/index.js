import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '@utils/context';
import { useGoTo, useCurTab } from '@utils/hooks';
import close from '@assets/close.svg';
import leftArrow from '@assets/left-arrow.svg';
import logo from '@assets/bird.png';
import SideBar from '@components/SideBar';
import styles from './index.module.scss';

const STEP = {
  FIRST: 1,
  SECOND: 2,
};

function Header({ children, title }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [store] = useAppContext();
  const goTo = useGoTo();
  const curTab = useCurTab();
  const result = [];

  // header for chirpr member pages
  if (store.user) {
    if (curTab?.hideAppHeader) {
      result.push(
        <div key="contentPageHeader" className={styles.contentPageHeader}>
          <img
            src={leftArrow}
            alt=""
            onClick={() => goTo()}
            className={styles.leftArrow}
          />
          {title && (
            <span key="title" className={styles.title}>
              {title}
            </span>
          )}
          {curTab.title && (
            <span key="curTabTitle" className={styles.title}>
              {curTab.title}
            </span>
          )}
          {children}
        </div>,
      );
    } else {
      result.push(
        <SideBar
          key="sideBar"
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />,
      );
      result.push(
        <div key="homePageHeader" className={styles.homePageHeader}>
          <img
            src={store.user?.profile_image_url}
            alt=""
            className={styles.avatar}
            onClick={() => setSidebarVisible(true)}
          />
          <span className={styles.title}>{curTab.title}</span>
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
    result.push(
      <img
        key="chirprLogo"
        src={logo}
        alt="chirpr-logo"
        className={store.handleClose ? styles.logo : styles.logoLogin}
      />,
    );
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
  title: PropTypes.string,
};

Header.defaultProps = {
  children: null,
  title: '',
};

export default Header;
