import { BsArrowsFullscreen } from 'react-icons/bs';
import s from './openSliderBtn.module.scss';

const OpenSliderBtn = ({ onClick }) => {
  return (
    <button className={s.btn} onClick={onClick}>
      <BsArrowsFullscreen /> <span>Во весь экран</span>
    </button>
  );
};

export default OpenSliderBtn;
