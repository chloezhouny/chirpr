import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FollowCard from '@components/FollowCard';
import { useAppContext } from '@utils/context';
import { UserAPI } from '@utils/UserAPI';
import styles from './index.module.scss';

const WhoToFollow = ({ setFollowingsCnt }) => {
  const [data, setData] = useState([]);
  const [store] = useAppContext();

  const addIsFollowing = (followings, usersData) => usersData.map((user) => {
    for (let i = 0; i < followings.length; i += 1) {
      if (followings[i].userId === user.userId) {
        return { ...user, isFollowing: true };
      }
    }
    return user;
  });

  const getFriendshipsData = async () => {
    const usersRes = await UserAPI.getAllUsers();
    const usersData = usersRes.data.map(({
      id: userId, name, username, profile_image_url: profileImageUrl,
    }) => ({
      userId,
      name,
      username,
      profile_image_url: profileImageUrl,
    })).filter((user) => user.userId !== store.user?.id);
    const res = await UserAPI.getFollowings(store.user?.id);
    const followings = res.data.map((item) => item.following);
    const addedData = addIsFollowing(followings, usersData);
    setFollowingsCnt(followings.length);
    setData(addedData);
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
        getFriendshipsData();
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
        getFriendshipsData();
      }
    });
  };

  useEffect(() => {
    const init = async () => {
      await getFriendshipsData();
    };
    init();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}> Who to follow </div>
      <div>
        {data && data.map((item) => (
          <FollowCard
            profileImageUrl={item.profile_image_url}
            name={item.name}
            username={item.username}
            isFollowing={item.isFollowing || false}
            handleFollow={() => handleFollowCreate(item)}
            handleFollowCancel={() => handleFollowCancel(item)}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

WhoToFollow.propTypes = {
  setFollowingsCnt: PropTypes.func.isRequired,
};

export default WhoToFollow;
