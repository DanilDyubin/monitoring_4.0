import { useEffect } from 'react';

import s from './modal.module.scss';

const Modal = ({ active, setActive, children }) => {
  // буираем скролл body
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <div
      className={active ? s.modal + ` ` + s.active : s.modal}
      onClick={() => setActive(false)}
    >
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
