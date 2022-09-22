import PropTypes from 'prop-types';
import TButton from '@components/TButton';
import styles from './index.module.scss';

const FollowCard = ({
  profileImageUrl,
  name,
  username,
  isFollowing,
  handleFollow,
  handleFollowCancel,
}) => (
  <div className={styles.container} key={name}>
    <div className={styles.avatarContainer}>
      <img
        className={styles.avatar}
        src={profileImageUrl}
        alt=""
      />
    </div>
    <div className={styles.nameContainer}>
      <div className={styles.name}>{name}</div>
      <div className={styles.username}>
        @
        {username}
      </div>
    </div>
    <div className={styles.follow}>
      {isFollowing ? (
        <TButton
          handleOnClick={handleFollowCancel}
          isOutlined
        >
          Following
        </TButton>
      ) : (
        <TButton
          handleOnClick={handleFollow}
          isBlack
        >
          Follow
        </TButton>
      )}
    </div>
  </div>

);

FollowCard.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  handleFollow: PropTypes.func.isRequired,
  handleFollowCancel: PropTypes.func.isRequired,
};

export default FollowCard;
