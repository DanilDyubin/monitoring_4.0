import { useState } from 'react';
import { useSelector } from 'react-redux';

import DateForm from '../../components/forms/date-form/DateForm';
import Modal from '../../components/modal/Modal';
import Subtitle from '../../components/subtitle/Subtitle';
import Button from '../../ui/button/Button';
import s from './createReportPage.module.scss';
import PhotosUpload from '../../components/photos-upload/PhotosUpload';
import PhotosList from '../../components/photos-list/PhotosList';

const CreateReportPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const selectedUploadType = useSelector(
    (state) => state.project.selectedUploadType
  );

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  // const handleUploadComplete = (id) => {
  //   setUploadId(id);
  //   setOpenModal(false);
  // };
  // console.log(`UploadId - ${uploadId}`);

  return (
    <div className={s['create-report-page']}>
      <Subtitle subtitle="Добавление фотографий" />
      <div className={s.wrapper}>
        <DateForm
          label="Импорт фото из БД"
          btnTitle="Загрузить"
          selectedUploadType={selectedUploadType}
        />
        <Button
          title="Загрузить фото из носителя"
          variant="secondary"
          size="auto-big"
          onClick={onModalOpen}
          disabled={selectedUploadType === 'db'}
        />
      </div>
      <div className={s.photos}>
        <PhotosList />
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
