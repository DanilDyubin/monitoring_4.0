import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import InputMask from 'react-input-mask';
import { LiaCalendarAlt } from 'react-icons/lia';

import useApiService from '../../service/useApiService';
import { useClickOutside } from '../../hooks/useClickOutside';
import {
  setUploadPhotosId,
  setPhotosUploadType,
} from '../../redux/slices/projectSlice';
import DatePickerForm from '../date-picker/DatePickerForm';
import PhotoPicker from '../photo-picker/PhotoPicker';
import Button from '../../ui/button/Button';

import s from './photosUpload.module.scss';

const PhotosUpload = ({ onClose }) => {
  const [date, setDate] = useState('');
  const [photos, setPhotos] = useState({ files: [], url: '' }); // стейт для PhotoPicker
  const [openCalendar, setOpenCalendar] = useState(false);

  const { createUpload } = useApiService();

  const calendarRef = useRef();
  const dispatch = useDispatch();

  const projectId = useSelector((state) => state.project.projectId); // projectId получаем из ProjectLayout

  // закрываем модалку, очищаем стейт, удаляем временный url
  const handleCancel = () => {
    if (photos.url) {
      URL.revokeObjectURL(photos.url);
    }
    setPhotos({ files: [], url: '' });
    setDate('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatedDate = moment(date, 'DD.MM.YYYY').valueOf();

    if (photos.files.length) {
      createUpload(projectId, formatedDate, photos.files).then(
        (id) => dispatch(setUploadPhotosId(id)) // передаем upload_id для получения всех загруженных фото в PhotoList
      );
    }
    // dispatch(setPhotosUploadType('device'));
    handleCancel();
  };

  const handleInputChange = (e) => {
    setDate(e.target.value);
  };

  const handleCalendarOpen = () => {
    setOpenCalendar(true);
  };

  const setCalendarDate = (calendarDate) => {
    setDate(moment(calendarDate).format('DD.MM.YYYY'));
  };

  useClickOutside(calendarRef, () => setOpenCalendar(false));
  console.log(moment(date, 'DD.MM.YYYY').valueOf());
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
              Выберите дату съемки
            </label>
            <div className={s['input-field']}>
              <InputMask
                mask="99.99.9999"
                className={s.input}
                name="date"
                placeholder="дд.мм.гггг"
                autoComplete="off"
                value={date}
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
            <Button
              title="Загрузить"
              type="submit"
              size="s"
              disabled={!date || !photos.files.length}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotosUpload;
