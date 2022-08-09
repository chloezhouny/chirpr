import { useState } from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import replyIcon from '@assets/reply.svg';
import retweetIcon from '@assets/retweet.svg';
import likeIcon from '@assets/like.svg';
import shareIcon from '@assets/share.svg';
import styles from './index.module.scss';

const getTabs = ({ replyCnt, retweetCnt, likeCnt }) => [{
  key: 'reply',
  icon: (
    <div>
      <img className={styles.icon} src={replyIcon} alt="" />
      {replyCnt > 0 && <span className={styles.count}>{replyCnt}</span>}
    </div>),
},
{
  key: 'retweet',
  icon: (
    <div>
      <img className={styles.icon} src={retweetIcon} alt="" />
      {retweetCnt > 0 && <span className={styles.count}>{retweetCnt}</span>}
    </div>),
},
{
  key: 'like',
  icon: (
    <div>
      <img className={styles.icon} src={likeIcon} alt="" />
      {likeCnt > 0 && <span className={styles.count}>{likeCnt}</span>}
    </div>),
},
{
  key: 'share',
  icon: <img className={styles.icon} src={shareIcon} alt="" />,
},
];

const Bar = ({ replyCnt, retweetCnt, likeCnt }) => {
  const [activeKey, setActiveKey] = useState();
  const handleTabItemChange = (key) => {
    setActiveKey(key);
  };
  return (
    <div className={styles.container}>
      <TabBar activeKey={activeKey} onChange={handleTabItemChange}>
        {getTabs({ replyCnt, retweetCnt, likeCnt }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
};

Bar.propTypes = {
  replyCnt: PropTypes.number.isRequired,
  retweetCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
};

export default Bar;
