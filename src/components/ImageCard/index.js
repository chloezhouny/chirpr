import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageViewer } from 'antd-mobile';
import classNames from 'classnames';
import Bar from '@components/Bar';
import { BAR_TYPE_KEYS } from '@components/Bar/constants';
import styles from './index.module.scss';

const ImageCard = ({
  imgs, replyCnt, retweetCnt, likeCnt,
}) => {
  const imageViewRef = useRef();
  const [visible, setVisible] = useState(false);
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
    <div className={styles.container}>
      <div className={classNames(styles.wrapper, getWrapperStyle())}>
        {imgs.map((img, index) => (
          <Image
            onClick={() => handleImageOnClick(index)}
            fit="cover"
            className={classNames(styles.img, `img${index}`)}
            key={classNames(img, index)}
            src={img}
            alt=""
          />
        ))}
      </div>
      <ImageViewer.Multi
        ref={imageViewRef}
        images={imgs}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
      {visible && (
        <Bar
          isBottom
          replyCnt={replyCnt}
          retweetCnt={retweetCnt}
          likeCnt={likeCnt}
          type={BAR_TYPE_KEYS.TWEET}
        />
      )}
    </div>
  );
};

ImageCard.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
  replyCnt: PropTypes.number.isRequired,
  retweetCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
};

ImageCard.defaultProps = {
  imgs: [],
};

export default ImageCard;
