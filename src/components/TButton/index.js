import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const TButton = ({ disabled, handleOnClick, children }) => (
  <div className={styles.container}>
    <Button
      disabled={disabled}
      className={styles.button}
      onClick={handleOnClick}
    >
      {children}
    </Button>
  </div>
);

TButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default TButton;
