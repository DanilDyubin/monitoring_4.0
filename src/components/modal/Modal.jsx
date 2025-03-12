import { useEffect } from 'react';

import s from './modal.module.scss';

const Modal = ({ active, onClose, children }) => {
  // убираем скролл body
  // useEffect(() => {
  //   document.body.style.overflow = active ? 'hidden' : '';
  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, [active]);

  return (
    <div
      className={active ? s.modal + ` ` + s.active : s.modal}
      onClick={onClose}
    >
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
