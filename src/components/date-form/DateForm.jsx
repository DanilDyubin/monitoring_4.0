import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoChevronDownSharp } from 'react-icons/io5';
import PopupForm from './PopupForm';
import { setPhotoReportDate } from '../../redux/slices/projectSlice';
import Button from '../../ui/button/Button';

import s from './dateForm.module.scss';
import { useClickOutside } from '../../hooks/useClickOutside';

const data = [
  { date: '21.12.2025', id: 1 },
  { date: '07.12.2025', id: 2 },
  { date: '11.12.2025', id: 3 },
  { date: '09.12.2025', id: 4 },
  { date: '25.12.2025', id: 5 },
  { date: '21.12.2025', id: 6 },
  { date: '21.12.2025', id: 7 },
  { date: '21.12.2025', id: 8 },
  { date: '21.12.2025', id: 9 },
  { date: '21.12.2025', id: 10 },
  { date: '21.12.2025', id: 11 },
];

const DateForm = ({ label, btnTitle }) => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const selectDate = useSelector((state) => state.project.photoReportDate);

  const dispatch = useDispatch();

  const popupRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handlePopupOpen = () => {
    setOpen(true);
  };

  const handleSelectDate = (date) => {
    dispatch(setPhotoReportDate(date));
    setValue(date.date);
    setOpen(false);
  };

  useClickOutside(popupRef, () => setOpen(false));

  return (
    <div className={s['date-form']} ref={popupRef}>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s['input-component']}>
          <label htmlFor="date" className={s.label}>
            {label}
          </label>
          <div className={s['input-field']}>
            <input
              className={s.input}
              readOnly={true}
              name="date"
              placeholder="Выберите дату"
              autoComplete="off"
              value={value}
              onChange={handleInputChange}
              onClick={handlePopupOpen}
            />
            <IoChevronDownSharp
              className={open ? s.icon + ` ` + s.up : s.icon}
            />
          </div>
        </div>
        <Button
          title={btnTitle}
          variant="secondary"
          size="auto-big"
          type="submit"
        />
      </form>
      {open && (
        <PopupForm
          dates={data}
          onSelectDate={handleSelectDate}
          selectDate={selectDate}
        />
      )}
    </div>
  );
};

export default DateForm;
