import { useState, useEffect } from 'react';
import { TabBar, ActionSheet, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { TweetAPI } from '@utils/TweetAPI';
import { ReplyAPI } from '@utils/ReplyAPI';
import {
  TAB_KEYS,
  getTabs,
  ACTION_KEYS,
  ACTIONS,
  BAR_TYPE_KEYS,
} from './constants';
import styles from './index.module.scss';

const Bar = ({
  dataSrc, id, isBottom, likeOnly, type,
}) => {
  const [store] = useAppContext();
  const [data, setData] = useState(dataSrc);
  const [activeKey, setActiveKey] = useState();
  const [visible, setVisible] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [retweetId, setRetweetId] = useState();
  const [liked, setLiked] = useState(false);
  const [likedId, setLikedId] = useState();
  const goTo = useGoTo();

  useEffect(() => {
    const init = async () => {
      let likesRes;
      let retweetsRes;
      if (type === 'tweet') {
        likesRes = await ReplyAPI.getIsLiked(store.user?.id, id);
        retweetsRes = await ReplyAPI.getIsRetweeted(store.user?.id, id);
      } else if (type === 'reply') {
        likesRes = await ReplyAPI.getIsLikedComment(store.user?.id, id);
      }
      if (likesRes.success && likesRes.data.length > 0) {
        setLiked(true);
        setLikedId(likesRes.data[0].id);
      }
      if (retweetsRes.success && retweetsRes.data.length > 0) {
        setRetweeted(true);
        setRetweetId(retweetsRes.data[0].id);
      }
    };
    init();
  }, []);
  const handleTabClick = async (e) => {
    const { key } = e.target.dataset;
    if (key === TAB_KEYS.REPLY) {
      goTo('reply', { id }, { state: dataSrc });
    }
    if (key === TAB_KEYS.RETWEET) {
      if (retweeted) {
        const res = await ReplyAPI.deleteRetweet(retweetId);
        if (res.success) {
          setRetweeted(false);
          setRetweetId(null);
        }
      } else {
        const res = await ReplyAPI.createRetweet({
          content_type: type,
          userId: store.user?.id,
          tweetId: id,
        });
        if (res.success) {
          Toast.show(
            'Retweeted.',
          );
          setRetweeted(true);
          setRetweetId(res.data.id);
        }
      }
      const retweetsRes = await ReplyAPI.getRetweetsByTweet(id);
      const tweetRes = await TweetAPI.getTweet(id);
      tweetRes.data.retweet_count = retweetsRes.data.length;
      const retweetsCntRes = await TweetAPI.updateTweet(id, {
        ...tweetRes.data,
      });
      if (retweetsCntRes.success) {
        setData(retweetsCntRes.data);
      }
    }
    if (key === TAB_KEYS.SHARE) {
      setVisible(true);
    }
    if (key === TAB_KEYS.LIKE) {
      if (liked) {
        const res = await ReplyAPI.deleteLike(likedId);
        if (res.success) {
          setLiked(false);
          setLikedId(null);
        }
      } else {
        const res = await ReplyAPI.createLike({
          content_type: type,
          userId: store.user?.id,
          tweetId: type === 'tweet' ? id : dataSrc.tweet_id,
          commentId: type === 'reply' ? id : -1,
        });
        if (res.success) {
          Toast.show(
            'Keep it up! The more Tweets you like, the better your timeline will be.',
          );
          setLiked(true);
          setLikedId(res.data.id);
        }
      }
      if (type === 'tweet') {
        const likesRes = await ReplyAPI.getLikesByTweet(id);
        const tweetRes = await TweetAPI.getTweet(id);
        tweetRes.data.likes_count = likesRes.data.length;
        const likesCntRes = await TweetAPI.updateTweet(id, {
          ...tweetRes.data,
        });
        if (likesCntRes.success) {
          setData(likesCntRes.data);
        }
      } else if (type === 'reply') {
        const commentLikesRes = await ReplyAPI.getLikesByComment(id);
        const commentRes = await ReplyAPI.getReply(id);
        commentRes.data.likes_count = commentLikesRes.data.length;
        const updatedCommentRes = await ReplyAPI.updateReply(id, commentRes.data);
        if (updatedCommentRes.success) {
          setData(updatedCommentRes.data);
        }
      }
    }
  };
  const handleTabItemChange = (key) => {
    setActiveKey(key);
  };

  const handleAction = (e) => {
    if (e.key === ACTION_KEYS.COPY) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${window.location.origin}/tweet/${id}`);
        Toast.show('Copied to clipboard');
      }
    }
    setVisible(false);
  };

  return (
    <div
      className={classNames({
        [styles.container]: !isBottom,
        [styles.containerBottom]: isBottom,
      })}
    >
      <TabBar activeKey={activeKey} onChange={handleTabItemChange}>
        {getTabs({
          handleTabClick,
          replyCnt: data.comments_count,
          retweetCnt: data.retweet_count,
          likeCnt: data.likes_count,
          retweeted,
          likeOnly,
          liked,
        }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
      <ActionSheet
        className={styles.actionSheetContainer}
        visible={visible}
        actions={ACTIONS}
        onClose={() => setVisible(false)}
        onAction={handleAction}
      />
    </div>
  );
};

Bar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSrc: PropTypes.object,
  id: PropTypes.number,
  isBottom: PropTypes.bool,
  likeOnly: PropTypes.bool,
  type: PropTypes.oneOf([BAR_TYPE_KEYS.REPLY, BAR_TYPE_KEYS.TWEET]),
};

Bar.defaultProps = {
  dataSrc: {},
  id: -1,
  isBottom: false,
  likeOnly: false,
  type: '',
};

export default Bar;
