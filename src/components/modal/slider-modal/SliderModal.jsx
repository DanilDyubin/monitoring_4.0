import { useEffect } from 'react';

import s from './sliderModal.module.scss';

const SliderModal = ({ active, onClose, children }) => {
  // убираем скролл body
  //   useEffect(() => {
  //     document.body.style.overflow = active ? 'hidden' : '';
  //     return () => {
  //       document.body.style.overflow = '';
  //     };
  //   }, [active]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (active) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onClose]);

  return (
    <div className={active ? s.modal + ` ` + s.active : s.modal}>
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default SliderModal;
