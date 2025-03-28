import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useApiService from '../../service/useApiService';
import DateForm from '../../components/forms/date-form/DateForm';
import PhotosUpload from '../../components/photos-upload/PhotosUpload';
import PhotosList from '../../components/photos-list/PhotosList';
import Modal from '../../components/modal/Modal';
import Subtitle from '../../components/subtitle/Subtitle';
import Button from '../../ui/button/Button';
import s from './createReportPage.module.scss';

const CreateReportPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const projectId = useSelector((state) => state.project.projectId);
  const uploadPhotosId = useSelector((state) => state.project.uploadPhotosId);
  const selectedUploadType = useSelector(
    (state) => state.project.selectedUploadType
  );
  console.log(`UploadPhotosId - ${uploadPhotosId}`);
  const { createPredict } = useApiService();

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  const handleCreatePredict = async (uploadId) => {
    try {
      await createPredict(uploadId);
      navigate(`/project/${projectId}/report/${uploadPhotosId}`);
    } catch (e) {
      console.error('Ошибка при создании отчёта:', e);
    }
  };

  return (
    <div className={s['create-report-page']}>
      <Subtitle subtitle="Добавление фотографий" />
      <div className={s.wrapper}>
        <DateForm
          label="Импорт фото из БД"
          btnTitle="Загрузить"
          selectedUploadType={selectedUploadType === 'device'}
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
        disabled={!uploadPhotosId}
        title="Создать"
        size="big"
        variant="primary"
        onClick={() => handleCreatePredict(uploadPhotosId)}
      />
      <Modal active={openModal} onClose={onModalClose}>
        <PhotosUpload onClose={onModalClose} />
      </Modal>
    </div>
  );
};

export default CreateReportPage;
