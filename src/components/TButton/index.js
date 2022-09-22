import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const TButton = ({
  disabled, handleOnClick, children, isBlue, isBlack, isOutlined,
}) => (
  <div className={styles.container}>
    <Button
      disabled={disabled}
      className={classNames({
        [styles.button]: true,
        [styles.btnBlue]: isBlue,
        [styles.btnBlack]: isBlack,
        [styles.btnOutlined]: isOutlined,
      })}
      onClick={handleOnClick}
    >
      {children}
    </Button>
  </div>
);

TButton.propTypes = {
  disabled: PropTypes.bool,
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isBlue: PropTypes.bool,
  isBlack: PropTypes.bool,
  isOutlined: PropTypes.bool,
};

TButton.defaultProps = {
  disabled: false,
  isBlue: false,
  isBlack: false,
  isOutlined: false,
};
export default TButton;
