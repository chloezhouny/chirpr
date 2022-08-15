import { useState, useEffect } from 'react';
import moment from 'moment';
import { Steps, TextArea, Toast } from 'antd-mobile';
import { useParams } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { ReplyAPI } from '@utils/ReplyAPI';
import Header from '@components/Header';
import TButton from '@components/TButton';
import styles from './index.module.scss';

const { Step } = Steps;

const tweet = {
  id: 1,
  user: {
    id: 2,
    name: 'Elon Musk',
    username: 'elonmusk',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg',
  },
  comments: [
    {
      id: 1,
      tweet_id: 1,
      user: {
        id: 1,
        name: 'Crpto Insights',
        username: 'CryptoInsightsX',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1510983419588919296/bvtUUkHo_400x400.jpg',
      },
      content: 'Hope you will make crypto market great again Elon',
      created_at: '2022-08-05T18:43:02.662052Z',
      likes_count: 5,
      comments_count: 5,
      retweet_count: 0,
      has_liked: false,
    },
    {
      id: 2,
      tweet_id: 1,
      user: {
        id: 1,
        name: 'greg',
        username: 'greg16676935420',
        profile_image_url:
          'https://i.insider.com/61cc84b94710b10019c77960?width=500&format=jpeg&auto=webp',
      }, //
      text: "Dm me if you need any help I'm free this weekend",
      created_at: '2022-08-05T11:58:02',
      likes_count: 2351,
      comments_count: 79,
      retweet_count: 33,
      has_liked: false,
    },
  ],
  created_at: '2022-08-05T11:56:01',
  text: 'Hustling to get Stargship Booster 7 back to pad to test outer ring of 20 engines',
  likes: [],
  likes_count: 61600,
  comments_count: 3966,
  retweet_count: 4380,
  has_liked: false,
  media_urls: [
    'https://pbs.twimg.com/media/FZdKy4gXoAE9IVY?format=jpg&name=large',
    'https://pbs.twimg.com/media/FX9uuc8UsAEVJ8a?format=jpg&name=large',
    'https://pbs.twimg.com/media/FX9uwREVEAA3tN3?format=jpg&name=large',
    'https://pbs.twimg.com/media/FZwZBv7VEAAL_Kc?format=jpg&name=large',
  ],
};

const Reply = () => {
  const [store] = useAppContext();
  const [data, setData] = useState(tweet);
  const [replyContent, setReplyContent] = useState('');
  const params = useParams();
  const goTo = useGoTo();
  useEffect(() => {
    setData(tweet);
  }, []);

  const handleOnClick = () => {
    ReplyAPI.createReply({
      content: replyContent,
      tweet_id: params.id,
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
        <TButton disabled={replyContent.length === 0} handleOnClick={handleOnClick}>Reply</TButton>
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
              src={tweet.user.profile_image_url}
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
