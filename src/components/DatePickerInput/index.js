import { useState, useCallback, useEffect } from 'react';
import { DatePicker } from 'antd-mobile';
import PropTypes from 'prop-types';
import moment from 'moment';
import calendarIcon from '../../assets/calendar.svg';
import styles from './index.module.scss';
import numToMonth from './numToMonth';

const now = new Date();
const min = new Date('Jan 1, 1900');

function DatePickerInput({ value, onChange }) {
  const [visible, setVisible] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);
  const [containerFocused, setContainerFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setContentFocused(true);
      setContainerFocused(true);
    }
  }, []);

  const handleOnClick = () => {
    setVisible(true);
    setContentFocused(true);
    setContainerFocused(true);
  };

  const handleConfirm = (val) => {
    setVisible(false);
    onChange(moment(val).format('MM/DD/YYYY'));
    if (val.length === 0) {
      setContentFocused(false);
    }
    setContainerFocused(false);
  };

  const labelRenderer = useCallback((type, data) => {
    switch (type) {
      case 'month':
        return numToMonth(data);
      default:
        return data;
    }
  }, []);

  return (
    <>
      <DatePicker
        title=""
        cancelText=""
        confirmText="Next"
        visible={visible}
        min={min}
        max={now}
        defaultValue={now}
        onConfirm={handleConfirm}
        renderLabel={labelRenderer}
      />
      <div
        className={containerFocused ? styles.containerFocused : styles.container}
        onClick={handleOnClick}
      >
        <div className={contentFocused ? styles.nameFocused : styles.name}>Date of birth</div>
        <div className={contentFocused ? styles.placeholderFocused : styles.placeholder}>
          <span>
            {' '}
            {value ? moment(value).format('MM/DD/YYYY') : 'mm/dd/yyyy'}
            {' '}
          </span>
          <img
            src={calendarIcon}
            alt="calendarIcon"
            className={styles.calendarIcon}
          />
        </div>
      </div>
    </>
  );
}

DatePickerInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

DatePickerInput.defaultProps = {
  value: '',
  onChange: () => {},
};

export default DatePickerInput;
