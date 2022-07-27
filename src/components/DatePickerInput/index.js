import { useState, useCallback } from 'react';
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
  const handleDatePicker = () => {
    setVisible(true);
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
        onClose={() => {
          setVisible(false);
        }}
        min={min}
        max={now}
        defaultValue={now}
        onConfirm={(val) => {
          onChange(moment(val).format('MM/DD/YYYY'));
        }}
        renderLabel={labelRenderer}
      />
      <div className={styles.datePickerContainer} onClick={handleDatePicker}>
        <div className={styles.datePickerName}>Date of birth</div>
        <div className={styles.datePickerPlaceholder}>
          <span>
            {' '}
            {value ? moment(value).format('MM/DD/YYYY') : 'mm/dd/yyyy'}
            {' '}
          </span>
          <img src={calendarIcon} alt="calendarIcon" className={styles.calendarIcon} />
        </div>
      </div>
    </>
  );
}

DatePickerInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePickerInput;
