import { useState, useEffect } from 'react';
import moment from 'moment';
import { Steps, TextArea, Toast } from 'antd-mobile';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { ReplyAPI } from '@utils/ReplyAPI';
import Header from '@components/Header';
import TButton from '@components/TButton';
import styles from './index.module.scss';

const { Step } = Steps;

const Reply = () => {
  const location = useLocation();
  const [store] = useAppContext();
  const [data, setData] = useState(location.state);
  const [replyContent, setReplyContent] = useState('');
  const goTo = useGoTo();
  useEffect(() => {
    setData(location.state);
  }, []);

  const handleOnClick = () => {
    ReplyAPI.createReply({
      content: replyContent,
      tweet_id: data.id,
    }).then((res) => {
      if (res?.success) {
        Toast.show({
          content: 'Your tweet was sent.',
        });
        goTo();
      }
    });
  };
  const handleReplyContentChange = (v) => {
    setReplyContent(v);
  };
  return (
    <div className={styles.container}>
      <Header>
        <TButton disabled={replyContent.length === 0} handleOnClick={handleOnClick} isBlue>
          Reply
        </TButton>
      </Header>
      <Steps direction="vertical">
        <Step
          title={(
            <div className={styles.tweetContainer}>
              <div className={styles.header}>
                <span className={styles.name}>{data.user.name}</span>
                @
                <span className={styles.username}>{data.user.username}</span>
                {' '}
                &nbsp;&#183;&nbsp;
                {`${moment(data.created_at).format('hh')}h`}
              </div>
              <div className={styles.text}>{data.text}</div>
            </div>
          )}
          description={(
            <div>
              Replying to &nbsp;
              <span>
                @
                {data.user.username}
              </span>
            </div>
          )}
          icon={(
            <img
              className={styles.avatar}
              src={data.user.profile_image_url}
              alt="avatar"
            />
          )}
        />
        <Step
          title={(
            <div>
              <TextArea
                value={replyContent}
                onChange={handleReplyContentChange}
                className={styles.reply}
                placeholder="Tweet your reply"
              />
            </div>
          )}
          icon={(
            <img
              className={styles.avatar}
              src={store.user?.profile_image_url}
              alt="avatar"
            />
          )}
        />
      </Steps>
    </div>
  );
};

export default Reply;
