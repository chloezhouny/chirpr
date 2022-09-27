import { ReactSVG } from 'react-svg';
import replyIcon from '@assets/reply.svg';
import retweetIcon from '@assets/retweet.svg';
import retweetedIcon from '@assets/retweeted.svg';
import likeIcon from '@assets/like.svg';
import likeFilledIcon from '@assets/likeFilled.svg';
import shareIcon from '@assets/share.svg';
import linkIcon from '@assets/link.svg';
import styles from './index.module.scss';

const numFormatter = (num) => {
  if (num > 9999 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`.toLocaleString('en');
  }
  if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`.toLocaleString('en');
  }
  return num.toLocaleString('en');
};

export const TAB_KEYS = {
  REPLY: 'reply',
  RETWEET: 'retweet',
  LIKE: 'like',
  SHARE: 'share',
};

export const getTabs = ({
  handleTabClick,
  replyCnt,
  retweetCnt,
  likeCnt,
  retweeted,
  likeOnly,
  liked,
}) => {
  if (likeOnly) {
    return [
      {
        key: TAB_KEYS.LIKE,
        icon: (
          <div onClick={handleTabClick}>
            <img className={styles.icon} src={liked ? likeFilledIcon : likeIcon} alt="" data-key={TAB_KEYS.LIKE} />
            {likeCnt > 0 && (
            <span className={liked ? styles.likedCount : styles.count}>
              {numFormatter(likeCnt)}
            </span>
            )}
          </div>
        ),
      },
    ];
  }

  return [
    {
      key: TAB_KEYS.REPLY,
      icon: (
        <div onClick={handleTabClick}>
          <img className={styles.icon} src={replyIcon} alt="" data-key={TAB_KEYS.REPLY} />
          {replyCnt > 0 && (
            <span className={styles.count}>{numFormatter(replyCnt)}</span>
          )}
        </div>
      ),
    },
    {
      key: TAB_KEYS.RETWEET,
      icon: (
        <div onClick={handleTabClick}>
          <img className={styles.icon} src={retweeted ? retweetedIcon : retweetIcon} alt="" data-key={TAB_KEYS.RETWEET} />
          {retweetCnt > 0 && (
            <span className={retweeted ? styles.retweetedCount : styles.count}>
              {numFormatter(retweetCnt)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: TAB_KEYS.LIKE,
      icon: (
        <div onClick={handleTabClick}>
          <img className={styles.icon} src={liked ? likeFilledIcon : likeIcon} alt="" data-key={TAB_KEYS.LIKE} />
          {likeCnt > 0 && (
            <span className={liked ? styles.likedCount : styles.count}>
              {numFormatter(likeCnt)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: TAB_KEYS.SHARE,
      icon: <img className={styles.icon} src={shareIcon} alt="" data-key={TAB_KEYS.SHARE} onClick={handleTabClick} />,
    },
  ];
};

export const ACTION_KEYS = {
  COPY: 'copy',
  CANCEL: 'cancel',
};

export const ACTIONS = [
  {
    text: (
      <div className={styles.copyLinkBtn}>
        <ReactSVG src={linkIcon} className={styles.linkIcon} alt="" />
        Copy link to Tweet
      </div>
    ),
    key: ACTION_KEYS.COPY,
  },
  {
    text: <div className={styles.cancelShareBtn}>Cancel</div>,
    key: ACTION_KEYS.CANCEL,
  },
];

export const BAR_TYPE_KEYS = {
  TWEET: 'tweet',
  REPLY: 'reply',
};
