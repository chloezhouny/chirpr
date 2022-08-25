import { useState } from 'react';
import { TabBar, ActionSheet, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ReplyAPI } from '@utils/ReplyAPI';
import {
  TAB_KEYS, getTabs, ACTION_KEYS, ACTIONS, BAR_TYPE_KEYS,
} from './constants';
import styles from './index.module.scss';

const Bar = ({
  id, isBottom, replyCnt, retweetCnt, likeCnt, likeOnly, type,
}) => {
  const [activeKey, setActiveKey] = useState();
  const [visible, setVisible] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [liked, setLiked] = useState(false);
  const nav = useNavigate();

  const handleTabClick = (e) => {
    const { key } = e.target.dataset;
    if (key === TAB_KEYS.REPLY) {
      nav(`/reply/${id}`);
    }
    if (key === TAB_KEYS.RETWEET) {
      if (retweeted) {
        setRetweeted(false);
        return;
      }
      Toast.show('Retweeted.');
      setRetweeted(true);
    }
    if (key === TAB_KEYS.SHARE) {
      setVisible(true);
    }
    if (key === TAB_KEYS.LIKE) {
      if (liked) {
        ReplyAPI.deleteLike({
          content_type: type,
          object_id: id,
        }).then((res) => {
          if (res.success) {
            setLiked(false);
          }
        });
        return;
      }
      ReplyAPI.createLike({
        content_type: type,
        object_id: id,
      }).then((res) => {
        if (res.success) {
          Toast.show('Keep it up! The more Tweets you like, the better your timeline will be.');
          setLiked(true);
        }
      });
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
          replyCnt,
          retweetCnt,
          likeCnt,
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
  id: PropTypes.number.isRequired,
  isBottom: PropTypes.bool,
  likeOnly: PropTypes.bool,
  replyCnt: PropTypes.number,
  retweetCnt: PropTypes.number,
  likeCnt: PropTypes.number.isRequired,
  type: PropTypes.oneOf([BAR_TYPE_KEYS.REPLY, BAR_TYPE_KEYS.TWEET]),
};

Bar.defaultProps = {
  isBottom: false,
  likeOnly: false,
  replyCnt: undefined,
  retweetCnt: undefined,
  type: '',
};

export default Bar;
