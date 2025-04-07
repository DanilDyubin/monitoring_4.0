import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoChevronDownSharp } from 'react-icons/io5';

import { useClickOutside } from '../../../hooks/useClickOutside';
import PopupForm from './PopupForm';
import { setPhotosUploadType } from '../../../redux/slices/projectSlice';
import Button from '../../../ui/button/Button';

import s from './dateForm.module.scss';

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

const DateForm = ({
  label,
  btnTitle,
  photosUploadType,
  photosDatesFromDB,
  uploadPhotosUrlFromDB,
}) => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const popupRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const handleInputChange = (e) => {
  //   setValue(e.target.value);
  // };

  const handlePopupOpen = () => {
    // if (photosUploadType === 'device') return;
    setOpen(true);
  };

  const handleSelectDate = (date) => {
    // dispatch(setPhotosUploadType('db')); // делаем невозможной загрузку фото с носителя
    setValue(date);
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
          <div className={s['input-field']} onClick={handlePopupOpen}>
            <input
              className={s.input}
              readOnly={true}
              name="date"
              placeholder="Выберите дату"
              autoComplete="off"
              value={value}
              // onChange={handleInputChange}
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
          disabled={!value}
          onClick={() => uploadPhotosUrlFromDB('GJ8427-10-0002-001', value)}
        />
      </form>
      {open && (
        <PopupForm
          dates={data}
          onSelectDate={handleSelectDate}
          selectDate={value}
          photosDatesFromDB={photosDatesFromDB}
        />
      )}
    </div>
  );
};

export default DateForm;
