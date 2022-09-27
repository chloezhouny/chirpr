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
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img
          src={dataSrc.user?.profile_image_url || store.user.profile_image_url}
          alt="avatar"
          className={styles.avatar}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.name}>{dataSrc.user?.name || store.user.name || 'Unknown'}</span>
          @
          <span className={styles.username}>{dataSrc.user?.username || store.user.username}</span>
        &nbsp;&#183;&nbsp;
          {timeDiff(dataSrc.created_at)}
        </div>
        <div className={styles.text} onClick={() => goTo('tweet', { id: dataSrc.id }, { state: dataSrc })}>{dataSrc.text}</div>
        {dataSrc.media_urls?.length > 0
         && (
         <div className={styles.mediaContainer}>
           <ImageCard
             imgs={dataSrc.media_urls}
             replyCnt={dataSrc.comments_count}
             retweetCnt={dataSrc.retweet_count}
             likeCnt={dataSrc.likes_count}
           />
         </div>
         )}
        <div className={styles.bar}>
          <Bar
            dataSrc={dataSrc}
            id={dataSrc.id}
            type={BAR_TYPE_KEYS.TWEET}
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
