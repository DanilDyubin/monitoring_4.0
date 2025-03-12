import InputMask from 'react-input-mask';

import s from './calendarForm.module.scss';

const CalendarForm = () => {
  return <div></div>;
};

export default CalendarForm;

const CalendarInput = ({ name, title, onChange, value, placeholder }) => {
  return (
    <InputMask
      mask="99.99.9999"
      onChange={onChange}
      value={value}
      className={s.input}
      name={name}
      placeholder={placeholder}
    />
  );
};
