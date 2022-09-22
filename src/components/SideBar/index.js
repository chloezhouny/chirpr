import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'antd-mobile';
import Cookies from 'js-cookie';
import lockerIcon from '@assets/locker.svg';
import userIcon from '@assets/user.svg';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { UserAPI } from '@utils/UserAPI';
import styles from './index.module.scss';

const FOLLOW_TYPE = {
  FOLLOWERS: {
    key: 'followers',
    title: 'Followers',
  },
  FOLLOWING: {
    key: 'following',
    title: 'Following',
  },
};

const SideBar = ({ visible, onClose: handleClose }) => {
  const [followersCnt, setFollowersCnt] = useState();
  const [followingsCnt, setFollowingsCnt] = useState();
  const [store] = useAppContext();
  const goTo = useGoTo();
  const handleLogout = () => {
    Cookies.set('userId', '');
    window.location.reload();
  };
  useEffect(() => {
    const init = async () => {
      const followers = await UserAPI.getFollowers(store.user?.id);
      setFollowersCnt(followers.data.length);
      const followingsSrc = await UserAPI.getFollowings(store.user?.id);
      const followings = followingsSrc.data.map((item) => item.following);
      setFollowingsCnt(followings.length);
    };
    init();
  });
  return (
    <Popup
      visible={visible}
      onMaskClick={handleClose}
      position="left"
      bodyStyle={{
        width: '72vw',
        boxShadow:
          'rgb(101 119 134 / 20%) 0px 0px 8px, rgb(101 119 134 / 25%) 0px 1px 3px 1px',
      }}
      maskStyle={{ opacity: '0.4' }}
    >
      <div className={styles.container}>
        <div className={styles.title}>Account info</div>
        <img
          className={styles.avatar}
          src={store.user.profile_image_url}
          alt="profile_image"
        />
        <div className={styles.name}>
          {store.user?.name || 'Unknown'}
          <img className={styles.icon} src={lockerIcon} alt="" />
        </div>
        <div className={styles.username}>
          @
          {store.user?.username}
        </div>
        <div className={styles.follow}>
          <span onClick={() => goTo('follow', {}, { state: FOLLOW_TYPE.FOLLOWING.key })} className={styles.following}>{followingsCnt}</span>
          Following
          <span onClick={() => goTo('follow', {}, { state: FOLLOW_TYPE.FOLLOWERS.key })} className={styles.followers}>{followersCnt}</span>
          Followers
        </div>
        <div className={styles.list} onClick={() => goTo('profile')}>
          <img className={styles.listIcon} src={userIcon} alt="" />
          <span className={styles.listTitle}>Profile</span>
        </div>
        <div className={styles.footer} onClick={handleLogout}>Log out</div>
      </div>
    </Popup>
  );
};

SideBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideBar;
