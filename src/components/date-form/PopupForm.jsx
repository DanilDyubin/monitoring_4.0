import s from './dateForm.module.scss';

const PopupForm = ({ dates, onSelectDate, selectDate }) => {
  console.log(JSON.stringify(selectDate));
  console.log(selectDate);
  console.log(JSON.stringify(dates));
  return (
    <div className={s.popup}>
      <ul className={s.list}>
        {dates?.map((date, i) => (
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
        ))}
      </ul>
    </div>
  );
};

export default PopupForm;
