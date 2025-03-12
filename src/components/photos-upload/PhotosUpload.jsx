import { useState, useRef } from 'react';

import moment from 'moment';
import InputMask from 'react-input-mask';
import { LiaCalendarAlt } from 'react-icons/lia';

import { useClickOutside } from '../../hooks/useClickOutside';
import DatePickerForm from '../date-picker/DatePickerForm';
import PhotoPicker from '../photo-picker/PhotoPicker';
import Button from '../../ui/button/Button';

import s from './photosUpload.module.scss';

const PhotosUpload = ({ onClose }) => {
  const [value, setValue] = useState('');
  const [photos, setPhotos] = useState({ files: [], url: '' }); // стейт для PhotoPicker
  const [openCalendar, setOpenCalendar] = useState(false);

  const calendarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleCalendarOpen = () => {
    setOpenCalendar(true);
  };

  const setCalendarDate = (calendarDate) => {
    setValue(moment(calendarDate).format('DD.MM.YYYY'));
  };

  useClickOutside(calendarRef, () => setOpenCalendar(false));

  // закрываем модалку, очищаем стейт, удаляем временный url
  const handleCancel = () => {
    if (photos.url) {
      URL.revokeObjectURL(photos.url);
    }
    setPhotos({ files: [], url: '' });
    onClose();
  };

  return (
    <div className={s['photos-upload']}>
      <PhotoPicker photos={photos} setPhotos={setPhotos} />
      <div className={s.wrapper}>
        <h3 className={s.title}>Загрузка новых фото</h3>
        <form className={s.form} onSubmit={handleSubmit}>
          <div
            className={s['input-component']}
            ref={calendarRef}
            onClick={handleCalendarOpen}
          >
            <label htmlFor="date" className={s.label}>
              Импорт фото из БД
            </label>
            <div className={s['input-field']}>
              <InputMask
                mask="99.99.9999"
                className={s.input}
                name="date"
                placeholder="дд.мм.гггг"
                autoComplete="off"
                value={value}
                onChange={handleInputChange}
              />
              <LiaCalendarAlt className={s.icon} />
            </div>
            {openCalendar && (
              <div className={s.calendar}>
                <DatePickerForm
                  setOpenCalendar={setOpenCalendar}
                  setCalendarDate={setCalendarDate}
                />
              </div>
            )}
          </div>
          <div className={s.btns}>
            <Button
              title="Отменить"
              type="button"
              onClick={handleCancel}
              size="s"
            />
            <Button title="Загрузить" type="submit" size="s" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotosUpload;
