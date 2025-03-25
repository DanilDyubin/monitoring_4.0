import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useApiService from '../../service/useApiService';
import s from './prhotosList.module.scss';
import PhotoItemHovered from '../photo-item/PhotoItem';

const PhotosList = () => {
  const [photosId, setPhotosId] = useState([]);

  const uploadPhotosId = useSelector((state) => state.project.uploadPhotosId);

  const { getPhotos, deletePhoto, loading } = useApiService();

  useEffect(() => {
    if (!uploadPhotosId) return;
    getPhotos(uploadPhotosId).then((data) => setPhotosId(data));
  }, [uploadPhotosId]);

  const handleDeletePhoto = (id) => {
    deletePhoto(id).then(() =>
      setPhotosId((prev) => prev.filter((item) => item.id !== id))
    );
  };

  if (loading) {
    return <h1>Pipa!</h1>;
  }

  return (
    <div className={s['photos-uploaded']}>
      <div className={s['photos-uploaded__list']}>
        {photosId.length > 0
          ? photosId.map((photo) => (
              <PhotoItemHovered
                key={photo.id}
                id={photo.id}
                onDelete={handleDeletePhoto}
              />
            ))
          : null}
        {/* {loadingImages && skeletonArray.map((_, i) => <ImageSkeleton key={i} />)} */}
      </div>
    </div>
  );
};

export default PhotosList;
