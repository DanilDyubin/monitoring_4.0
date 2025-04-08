import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearPhotosFromDB,
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

import s from './createReportPage.module.scss';

const CreateReportPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [photosId, setPhotosId] = useState([]);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const projectId = useSelector((state) => state.project.projectId);
  const uploadPhotosId = useSelector((state) => state.uploadId.uploadPhotosId);
  const photosUploadType = useSelector(
    (state) => state.project.photosUploadType
  );
  const photosDatesFromDB = useSelector(
    (state) => state.project.photosDatesFromDB
  );

  const {
    createPredict,
    getPhotosFromDB,
    getPhotos,
    uploadPhotos,
    deletePhoto,
  } = useApiService();

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };
  console.log(JSON.stringify(photosId));
  // создание отчета (предикта)
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

  // загрузка фото из БД
  const uploadPhotosUrlFromDB = async (uin, date) => {
    if (!date) return;
    try {
      setPhotosLoading(true);
      const data = await getPhotosFromDB(uin, date);
      dispatch(setPhotosUrlsFromDB(data));
    } catch (error) {
      console.error('Ошибка при получении фото из БД:', error);
    } finally {
      setPhotosLoading(false);
    }
  };

  // получение всех id фото, загруженных из носителя
  const fetchPhotos = useCallback(async () => {
    if (!uploadPhotosId) return;
    try {
      const data = await getPhotos(uploadPhotosId);
      setPhotosId(data);
    } catch (error) {
      console.error('Ошибка получения фотографий:', error);
    }
  }, [uploadPhotosId, getPhotos]);

  useEffect(() => {
    fetchPhotos();
  }, [uploadPhotosId]);

  const handleUploadPhotos = async (photos) => {
    if (!uploadPhotosId || !photos.length) return;
    try {
      setPhotosLoading(true);
      await uploadPhotos(uploadPhotosId, photos);
      await fetchPhotos();
    } catch (error) {
      console.error('Ошибка загрузки фотографий:', error);
    } finally {
      setPhotosLoading(false);
    }
  };

  // удаление фото, загруженных из носителя
  const handleDeletePhoto = async (id) => {
    try {
      setPhotosLoading(true);
      await deletePhoto(id);
      setPhotosId((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка удаления фотографии:', error);
    } finally {
      setPhotosLoading(false);
    }
  };

  // удаление со страницы фото, загруженных из БД
  const onDeleteDBPhotos = () => {
    dispatch(clearPhotosFromDB());
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
        <PhotosList
          photosId={photosId}
          photosLoading={photosLoading}
          onDelete={handleDeletePhoto}
          onUpload={handleUploadPhotos}
          onDeleteDBPhotos={onDeleteDBPhotos}
        />
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

// import { useEffect, useState, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import {
//   setIsPredictLoading,
//   setPhotosUrlsFromDB,
//   clearPhotosFromDB,
// } from '../../redux/slices/projectSlice';

// import {
//   setUploadPhotosId,
//   setPhotosUploadType,
// } from '../../redux/slices/uploadIdSlice';

// import useApiService from '../../service/useApiService';

// import Subtitle from '../../components/subtitle/Subtitle';
// import DateForm from '../../components/forms/date-form/DateForm';
// import Button from '../../ui/button/Button';
// import Modal from '../../components/modal/Modal';
// import PhotosUpload from '../../components/photos-upload/PhotosUpload';
// import PhotosList from '../../components/photos-list/PhotosList';
// import Loader from '../../ui/loader/Loader';

// import s from './createReportPage.module.scss';

// const CreateReportPage = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [photosId, setPhotosId] = useState([]);
//   const [loading, setLoading] = useState({
//     fromDB: false,
//     upload: false,
//     delete: false,
//     predict: false,
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { getPhotos, uploadPhotos, deletePhoto, getPhotosFromDB, createPredict, createUpload } = useApiService();

//   const projectId = useSelector((state) => state.project.projectId);
//   const uploadPhotosId = useSelector((state) => state.uploadId.uploadPhotosId);
//   const photosUploadType = useSelector((state) => state.project.photosUploadType);
//   const photosDatesFromDB = useSelector((state) => state.project.photosDatesFromDB);
//   const urls = useSelector((state) => state.project.photosUrlsFromDB);

//   const isLoading = Object.values(loading).some(Boolean);

//   const fetchPhotos = useCallback(async () => {
//     if (!uploadPhotosId) return;
//     try {
//       const data = await getPhotos(uploadPhotosId);
//       setPhotosId(data);
//     } catch (error) {
//       console.error('Ошибка получения фотографий:', error);
//     }
//   }, [uploadPhotosId, getPhotos]);

//   useEffect(() => {
//     fetchPhotos();
//   }, [uploadPhotosId]);

//   const handleUploadPhotos = async (photos) => {
//     if (!uploadPhotosId || !photos.length) return;
//     try {
//       setLoading((prev) => ({ ...prev, upload: true }));
//       await uploadPhotos(uploadPhotosId, photos);
//       await fetchPhotos();
//     } catch (error) {
//       console.error('Ошибка загрузки фотографий:', error);
//     } finally {
//       setLoading((prev) => ({ ...prev, upload: false }));
//     }
//   };

//   const handleDeletePhoto = async (id) => {
//     try {
//       setLoading((prev) => ({ ...prev, delete: true }));
//       await deletePhoto(id);
//       setPhotosId((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error('Ошибка удаления фотографии:', error);
//     } finally {
//       setLoading((prev) => ({ ...prev, delete: false }));
//     }
//   };

//   const handleCreatePredict = async (uploadId) => {
//     try {
//       setLoading((prev) => ({ ...prev, predict: true }));
//       await createPredict(uploadId);
//       navigate(`/project/${projectId}/report/${uploadPhotosId}`);
//     } catch (e) {
//       console.error('Ошибка при создании отчёта:', e);
//     } finally {
//       setLoading((prev) => ({ ...prev, predict: false }));
//     }
//   };

//   const uploadPhotosUrlFromDB = async (uin, date) => {
//     if (!date) return;
//     try {
//       setLoading((prev) => ({ ...prev, fromDB: true }));
//       const data = await getPhotosFromDB(uin, date);
//       dispatch(setPhotosUrlsFromDB(data));
//     } catch (error) {
//       console.error('Ошибка при получении фото из БД:', error);
//     } finally {
//       setLoading((prev) => ({ ...prev, fromDB: false }));
//     }
//   };

//   const onModalOpen = () => setOpenModal(true);
//   const onModalClose = () => setOpenModal(false);

//   return (
//     <div className={s['create-report-page']}>
//       <Subtitle subtitle="Добавление фотографий" />

//       <div className={s.wrapper}>
//         <DateForm
//           label="Импорт фото из БД"
//           btnTitle="Загрузить"
//           photosUploadType={photosUploadType}
//           photosDatesFromDB={photosDatesFromDB}
//           uploadPhotosUrlFromDB={uploadPhotosUrlFromDB}
//         />

//         <Button
//           title="Загрузить фото из носителя"
//           variant="secondary"
//           size="auto-big"
//           onClick={onModalOpen}
//           disabled={photosUploadType === 'db'}
//         />
//       </div>

//       <div className={s.photos}>
//         {isLoading ? (
//           <Loader />
//         ) : (
//           <PhotosList
//             photosId={photosId}
//             urls={urls}
//             onDelete={handleDeletePhoto}
//             onUpload={handleUploadPhotos}
//           />
//         )}
//       </div>

//       <Button
//         disabled={!uploadPhotosId}
//         title="Создать"
//         size="big"
//         variant="primary"
//         onClick={() => handleCreatePredict(uploadPhotosId)}
//       />

//       <Modal active={openModal} onClose={onModalClose}>
//         <PhotosUpload
//           onClose={onModalClose}
//           setPhotosLoading={(v) => setLoading((prev) => ({ ...prev, upload: v }))}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default CreateReportPage;
