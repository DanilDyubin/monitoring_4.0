import { useState } from 'react';

import DateForm from '../../components/date-form/DateForm';
import Modal from '../../components/modal/Modal';
import Subtitle from '../../components/subtitle/Subtitle';
import Button from '../../ui/button/Button';
import s from './createReportPage.module.scss';
import PhotosUpload from '../../components/photos-upload/PhotosUpload';

const CreateReportPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div className={s['create-report-page']}>
      <Subtitle subtitle="Добавление фотографий" />
      <div className={s.wrapper}>
        <DateForm label="Импорт фото из БД" btnTitle="Загрузить" />
        <Button
          title="Загрузить фото из носителя"
          variant="secondary"
          size="auto-big"
          onClick={onModalOpen}
        />
      </div>
      <Button
        //   disabled={!formValide || !hasItemsAndImgs}
        title="Создать"
        size="big"
        variant="primary"
      />
      <Modal active={openModal} onClose={onModalClose}>
        <PhotosUpload onClose={onModalClose} />
      </Modal>
    </div>
  );
};

export default CreateReportPage;
