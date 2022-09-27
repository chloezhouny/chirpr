import { matchPath } from 'react-router-dom';
import homeIcon from '@assets/home.svg';
import exploreIcon from '@assets/explore.svg';
import notificationsIcon from '@assets/notifications.svg';
import messagesIcon from '@assets/messages.svg';
import styles from '../main.module.scss';

export const tabs = [
  {
    key: 'home',
    title: 'Home',
    link: '/',
    isMenu: true,
    icon: <img className={styles.icon} src={homeIcon} alt="" />,
  },
  {
    key: 'tweet',
    title: 'Tweet',
    link: '/tweet/:id',
    hideAppHeader: true,
  },
  {
    key: 'explore',
    title: '',
    link: '/explore',
    isMenu: true,
    icon: <img className={styles.icon} src={exploreIcon} alt="" />,
  },
  {
    key: 'notifications',
    title: 'Notifications',
    link: '/notifications',
    isMenu: true,
    icon: <img className={styles.icon} src={notificationsIcon} alt="" />,
  },
  {
    key: 'messages',
    title: 'Messages',
    link: '/messages',
    isMenu: true,
    icon: <img className={styles.icon} src={messagesIcon} alt="" />,
  },
  {
    key: 'composeTweet',
    link: '/compose/tweet',
    hideAppHeader: true,
  },
  {
    key: 'reply',
    link: '/reply/:id',
    hideAppHeader: true,
  },
  {
    key: 'profile',
    link: '/profile',
    hideAppHeader: true,
  },
  {
    key: 'editProfile',
    link: '/settings/profile',
    hideAppHeader: true,
  },
  {
    key: 'follow',
    link: '/follow',
    hideAppHeader: true,
  },
];

export const getTabByKey = (key) => tabs.find((item) => item.key === key);

export const getTabByLink = (link) => tabs.find((item) => matchPath(item.link, link));

export const hasTabs = (link) => tabs.some((item) => item.link === link);
