import React from 'react';
import moment from 'moment';
import ImageCard from '@components/ImageCard';
import Bar from '@components/Bar';
import styles from './index.module.scss';

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
    'https://pbs.twimg.com/media/FZlDCTGUEAAZMUE?format=jpg&name=900x900',
  ],
};

const TweetCard = () => (
  <div className={styles.container}>
    <div className={styles.avatarContainer}>
      <img
        src={tweet.user.profile_image_url}
        alt="avatar"
        className={styles.avatar}
      />
    </div>
    <div className={styles.contentContainer}>
      <div className={styles.header}>
        <span className={styles.name}>{tweet.user.name}</span>
        @
        <span className={styles.username}>{tweet.user.username}</span>
        &nbsp;&#183;&nbsp;
        {`${moment(tweet.created_at).format('hh')}h`}
      </div>
      <div className={styles.text}>{tweet.text}</div>
      <div className={styles.photo}>
        <ImageCard
          imgs={tweet.media_urls}
          replyCnt={tweet.comments_count}
          retweetCnt={tweet.retweet_count}
          likeCnt={tweet.likes_count}
        />
      </div>
      <div className={styles.bar}>
        <Bar
          replyCnt={tweet.comments_count}
          retweetCnt={tweet.retweet_count}
          likeCnt={tweet.likes_count}
        />
      </div>
    </div>
  </div>
);

export default TweetCard;
