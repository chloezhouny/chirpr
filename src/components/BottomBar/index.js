import { useState } from 'react';
import { TabBar } from 'antd-mobile';
// import PropTypes from 'prop-types';
import homeIcon from '@assets/home.svg';
import exploreIcon from '@assets/explore.svg';
import notificationsIcon from '@assets/notifications.svg';
import messagesIcon from '@assets/messages.svg';
import styles from './index.module.scss';

const tabs = [
  {
    key: 'home',
    title: 'Home',
    link: 'home',
    icon: <img className={styles.icon} src={homeIcon} alt="" />,
  },
  {
    key: 'explore',
    link: '/',
    icon: <img className={styles.icon} src={exploreIcon} alt="" />,
  },
  {
    key: 'notifications',
    link: '/',
    icon: <img className={styles.icon} src={notificationsIcon} alt="" />,
  },
  {
    key: 'messages',
    link: '/',
    icon: <img className={styles.icon} src={messagesIcon} alt="" />,
  },

];

const BottomBar = () => {
  const [activeKey, setActiveKey] = useState();
  const handleTabItemChange = (key) => {
    setActiveKey(key);
  };
  return (
    <div className={styles.container}>
      <TabBar activeKey={activeKey} onChange={handleTabItemChange}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
};

BottomBar.propTypes = {

};

export default BottomBar;
