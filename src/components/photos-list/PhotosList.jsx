// import { useState, useEffect, useCallback } from 'react';
// import { useSelector } from 'react-redux';

// import useApiService from '../../service/useApiService';
// import s from './prhotosList.module.scss';
// import PhotoItemHovered from '../photo-item/PhotoItem';
// import Loader from '../../ui/loader/Loader';
// import PhotoPickerSmall from '../photo-picker-small/PhotoPickerSmall';

// const PhotosList = () => {
//   const [photosId, setPhotosId] = useState([]);
//   const [photos, setPhotos] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const uploadPhotosId = useSelector((state) => state.project.uploadPhotosId);

//   const { getPhotos, uploadPhotos, deletePhoto, loading } = useApiService();

//   useEffect(() => {
//     if (!uploadPhotosId) return;
//     getPhotos(uploadPhotosId).then((data) => setPhotosId(data));
//   }, [uploadPhotosId]);

//   useEffect(() => {
//     if (!uploadPhotosId) return;
//     if (!photos.length) return;
//     uploadPhotos(uploadPhotosId, photos);
//     setPhotos([]);
//   }, [photos, uploadPhotosId]);

//   // const fetchPhotos = useCallback(async () => {
//   //   if (!uploadPhotosId) return;
//   //   getPhotos(uploadPhotosId).then((data) => setPhotosId(data));
//   // }, [uploadPhotosId, getPhotos]);

//   // useEffect(() => {
//   //   fetchPhotos();
//   // }, [fetchPhotos]);

//   // const handleUploadPhotos = async (photos) => {
//   //   if (!uploadPhotosId || !photos.length) return;
//   //   try {
//   //     setUploading(true);
//   //     await uploadPhotos(uploadPhotosId, photos);
//   //     await fetchPhotos();
//   //   } catch (error) {
//   //     console.error('Ошибка загрузки фотографий:', error);
//   //   } finally {
//   //     setUploading(false);
//   //   }
//   // };

//   const handleDeletePhoto = (id) => {
//     deletePhoto(id).then(() =>
//       setPhotosId((prev) => prev.filter((item) => item.id !== id))
//     );
//   };

//   if (loading || uploading) {
//     return (
//       <div className={s.loader}>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className={s['photos-uploaded']}>
//       <div className={s['photos-uploaded__list']}>
//         {photosId?.length > 0
//           ? photosId.map((photo) => (
//               <PhotoItemHovered
//                 key={photo.id}
//                 id={photo.id}
//                 onDelete={handleDeletePhoto}
//               />
//             ))
//           : null}
//         {photosId?.length > 0 && <PhotoPickerSmall setPhotos={setPhotos} />}
//         {/* {loadingImages && skeletonArray.map((_, i) => <ImageSkeleton key={i} />)} */}
//       </div>
//     </div>
//   );
// };

// export default PhotosList;

// 2

// import { useState, useEffect, useCallback } from 'react';
// import { useSelector } from 'react-redux';

// import useApiService from '../../service/useApiService';
// import s from './prhotosList.module.scss';
// import PhotoItemHovered from '../photo-item/PhotoItem';
// import Loader from '../../ui/loader/Loader';
// import PhotoPickerSmall from '../photo-picker-small/PhotoPickerSmall';

// const PhotosList = () => {
//   const [photosId, setPhotosId] = useState([]);
//   const [photos, setPhotos] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const uploadPhotosId = useSelector((state) => state.project.uploadPhotosId);

//   const { getPhotos, uploadPhotos, deletePhoto, loading } = useApiService();

//   useEffect(() => {
//     if (!uploadPhotosId) return;
//     getPhotos(uploadPhotosId).then((data) => setPhotosId(data));
//   }, [uploadPhotosId]);

//   useEffect(() => {
//     if (!uploadPhotosId) return;
//     if (!photos.length) return;
//     uploadPhotos(uploadPhotosId, photos);
//     setPhotos([]);
//   }, [photos, uploadPhotosId]);

//   // const fetchPhotos = useCallback(async () => {
//   //   if (!uploadPhotosId) return;
//   //   getPhotos(uploadPhotosId).then((data) => setPhotosId(data));
//   // }, [uploadPhotosId, getPhotos]);

//   // useEffect(() => {
//   //   fetchPhotos();
//   // }, [fetchPhotos]);

//   // const handleUploadPhotos = async (photos) => {
//   //   if (!uploadPhotosId || !photos.length) return;
//   //   try {
//   //     setUploading(true);
//   //     await uploadPhotos(uploadPhotosId, photos);
//   //     await fetchPhotos();
//   //   } catch (error) {
//   //     console.error('Ошибка загрузки фотографий:', error);
//   //   } finally {
//   //     setUploading(false);
//   //   }
//   // };

//   const handleDeletePhoto = (id) => {
//     deletePhoto(id).then(() =>
//       setPhotosId((prev) => prev.filter((item) => item.id !== id))
//     );
//   };

//   if (loading || uploading) {
//     return (
//       <div className={s.loader}>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className={s['photos-uploaded']}>
//       <div className={s['photos-uploaded__list']}>
//         {photosId?.length > 0
//           ? photosId.map((photo) => (
//               <PhotoItemHovered
//                 key={photo.id}
//                 id={photo.id}
//                 onDelete={handleDeletePhoto}
//               />
//             ))
//           : null}
//         {photosId?.length > 0 && <PhotoPickerSmall setPhotos={setPhotos} />}
//         {/* {loadingImages && skeletonArray.map((_, i) => <ImageSkeleton key={i} />)} */}
//       </div>
//     </div>
//   );
// };

// export default PhotosList;

// 3

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import useApiService from '../../service/useApiService';
import s from './prhotosList.module.scss';
import PhotoItemHovered from '../photo-item/PhotoItem';
import Loader from '../../ui/loader/Loader';
import PhotoPickerSmall from '../photo-picker-small/PhotoPickerSmall';

const PhotosList = () => {
  const [photosId, setPhotosId] = useState([]);
  const [uploading, setUploading] = useState(false);

  const uploadPhotosId = useSelector((state) => state.project.uploadPhotosId);
  const { getPhotos, uploadPhotos, deletePhoto, loading } = useApiService();

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
      setUploading(true);
      await uploadPhotos(uploadPhotosId, photos);
      await fetchPhotos();
    } catch (error) {
      console.error('Ошибка загрузки фотографий:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await deletePhoto(id);
      setPhotosId((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка удаления фотографии:', error);
    }
  };

  if (loading || uploading) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={s['photos-uploaded']}>
      <div className={s['photos-uploaded__list']}>
        {photosId?.length > 0 ? (
          photosId.map((photo) => (
            <PhotoItemHovered
              key={photo.id}
              id={photo.id}
              onDelete={handleDeletePhoto}
            />
          ))
        ) : (
          <p>Нет загруженных фотографий</p>
        )}
        {photosId?.length > 0 && (
          <PhotoPickerSmall handleUploadPhotos={handleUploadPhotos} />
        )}
      </div>
    </div>
  );
};

export default PhotosList;
