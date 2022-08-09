import PropTypes from 'prop-types';
import { Image } from 'antd-mobile';
import classNames from 'classnames';
import styles from './index.module.scss';

const ImageCard = ({ imgs }) => {
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
  return (
    <div className={styles.container}>
      <div className={classNames(styles.wrapper, getWrapperStyle())}>
        {imgs.map((img, index) => (<Image fit="cover" className={classNames(styles.img, `img${index}`)} key={classNames(img, index)} src={img} alt="" />))}
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
};

ImageCard.defaultProps = {
  imgs: [],
};

export default ImageCard;
