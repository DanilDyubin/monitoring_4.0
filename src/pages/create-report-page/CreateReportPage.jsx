import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearPhotosUploadType,
  setIsPredictLoading,
  setPhotosUrlsFromDB,
} from '../../redux/slices/projectSlice';

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
  const [photosLoading, setPhotosLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const projectId = useSelector((state) => state.project.projectId);
  const uploadPhotosId = useSelector((state) => state.project.uploadPhotosId);
  const photosUploadType = useSelector(
    (state) => state.project.photosUploadType
  );
  const photosDatesFromDB = useSelector(
    (state) => state.project.photosDatesFromDB
  );

  const { createPredict, getPhotosFromDB } = useApiService();

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  const handleCreatePredict = async (uploadId) => {
    try {
      dispatch(setIsPredictLoading(true));
      await createPredict(uploadId);
      navigate(`/project/${projectId}/report/${uploadPhotosId}`);
    } catch (e) {
      console.error('Ошибка при создании отчёта:', e);
    } finally {
      dispatch(setIsPredictLoading(false));
    }
  };

  const uploadPhotosUrlFromDB = async (uin, date) => {
    if (!date) return;
    try {
      const data = await getPhotosFromDB(uin, date);
      dispatch(setPhotosUrlsFromDB(data));
    } catch (error) {
      console.error('Ошибка при получении фото из БД:', error);
    }
  };

  return (
    <div className={s['create-report-page']}>
      <Subtitle subtitle="Добавление фотографий" />
      <div className={s.wrapper}>
        <DateForm
          label="Импорт фото из БД"
          btnTitle="Загрузить"
          photosUploadType={photosUploadType}
          photosDatesFromDB={photosDatesFromDB}
          uploadPhotosUrlFromDB={uploadPhotosUrlFromDB}
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
        {/* <button onClick={() => dispatch(clearPhotosUploadType())}>
          clearPhotosUploadType
        </button> */}
        <PhotosList photosLoading={photosLoading} />
      </div>
      <Button
        disabled={!uploadPhotosId}
        title="Создать"
        size="big"
        variant="primary"
        onClick={() => handleCreatePredict(uploadPhotosId)}
      />
      <Modal active={openModal} onClose={onModalClose}>
        <PhotosUpload
          onClose={onModalClose}
          setPhotosLoading={setPhotosLoading}
        />
      </Modal>
    </div>
  );
};

export default CreateReportPage;
