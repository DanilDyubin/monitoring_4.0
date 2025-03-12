import s from './inputForm.module.scss';

export const InputForm = ({
  type,
  variant = '',
  placeholder,
  name,
  value,
  label,
  onChange,
  readOnly = false,
}) => {
  const inputClass = `${s.input} ${s[variant]}`;
  return (
    <div className={s['input-field']}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      <input
        type={type}
        className={inputClass}
        placeholder={placeholder}
        required
        readOnly={readOnly}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const TextareaForm = ({
  type,
  placeholder,
  name,
  value,
  label,
  onChange,
  rows,
}) => {
  return (
    <div className={s['input-field']}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      <textarea
        type={type}
        className={s.textarea}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
