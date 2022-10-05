import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageCard from '@components/ImageCard';
import Bar from '@components/Bar';
import { BAR_TYPE_KEYS } from '@components/Bar/constants';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { timeDiff } from '@utils';
import styles from './index.module.scss';

const TweetCard = ({ dataSrc }) => {
  const goTo = useGoTo();
  const [store] = useAppContext();
  const [data, setData] = useState(dataSrc);
  const [retweeted, setRetweeted] = useState(false);
  const [retweetId, setRetweetId] = useState();
  const [liked, setLiked] = useState(false);
  const [likedId, setLikedId] = useState();

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img
          src={data.user?.profile_image_url || store.user.profile_image_url}
          alt="avatar"
          className={styles.avatar}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.name}>{data.user?.name || store.user.name || 'Unknown'}</span>
          @
          <span className={styles.username}>{data.user?.username || store.user.username}</span>
        &nbsp;&#183;&nbsp;
          {timeDiff(data.created_at)}
        </div>
        <div className={styles.text} onClick={() => goTo('tweet', { id: data.id }, { state: data })}>{data.text}</div>
        {data.media_urls?.length > 0
         && (
         <div className={styles.mediaContainer}>
           <ImageCard
             data={data}
             setData={setData}
             imgs={data.media_urls}
             replyCnt={data.comments_count}
             retweetCnt={data.retweet_count}
             likeCnt={data.likes_count}
             setRetweeted={setRetweeted}
             setRetweetId={setRetweetId}
             retweeted={retweeted}
             retweetId={retweetId}
             setLiked={setLiked}
             setLikedId={setLikedId}
             liked={liked}
             likedId={likedId}
           />
         </div>
         )}
        <div className={styles.bar}>
          <Bar
            data={data}
            setData={setData}
            id={data.id}
            type={BAR_TYPE_KEYS.TWEET}
            setRetweeted={setRetweeted}
            setRetweetId={setRetweetId}
            retweeted={retweeted}
            retweetId={retweetId}
            setLiked={setLiked}
            setLikedId={setLikedId}
            liked={liked}
            likedId={likedId}
          />
        </div>
      </div>
    </div>
  );
};

TweetCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSrc: PropTypes.object.isRequired,
};

export default TweetCard;
