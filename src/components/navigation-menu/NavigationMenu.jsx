import { NavLink } from 'react-router-dom';
import s from './navigationMenu.module.scss';

const NavigationMenu = ({ projectId, uploadId }) => {
  return (
    <div className={s.container}>
      <NavLink
        to={`/project/${projectId}/report/${uploadId}/total`}
        end
        className={({ isActive }) =>
          isActive ? `${s.link} ${s.active}` : s.link
        }
      >
        Общий отчёт
      </NavLink>
      <NavLink
        to={`/project/${projectId}/report/${uploadId}/single`}
        className={({ isActive }) =>
          isActive ? `${s.link} ${s.active}` : s.link
        }
      >
        Отчёт по каждому снимку
      </NavLink>
    </div>
  );
};

export default NavigationMenu;
