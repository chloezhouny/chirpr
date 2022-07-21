import calendarIcon from '../../assets/calendar.svg';
import styles from './index.module.css';

function DatePicker() {
  return (
    <div className={styles.datePickerContainer}>
      <div className={styles.datePickerName}>Date of birth</div>
      <div className={styles.datePickerPlaceholder}>
        <span> mm/dd/yyyy </span>
        <img src={calendarIcon} alt="calendarIcon" className={styles.calendarIcon} />
      </div>
    </div>
  );
}

export default DatePicker;
