import { useState, useEffect } from 'react';
import { Tabs } from 'antd-mobile';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import { UserAPI } from '@utils/UserAPI';
import Header from '@components/Header';
import FollowCard from '@components/FollowCard';
import styles from './index.module.scss';

const TYPE = {
  FOLLOWERS: {
    key: 'followers',
    title: 'Followers',
  },
  FOLLOWING: {
    key: 'following',
    title: 'Following',
  },
};
const Follow = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const [activeKey, setActiveKey] = useState('');
  const [store] = useAppContext();

  const handleIsFollowing = async (following) => {
    const res = await UserAPI.isFollowing(store.user.id, following.userId);
    return res.data.length > 0;
  };

  const addIsFollowings = async (dataSrc) => {
    const addedDataSrc = await Promise.all(dataSrc.map(async (item) => {
      const isFollowing = await handleIsFollowing(item);
      return { ...item, isFollowing };
    }));

    return addedDataSrc;
  };

  const getFriendshipsData = async (key) => {
    if (key === TYPE.FOLLOWERS.key) {
      const res = await UserAPI.getFollowers(store.user?.id);
      const followers = await addIsFollowings(res.data);
      setData(followers);
      return;
    }
    if (key === TYPE.FOLLOWING.key) {
      const res = await UserAPI.getFollowings(store.user?.id);
      const followings = res.data.map((item) => item.following);
      const addedData = await addIsFollowings(followings);
      setData(addedData);
    }
  };

  const handleFollowCreate = ({
    userId, name, username, profile_image_url: profileImageUrl,
  }) => {
    UserAPI.createFollowing({
      content_type: 'application/json',
      userId: store.user.id,
      name: store.user.name,
      username: store.user.username,
      profile_image_url: store.user.profile_image_url,
      following: {
        userId, name, username, profile_image_url: profileImageUrl,
      },
    }).then((res) => {
      if (res.success) {
        getFriendshipsData(activeKey);
      }
    });
  };

  const handleFollowCancel = async ({
    userId,
  }) => {
    const followings = await UserAPI.getFollowings(store.user?.id);
    const unfollowing = followings.data.filter((item) => item.following.userId === userId);
    UserAPI.deleteFollowing(unfollowing[0].id).then((res) => {
      if (res.success) {
        getFriendshipsData(activeKey);
      }
    });
  };

  const handleTabsChange = async (key) => {
    getFriendshipsData(key);
    setActiveKey(key);
  };

  useEffect(() => {
    getFriendshipsData(location.state);
  }, []);

  return (
    <>
      <Header title={store.user?.name || 'Unkown'} />
      <div className={styles.container}>
        <Tabs
          onChange={handleTabsChange}
          defaultActiveKey={location.state}
        >
          {Object.values(TYPE).map((item) => (
            <Tabs.Tab title={item.title} key={item.key}>
              {data.map((following) => (
                <FollowCard
                  profileImageUrl={following.profile_image_url}
                  name={following.name}
                  username={following.username}
                  isFollowing={following.isFollowing}
                  handleFollow={() => handleFollowCreate(following)}
                  handleFollowCancel={() => handleFollowCancel(following)}
                />
              ))}
            </Tabs.Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};
export default Follow;
