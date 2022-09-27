import { useState } from 'react';
import { TextArea, Toast } from 'antd-mobile';
import moment from 'moment';
import Header from '@components/Header';
import TButton from '@components/TButton';
import ImageUpload from '@components/ImageUpload';
import ImagePreview from '@components/ImagePreview';
import { TweetAPI } from '@utils/TweetAPI';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import styles from './index.module.scss';

const ComposeTweet = () => {
  const [tweetContent, setTweetContent] = useState('');
  const [imgs, setImgs] = useState([]);
  const [store] = useAppContext();
  const goTo = useGoTo();

  const handleTweetSubmit = () => {
    TweetAPI.createTweet({
      created_at: moment(),
      user: {
        id: store.user?.id,
        name: store.user?.name,
        username: store.user?.username,
        profile_image_url: store.user?.profile_image_url,
      },
      text: tweetContent,
      likes_count: 0,
      comments_count: 0,
      retweet_count: 0,
      media_urls: Object.values(imgs),
    }).then((res) => {
      if (res.success) {
        Toast.show('Your tweet was sent.');
        goTo('');
      }
    });
  };

  const handleTweetContentChange = (v) => {
    setTweetContent(v);
  };

  const handleImgChange = (newState) => {
    if (newState && Object.keys(newState).length < 5) {
      setImgs((preState) => ({
        ...preState,
        ...newState,
      }));
      return;
    }
    Toast.show('Please choose up to 4 photos.');
  };

  const handleImgDelete = (index) => {
    const key = Object.keys(imgs).find((item, i) => i === index);
    setImgs((items) => {
      const newItems = { ...items };
      delete newItems[key];
      return newItems;
    });
  };

  return (
    <div className={styles.container}>
      <Header>
        <TButton
          disabled={tweetContent.length === 0 && Object.keys(imgs).length === 0}
          handleOnClick={handleTweetSubmit}
          isBlue
        >
          Tweet
        </TButton>
      </Header>
      <div className={styles.contentContainer}>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatar}
            src={store.user?.profile_image_url}
            alt="avatar"
          />
        </div>
        <div className={styles.tweetContainer}>
          <TextArea
            rows={5}
            value={tweetContent}
            onChange={handleTweetContentChange}
            className={styles.tweet}
            placeholder="What's happening?"
          />
          <ImagePreview imgs={Object.values(imgs)} handleImgDelete={handleImgDelete} />
          <div className={styles.imageUploadContainer}>
            <ImageUpload handleImgChange={handleImgChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeTweet;
