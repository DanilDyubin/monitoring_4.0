import s from './informationItem.module.scss';

const InformationItem = ({ value, label }) => {
  // const inputClass = `${s.input} ${s[variant]}`;
  return (
    <div className={s['item-container']}>
      <span className={s.label}>{label}</span>
      <div className={s.item}>{value}</div>
    </div>
  );
};

export default InformationItem;
