import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';

const IconButton = ({
  src,
  wrapperClass,
  svgClass,
}) => (
  <div className={wrapperClass}>
    <ReactSVG
      src={src}
      beforeInjection={(svg) => {
        if (!svgClass) return;
        svg.childNodes.forEach((item) => item?.classList?.add(svgClass));
      }}
    />
  </div>
);
IconButton.propTypes = {
  src: PropTypes.string.isRequired,
  wrapperClass: PropTypes.string.isRequired,
  svgClass: PropTypes.string.isRequired,
};
export default IconButton;
