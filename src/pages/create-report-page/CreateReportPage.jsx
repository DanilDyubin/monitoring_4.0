import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearPhotosUploadType } from '../../redux/slices/projectSlice';

import useApiService from '../../service/useApiService';
import DateForm from '../../components/forms/date-form/DateForm';
import PhotosUpload from '../../components/photos-upload/PhotosUpload';
import PhotosList from '../../components/photos-list/PhotosList';
import Modal from '../../components/modal/Modal';
import Subtitle from '../../components/subtitle/Subtitle';
import Button from '../../ui/button/Button';
import { Spinner } from '../../ui/spinner/Spinner';

import s from './createReportPage.module.scss';
import PageSkeleton from '../../ui/skeletons/page-skeleton/PageSkeleton';

const CreateReportPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const projectId = useSelector((state) => state.project.projectId);
  const uploadPhotosId = useSelector((state) => state.project.uploadPhotosId);
  const photosUploadType = useSelector(
    (state) => state.project.photosUploadType
  );
  console.log(`photosUploadType - ${photosUploadType}`);
  const { createPredict } = useApiService();

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  const handleCreatePredict = async (uploadId) => {
    try {
      setLoading(true);
      await createPredict(uploadId);
      navigate(`/project/${projectId}/report/${uploadPhotosId}`);
    } catch (e) {
      console.error('Ошибка при создании отчёта:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className={s['create-report-page']}>
      <Subtitle subtitle="Добавление фотографий" />
      <div className={s.wrapper}>
        <DateForm
          label="Импорт фото из БД"
          btnTitle="Загрузить"
          photosUploadType={photosUploadType}
        />
        <Button
          title="Загрузить фото из носителя"
          variant="secondary"
          size="auto-big"
          onClick={onModalOpen}
          disabled={photosUploadType === 'db'}
        />
      </div>
      <div className={s.photos}>
        <button onClick={() => dispatch(clearPhotosUploadType())}>
          clearPhotosUploadType
        </button>
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
