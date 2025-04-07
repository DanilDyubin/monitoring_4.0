import s from './dateForm.module.scss';

const PopupForm = ({ dates, onSelectDate, selectDate, photosDatesFromDB }) => {
  return (
    <div className={s.popup}>
      <ul className={s.list}>
        {/* {dates?.map((date, i) => (
          <li
            className={
              selectDate?.id === date.id
                ? s['list-item'] + ` ` + s.active
                : s['list-item']
            }
            key={i}
            onClick={() => onSelectDate(date)}
          >
            {date.date}
          </li>
        ))} */}
        {photosDatesFromDB?.map((date, i) => (
          <li
            className={
              selectDate === date
                ? s['list-item'] + ` ` + s.active
                : s['list-item']
            }
            key={i}
            onClick={() => onSelectDate(date)}
          >
            {date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopupForm;
