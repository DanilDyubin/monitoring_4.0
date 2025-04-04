import s from './addImageButton.module.scss';

export const AddImageButton = ({
  onClick,
  type = 'button',
  size = '',
  disabled = false,
  loading = false,
}) => {
  const buttonClass = loading
    ? `${s.btn} ${s[size]} ${s.disabled}`
    : `${s.btn} ${s[size]}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        style={{
          stroke: loading ? '#858585' : '#036BFD',
        }}
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M28 0V56" stroke-width="4" stroke-linejoin="round" />
        <path d="M0 28H56" stroke-width="4" stroke-linejoin="round" />
      </svg>
    </button>
  );
};

export default AddImageButton;
