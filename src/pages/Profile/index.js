import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Tabs } from 'antd-mobile';
import Header from '@components/Header';
import TweetCard from '@components/TweetCard';
import WhoToFollow from '@components/WhoToFollow';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { TweetAPI } from '@utils/TweetAPI';
import { UserAPI } from '@utils/UserAPI';
import { ReplyAPI } from '@utils/ReplyAPI';
import lockerIcon from '@assets/locker.svg';
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

const Profile = () => {
  const [store] = useAppContext();
  const [tweetsData, setTweetsData] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [followersCnt, setFollowersCnt] = useState();
  const [followingsCnt, setFollowingsCnt] = useState();
  const goTo = useGoTo();

  const getFollowData = async () => {
    const followers = await UserAPI.getFollowers(store.user?.id);
    setFollowersCnt(followers.data.length);
    const followingsSrc = await UserAPI.getFollowings(store.user?.id);
    const followings = followingsSrc.data.map((item) => item.following);
    setFollowingsCnt(followings.length);
  };

  const getTweetsData = async () => {
    const tweets = await TweetAPI.getTweetsByUserId(store.user?.id);
    setTweetsData(tweets.data);
  };

  const getLikesData = async () => {
    const likes = await ReplyAPI.getLikesByUser(store.user?.id);
    const likesSrc = await Promise.all(likes.data.map(
      async (item) => {
        const likeSrc = await TweetAPI.getTweet(item.tweetId);
        return likeSrc.data;
      },
    ));
    setLikedTweets(likesSrc);
  };

  useEffect(() => {
    const init = async () => {
      getFollowData();
      getTweetsData();
      getLikesData();
    };
    init();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {
            `${store.user?.name}
          (@${store.user?.username}) / Twittuer`
}
        </title>
      </Helmet>
      <Header title={store.user?.name || 'Unkown'} />
      <div className={styles.container}>
        <div className={styles.banner} />
        <img
          className={styles.avatar}
          src={store.user?.profile_image_url}
          alt=""
        />
        <Button className={styles.editProfile} onClick={() => goTo('editProfile')}>
          Edit profile
        </Button>
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
        <Tabs>
          <Tabs.Tab title="Tweets" key="tweets">
            {tweetsData.map((item) => <TweetCard key={item.id} dataSrc={item} />)}
            <WhoToFollow setFollowingsCnt={setFollowingsCnt} />
          </Tabs.Tab>
          <Tabs.Tab title="Likes" key="tweets&replies">
            {likedTweets.map((item) => <TweetCard key={item.id} dataSrc={item} />)}
          </Tabs.Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
