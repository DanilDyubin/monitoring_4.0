import { NavLink } from 'react-router-dom';
import s from './navigationLink.module.scss';

const NavigationLink = ({ to, end, label }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive ? `${s.link} ${s.active}` : s.link
      }
    >
      {label}
    </NavLink>
  );
};

export default NavigationLink;
