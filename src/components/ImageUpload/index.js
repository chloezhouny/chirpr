import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@components/IconButton';
import imageIcon from '@assets/image.svg';
import { fileByBase64 } from '@utils/index.js';
import styles from './index.module.scss';

const ImageUpload = ({ handleImgChange }) => {
  const handleUploadChange = (e) => {
    const files = Object.values(e.target.files);
    const flss = files.map((file) => new Promise((resolve) => {
      fileByBase64(file).then((content) => {
        resolve({
          key: file.name,
          content,
        });
      });
    }));
    Promise.all(flss).then((res) => {
      const result = {};
      res.forEach((item) => {
        result[item.key] = item.content;
      });
      handleImgChange(result);
    });
    e.target.value = '';
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        encType="multipart/form-data"
        accept="image/*"
        className={styles.uploadInput}
        multiple="multiple"
        onChange={handleUploadChange}
      />
      <IconButton
        src={imageIcon}
        wrapperClass={styles.imageUploadWrapper}
        svgClass={styles.imageUploadIcon}
      />
    </div>
  );
};

ImageUpload.propTypes = {
  handleImgChange: PropTypes.func.isRequired,
};

export default ImageUpload;
