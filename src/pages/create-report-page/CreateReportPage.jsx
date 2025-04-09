// import { useCallback, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { setIsPredictLoading } from '../../redux/slices/projectSlice';
// import { setUploadPhotosId } from '../../redux/slices/uploadIdSlice';

// import useApiService from '../../service/useApiService';
// import DateForm from '../../components/forms/date-form/DateForm';
// import PhotosUpload from '../../components/photos-upload/PhotosUpload';
// import PhotosList from '../../components/photos-list/PhotosList';
// import Modal from '../../components/modal/Modal';
// import Subtitle from '../../components/subtitle/Subtitle';
// import Button from '../../ui/button/Button';

// import s from './createReportPage.module.scss';

// const CreateReportPage = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [photosLoading, setPhotosLoading] = useState(false);
//   const [photosId, setPhotosId] = useState([]);
//   const [photosDB, setPhotosDB] = useState([]);
//   const [uploadIdFromDb, setUploadIdFromDb] = useState([]);
//   const [uploadId, setUploadId] = useState([]);

//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const projectId = useSelector((state) => state.project.projectId);
//   const uploadPhotosId = useSelector((state) => state.uploadId.uploadPhotosId);

//   console.log(`PhotosDB - ${JSON.stringify(photosDB)}`);
//   console.log(`PhotosID - ${JSON.stringify(photosId)}`);
//   const photosDatesFromDB = useSelector(
//     (state) => state.project.photosDatesFromDB
//   );
//   console.log(JSON.stringify(photosDatesFromDB));
//   const {
//     createPredict,
//     getPhotosFromDB,
//     getPhotos,
//     uploadPhotos,
//     deletePhoto,
//   } = useApiService();

//   const onModalOpen = () => {
//     setOpenModal(true);
//   };
//   // console.log(`UploadID - ${uploadPhotosId}`);
//   const onModalClose = () => {
//     setOpenModal(false);
//   };

//   // создание отчета (предикта)
//   const handleCreatePredict = async (uploadId) => {
//     try {
//       dispatch(setIsPredictLoading(true));
//       await createPredict(uploadId);
//       navigate(`/project/${projectId}/report/${uploadPhotosId}`);
//     } catch (e) {
//       console.error('Ошибка при создании отчёта:', e);
//     } finally {
//       dispatch(setIsPredictLoading(false));
//     }
//   };

//   // загрузка фото из БД
//   const uploadPhotosUrlFromDB = async (uin, date) => {
//     if (!date) return;
//     try {
//       setPhotosLoading(true);
//       const data = await getPhotosFromDB(projectId, uin, date);
//       setPhotosDB(data);
//       // setUploadIdFromDb(data[0].upload_id);
//     } catch (error) {
//       console.error('Ошибка при получении фото из БД:', error);
//     } finally {
//       setPhotosLoading(false);
//     }
//   };

//   // получение всех id фото, загруженных из носителя
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
//       setPhotosLoading(true);
//       await uploadPhotos(uploadPhotosId, photos);
//       await fetchPhotos();
//     } catch (error) {
//       console.error('Ошибка загрузки фотографий:', error);
//     } finally {
//       setPhotosLoading(false);
//     }
//   };

//   // удаление фото, загруженных из носителя
//   const handleDeletePhoto = async (id) => {
//     try {
//       setPhotosLoading(true);
//       await deletePhoto(id);
//       setPhotosId((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error('Ошибка удаления фотографии:', error);
//     } finally {
//       setPhotosLoading(false);
//     }
//   };

//   // удаление со страницы фото, загруженных из БД
//   const onDeleteDBPhotos = () => {
//     setPhotosDB([]);
//   };

