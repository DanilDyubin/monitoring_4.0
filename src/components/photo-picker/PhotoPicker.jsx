import { useRef } from 'react';
import AddImageButton from '../../ui/add-image-button/AddImageButton';

import s from './photoPicker.module.scss';

const ImagePreview = ({ url, photos }) => {
  return (
    <div className={s['image-preview']}>
      {photos.length > 1 && <span className={s.counter}>+{photos.length}</span>}
      <img className={s.img} src={url} alt="" />
    </div>
  );
};

const PhotoPicker = ({ photos, setPhotos }) => {
  const filePicker = useRef(null);

  const handleClick = () => {
    filePicker.current.click();
  };

  const handlePhotos = (e) => {
    setPhotos({
      files: Array.from(e.target.files),
      url: URL.createObjectURL(e.target.files[0]),
    });

    e.target.value = ''; // Сброс значения input, чтобы повторный выбор того же файла сработал
  };

  const content = photos.url ? (
    <ImagePreview url={photos.url} photos={photos.files} />
  ) : (
    <AddImageButton size="big" onClick={handleClick} />
  );

  return (
    <div>
      <input
        className={s.input}
        type="file"
        multiple
        accept="image/*, .png, .jpg, .jpeg, .gif, .web, .svg"
        name="images"
        onChange={handlePhotos}
        ref={filePicker}
      />
      {content}
    </div>
  );
};

export default PhotoPicker;
