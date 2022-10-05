import moment from 'moment';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import Header from '@components/Header';
import ImageCard from '@components/ImageCard';
import CommentCard from '@components/CommentCard';
import Bar from '@components/Bar';
import { BAR_TYPE_KEYS } from '@components/Bar/constants';
import { ReplyAPI } from '@utils/ReplyAPI';
import styles from './index.module.scss';

const Tweet = () => {
  const location = useLocation();
  const dataSrc = location.state;
  const [data, setData] = useState(dataSrc);
  const [commentData, setCommentData] = useState([]);
  const [retweeted, setRetweeted] = useState(false);
  const [retweetId, setRetweetId] = useState();
  const [liked, setLiked] = useState(false);
  const [likedId, setLikedId] = useState();
  useEffect(() => {
    const init = async () => {
      setData(dataSrc);
      const res = await ReplyAPI.getReplysByTweet(location.state.id);
      setCommentData(res.data);
    };
    init();
  }, []);
  return (
    <>
      <Helmet><title>{`${data.user.name} on twittuer: "${data.text}"`}</title></Helmet>
      <Header />
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatar}
                src={data.user.profile_image_url}
                alt=""
              />
            </div>
            <div className={styles.nameContainer}>
              <div className={styles.name}>{data.user.name}</div>
              <div className={styles.username}>
                @
                {data.user.username}
              </div>
            </div>
          </div>
          <div className={styles.text}>
            {data.text}
          </div>
          {data.media_urls.length > 0 && (
          <div className={styles.photo}>
            <ImageCard
              data={data}
              setData={setData}
              imgs={data.media_urls}
              replyCnt={data.comments_count}
              retweetCnt={data.retweet_count}
              likeCnt={data.likes_count}
              setRetweeted={setRetweeted}
              setRetweetId={setRetweetId}
              retweeted={retweeted}
              retweetId={retweetId}
              setLiked={setLiked}
              setLikedId={setLikedId}
              liked={liked}
              likedId={likedId}
            />
          </div>
          )}
        </div>
        <div className={styles.time}>
          {`${moment(data.created_at).format('hh:mm A · MMM Do, YYYY')}`}
         &nbsp;&#183;&nbsp; Twittuer for iPhone
        </div>
        <div className={styles.bar}>
          <Bar
            data={data}
            setData={setData}
            id={data.id}
            replyCnt={data.comments_count}
            retweetCnt={data.retweet_count}
            likeCnt={data.likes_count}
            type={BAR_TYPE_KEYS.TWEET}
            setRetweeted={setRetweeted}
            setRetweetId={setRetweetId}
            retweeted={retweeted}
            retweetId={retweetId}
            setLiked={setLiked}
            setLikedId={setLikedId}
            liked={liked}
            likedId={likedId}
          />
        </div>
      </div>
      {commentData.map((item) => (<CommentCard key={item.id} dataSrc={item} />))}
    </>
  );
};

export default Tweet;