//   return (
//     <div className={s['create-report-page']}>
//       <Subtitle subtitle="Добавление фотографий" />
//       <div className={s.wrapper}>
//         <DateForm
//           label="Импорт фото из БД"
//           btnTitle="Загрузить"
//           // photosUploadType={photosUploadType}
//           photosDatesFromDB={photosDatesFromDB}
//           uploadPhotosUrlFromDB={uploadPhotosUrlFromDB}
//           photosId={photosId}
//         />
//         <Button
//           title="Загрузить фото из носителя"
//           variant="secondary"
//           size="auto-big"
//           onClick={onModalOpen}
//           disabled={photosDB.length > 0}
//         />
//       </div>
//       <div className={s.photos}>
//         <PhotosList
//           photosId={photosId}
//           photosDB={photosDB}
//           photosLoading={photosLoading}
//           onDelete={handleDeletePhoto}
//           onUpload={handleUploadPhotos}
//           onDeleteDBPhotos={onDeleteDBPhotos}
//         />
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
//           setPhotosLoading={setPhotosLoading}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default CreateReportPage;

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPredictLoading } from '../../redux/slices/projectSlice';
import { setUploadPhotosId } from '../../redux/slices/uploadIdSlice';

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
  const [photosDB, setPhotosDB] = useState([]);
  const [uploadIdFromDb, setUploadIdFromDb] = useState('');
  const [uploadIdDevice, setUploadIdDevice] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const projectId = useSelector((state) => state.project.projectId);
  // const uploadPhotosId = useSelector((state) => state.uploadId.uploadPhotosId);
  const uploadId = uploadIdDevice || uploadIdFromDb;

  console.log(`PhotosDB - ${JSON.stringify(photosDB)}`);
  console.log(`PhotosID - ${JSON.stringify(photosId)}`);
  console.log(`UploadDB - ${uploadIdFromDb}`);
  console.log(`UploadID - ${uploadIdDevice}`);
  console.log(uploadId);
  const photosDatesFromDB = useSelector(
    (state) => state.project.photosDatesFromDB
  );
  console.log(JSON.stringify(photosDatesFromDB));
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
  // console.log(`UploadID - ${uploadPhotosId}`);
  const onModalClose = () => {
    setOpenModal(false);
  };

  // создание отчета (предикта)
  const handleCreatePredict = async (uploadId) => {
    try {
      dispatch(setIsPredictLoading(true));
      await createPredict(uploadId);
      navigate(`/project/${projectId}/report/${uploadId}`);
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
      const data = await getPhotosFromDB(projectId, uin, date);
      setPhotosDB(data);
      setUploadIdFromDb(data[0].upload_id);
    } catch (error) {
      console.error('Ошибка при получении фото из БД:', error);
    } finally {
      setPhotosLoading(false);
    }
  };

  // получение всех id фото, загруженных из носителя
  const fetchPhotos = useCallback(async () => {
    if (!uploadIdDevice) return;
    try {
      const data = await getPhotos(uploadIdDevice);
      setPhotosId(data);
    } catch (error) {
      console.error('Ошибка получения фотографий:', error);
    }
  }, [uploadIdDevice, getPhotos]);

  useEffect(() => {
    fetchPhotos();
  }, [uploadIdDevice]);

  const handleUploadPhotos = async (photos) => {
    if (!uploadIdDevice || !photos.length) return;
    try {
      setPhotosLoading(true);
      await uploadPhotos(uploadIdDevice, photos);
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
    setPhotosDB([]);
  };

  return (
    <div className={s['create-report-page']}>
      <Subtitle subtitle="Добавление фотографий" />
      <div className={s.wrapper}>
        <DateForm
          label="Импорт фото из БД"
          btnTitle="Загрузить"
          // photosUploadType={photosUploadType}
          photosDatesFromDB={photosDatesFromDB}
          uploadPhotosUrlFromDB={uploadPhotosUrlFromDB}
          photosId={photosId}
        />
        <Button
          title="Загрузить фото из носителя"
          variant="secondary"
          size="auto-big"
          onClick={onModalOpen}
          disabled={photosDB.length > 0}
        />
      </div>
      <div className={s.photos}>
        <PhotosList
          photosId={photosId}
          photosDB={photosDB}
          photosLoading={photosLoading}
          onDelete={handleDeletePhoto}
          onUpload={handleUploadPhotos}
          onDeleteDBPhotos={onDeleteDBPhotos}
        />
      </div>
      <Button
        disabled={!uploadId}
        title="Создать"
        size="big"
        variant="primary"
        onClick={() => handleCreatePredict(uploadId)}
      />
      <Modal active={openModal} onClose={onModalClose}>
        <PhotosUpload
          onClose={onModalClose}
          setPhotosLoading={setPhotosLoading}
          setUploadIdDevice={setUploadIdDevice}
        />
      </Modal>
    </div>
  );
};

export default CreateReportPage;
