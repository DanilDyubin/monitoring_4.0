import { IoCloseSharp } from 'react-icons/io5';

import s from './photoItem.module.scss';

export const PhotoItemHovered = ({ id, url, onDelete }) => {
  const imageUrl = `https://msi.construction-monitoring.contextmachine.cloud/get_one_photo?image_id=${id}`;

  return (
    <div className={s['photo-item-hovered']}>
      <img src={imageUrl} alt="photo" />
      <div className={s['photo-item-hovered__overlay']}></div>
      <IoCloseSharp
        className={s['photo-item-hovered__icon']}
        onClick={() => onDelete(id)}
      />
    </div>
  );
};

export const PhotoItem = ({ id }) => {
  const imageUrl = `https://msi.construction-monitoring.contextmachine.cloud/get_one_photo?image_id=${id}`;
  return (
    <div className={s['photo-item']}>
      <img src={imageUrl} alt="photo" />
    </div>
  );
};
