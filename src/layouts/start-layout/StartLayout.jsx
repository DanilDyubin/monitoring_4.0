import { Outlet } from 'react-router-dom';

import NavigationLink from '../../components/navigation-link/NavigationLink';

import s from './startLayout.module.scss';

const StartLayout = () => {
  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <NavigationLink label="База" to={`/base`} />
        <NavigationLink label="Пользовательские" to={`/custom`} />
      </div>
      <Outlet />
    </div>
  );
};

export default StartLayout;
