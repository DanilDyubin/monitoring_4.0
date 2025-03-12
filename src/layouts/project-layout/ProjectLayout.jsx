import { Outlet } from 'react-router-dom';

import NavigationLink from '../../components/navigation-link/NavigationLink';

import s from './projectLayout.module.scss';

const id = '1626shbhs17313';

const ProjectLayout = () => {
  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <div className={s.wrapper}>
          <NavigationLink label="Проект" to={`/project/${id}/overview`} />
          <NavigationLink
            label="Создать новый отчет"
            to={`/project/${id}/create-report`}
          />
        </div>
        <NavigationLink label="Архив" to={`/project/${id}/archive`} />
      </div>
      <Outlet />
    </div>
  );
};

export default ProjectLayout;
