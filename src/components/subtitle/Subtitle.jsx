import s from './subtitle.module.scss';

export const Subtitle = ({ subtitle }) => {
  return <h2 className={s.subtitle}>{subtitle}</h2>;
};

export default Subtitle;
