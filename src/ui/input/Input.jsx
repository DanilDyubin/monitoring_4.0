import { VscClose } from 'react-icons/vsc';
import { FiSliders } from 'react-icons/fi';

import s from './input.module.scss';

const Input = ({
  type = 'text',
  size = '',
  placeholder,
  name,
  value,
  onChange,
  onClick,
}) => {
  const inputFieldClass = `${s['input-field']} ${s[size]}`;

  return (
    <div className={inputFieldClass}>
      <input
        className={s.input}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
      <VscClose className={s['icon-close']} onClick={onClick} />
      <FiSliders className={s['icon-sliders']} />
    </div>
  );
};

export default Input;
