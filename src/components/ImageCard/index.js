import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageViewer } from 'antd-mobile';
import classNames from 'classnames';
import Bar from '@components/Bar';
import { BAR_TYPE_KEYS } from '@components/Bar/constants';
import styles from './index.module.scss';

const ImageCard = ({
  imgs, replyCnt, retweetCnt, likeCnt, data, setData,
  setRetweeted,
  setRetweetId,
  retweeted,
  retweetId,
  setLiked,
  setLikedId,
  liked,
  likedId,
}) => {
  const imageViewRef = useRef();
  const imageContainerRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  const getWrapperStyle = () => {
    switch (imgs.length) {
      case 1:
        return styles.wrapper1;
      case 2:
        return styles.wrapper2;
      case 3:
        return styles.wrapper3;
      case 4:
        return styles.wrapper4;
      default:
        return styles.wrapper;
    }
  };

  const handleImageOnClick = (index) => {
    setVisible(true);
    imageViewRef.current.swipeTo(index);
  };
  return (
    <div ref={imageContainerRef} className={styles.container}>
      <div className={classNames(styles.wrapper, getWrapperStyle())}>
        {imgs.map((img, index) => (
          <Image
            onClick={() => handleImageOnClick(index)}
            fit="cover"
            className={classNames(styles.img, `img${index}`)}
            key={classNames(img, index)}
            src={img}
            alt=""
            lazy
          />
        ))}
      </div>
      <ImageViewer.Multi
        getContainer={document.body}
        ref={imageViewRef}
        images={imgs}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        renderFooter={() => (
          <Bar
            id={data.id}
            isBottom
            replyCnt={replyCnt}
            retweetCnt={retweetCnt}
            likeCnt={likeCnt}
            data={data}
            setData={setData}
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
        )}
      />
    </div>
  );
};

ImageCard.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
  replyCnt: PropTypes.number,
  retweetCnt: PropTypes.number,
  likeCnt: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  setData: PropTypes.func,
  setRetweeted: PropTypes.func,
  setRetweetId: PropTypes.func,
  retweeted: PropTypes.bool,
  retweetId: PropTypes.number,
  setLiked: PropTypes.func,
  setLikedId: PropTypes.func,
  liked: PropTypes.bool,
  likedId: PropTypes.number,
};

ImageCard.defaultProps = {
  imgs: [],
  replyCnt: undefined,
  retweetCnt: undefined,
  likeCnt: undefined,
  data: {},
  setData: () => {},
  setRetweeted: () => {},
  setRetweetId: () => {},
  retweeted: false,
  retweetId: -1,
  setLiked: () => {},
  setLikedId: () => {},
  liked: false,
  likedId: -1,
};

export default ImageCard;
