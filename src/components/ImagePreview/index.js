import PropTypes from 'prop-types';
import { Image } from 'antd-mobile';
import classNames from 'classnames';
import deleteIcon from '@assets/close.svg';
import { ReactSVG } from 'react-svg';
import styles from './index.module.scss';

const ImagePreview = ({
  imgs,
  handleImgDelete,
}) => {
  if (!imgs || imgs.length === 0) return null;
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
        {imgs.map((img, index) => (
          <div className={classNames(styles.imgContainer, `img${index}Container`)}>
            <ReactSVG className={styles.deleteIcon} src={deleteIcon} alt="" onClick={() => handleImgDelete(index)} />
            <Image
              fit="cover"
              className={classNames(styles.img, `img${index}`)}
              key={classNames(img, index)}
              src={img}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ImagePreview.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
  handleImgDelete: PropTypes.func.isRequired,
};

ImagePreview.defaultProps = {
  imgs: [],
};

export default ImagePreview;
