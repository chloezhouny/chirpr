import { useState } from 'react';
import PropTypes from 'prop-types';
import Bar from '@components/Bar';
import { BAR_TYPE_KEYS } from '@components/Bar/constants';
import { timeDiff } from '@utils';
import { useGoTo } from '@utils/hooks';
import styles from './index.module.scss';

const CommentCard = ({ dataSrc }) => {
  const goTo = useGoTo();
  const [data, setData] = useState(dataSrc);
  const [liked, setLiked] = useState(false);
  const [likedId, setLikedId] = useState();
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img
          className={styles.avatar}
          src={data.user.profile_image_url}
          alt=""
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.name}>{data.user.name}</span>
          @
          <span className={styles.username}>{data.user.username}</span>
          &nbsp;&#183;&nbsp;
          {timeDiff(data.created_at)}
        </div>
        <div
          className={styles.text}
          onClick={() => goTo('tweet', { id: dataSrc.tweet_id })}
        >
          {data.text}
        </div>
        <div className={styles.bar}>
          <Bar
            data={data}
            setData={setData}
            likeOnly
            id={data.id}
            likeCnt={data.likes_count}
            type={BAR_TYPE_KEYS.REPLY}
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
CommentCard.propTypes = {
  dataSrc: PropTypes.shape({
    id: PropTypes.number,
    tweet_id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      profile_image_url: PropTypes.string,
    }),
    text: PropTypes.string,
    created_at: PropTypes.string,
    likes_count: PropTypes.number,
  }).isRequired,
};

export default CommentCard;
