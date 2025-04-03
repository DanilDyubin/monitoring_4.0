import s from './button.module.scss';

export const Button = ({
  title,
  onClick,
  type = 'button',
  variant = 'secondary',
  size = 'small',
  disabled = false,
  form,
}) => {
  const buttonClass = disabled
    ? `${s.btn} ${s[variant]} ${s[size]} ${s.disabled}`
    : `${s.btn} ${s[variant]} ${s[size]}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      form={form}
    >
      {title}
    </button>
  );
};

export default Button;
