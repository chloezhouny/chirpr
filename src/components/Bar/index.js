import { useState } from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import replyIcon from '@assets/reply.svg';
import retweetIcon from '@assets/retweet.svg';
import likeIcon from '@assets/like.svg';
import shareIcon from '@assets/share.svg';
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

const getTabs = ({
  replyCnt, retweetCnt, likeCnt, nav, id,
}) => [
  {
    key: 'reply',
    icon: (
      <div onClick={() => nav(`/reply/${id}`)}>
        <img className={styles.icon} src={replyIcon} alt="" />
        {replyCnt > 0 && (
          <span className={styles.count}>{numFormatter(replyCnt)}</span>
        )}
      </div>
    ),
  },
  {
    key: 'retweet',
    icon: (
      <div>
        <img className={styles.icon} src={retweetIcon} alt="" />
        {retweetCnt > 0 && (
          <span className={styles.count}>
            {numFormatter(retweetCnt)}
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'like',
    icon: (
      <div>
        <img className={styles.icon} src={likeIcon} alt="" />
        {likeCnt > 0 && (
          <span className={styles.count}>{numFormatter(likeCnt)}</span>
        )}
      </div>
    ),
  },
  {
    key: 'share',
    icon: <img className={styles.icon} src={shareIcon} alt="" />,
  },
];

const Bar = ({
  id, isBottom, replyCnt, retweetCnt, likeCnt,
}) => {
  const [activeKey, setActiveKey] = useState();
  const nav = useNavigate();

  const handleTabItemChange = (key) => {
    setActiveKey(key);
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
          replyCnt, retweetCnt, likeCnt, nav, id,
        }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
};

Bar.propTypes = {
  id: PropTypes.number.isRequired,
  isBottom: PropTypes.bool,
  replyCnt: PropTypes.number.isRequired,
  retweetCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
};

Bar.defaultProps = {
  isBottom: false,
};

export default Bar;
