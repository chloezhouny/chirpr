import PropTypes from 'prop-types';
import Bar from '@components/Bar';
import { BAR_TYPE_KEYS } from '@components/Bar/constants';
import { useGoTo } from '@utils/hooks';
import { timeDiff } from '@utils';
import styles from './index.module.scss';

const CommentCard = ({ data }) => {
  const goTo = useGoTo();
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
          onClick={() => goTo('tweet', { id: data.id })}
        >
          {data.text}
        </div>
        <div className={styles.bar}>
          <Bar
            dataSrc={data}
            likeOnly
            id={data.id}
            likeCnt={data.likes_count}
            type={BAR_TYPE_KEYS.REPLY}
          />
        </div>
      </div>
    </div>
  );
};
CommentCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      profile_image_url: PropTypes.string,
    }),
    text: PropTypes.string,
    created_at: PropTypes.string,
    likes_count: PropTypes.number,
    has_liked: PropTypes.bool,
  }).isRequired,
};

export default CommentCard;
