import { useState, useEffect } from 'react';
import { Input } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function TInput({
  label, value, length, onChange, valid, type,
}) {
  const [contentFocused, setContentFocused] = useState(false);
  const [containerFocused, setContainerFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setContentFocused(true);
      setContainerFocused(true);
    }
  }, [value]);

  const handleFocus = () => {
    setContentFocused(true);
    setContainerFocused(true);
  };

  const handleBlur = () => {
    if (value === undefined || value.length === 0) {
      setContentFocused(false);
    }
    setContainerFocused(false);
  };

  const handleOnChange = (val) => {
    if (length && val.length > length) return;
    onChange(val);
  };
  return (
    <div className={`${containerFocused ? styles.containerFocused : styles.container} ${containerFocused ? !valid && styles.inValid : !valid && styles.inValidContainer} `}>
      <div className={`${contentFocused ? styles.labelFocused : styles.label} ${valid ? '' : containerFocused && styles.labelInvalid} ${containerFocused ? '' : styles.labelBlurred}`}>
        {label}
      </div>
      {containerFocused && length && (
        <span className={styles.labelTop}>
          {value.length}
          {' '}
          /
          {' '}
          {length}
        </span>
      )}
      <Input
        className={contentFocused ? styles.inputFocused : styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={handleOnChange}
        type={type}
      />
    </div>
  );
}

TInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  length: PropTypes.number,
  onChange: PropTypes.func,
  valid: PropTypes.bool,
  type: PropTypes.string,
};

TInput.defaultProps = {
  label: '',
  value: undefined,
  length: undefined,
  onChange: () => {},
  valid: true,
  type: '',
};

export default TInput;
