import { useRef } from 'react';
import AddImageButton from '../../ui/add-image-button/AddImageButton';

import s from './photoPickerSmall.module.scss';

const PhotoPickerSmall = ({ onUpload }) => {
  const filePicker = useRef(null);

  const handleClick = () => {
    filePicker.current.click();
  };

  const handlePhotos = (e) => {
    onUpload(Array.from(e.target.files));
  };

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
      <AddImageButton size="small" onClick={handleClick} />
    </div>
  );
};

export default PhotoPickerSmall;
