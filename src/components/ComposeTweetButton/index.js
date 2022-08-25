import PropTypes from 'prop-types';
import composeTweetIcon from '@assets/compose.svg';
import styles from './index.module.scss';

const ComposeTweetButton = ({ handleComposeTweetOnClick }) => (
  <div className={styles.container} onClick={handleComposeTweetOnClick}>
    <img className={styles.button} src={composeTweetIcon} alt="" />
  </div>
);

ComposeTweetButton.propTypes = {
  handleComposeTweetOnClick: PropTypes.func.isRequired,
};
export default ComposeTweetButton;
