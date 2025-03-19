import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { setFormData } from '../../redux/slices/projectSlice';
import useApiService from '../../service/ApiService';
import NavigationLink from '../../components/navigation-link/NavigationLink';

import s from './projectLayout.module.scss';

const ProjectLayout = () => {
  const { id } = useParams();

  const { getProject } = useApiService();

  const dispatch = useDispatch();

  useEffect(() => {
    getProject(id).then((data) => dispatch(setFormData(data)));
  }, [id, getProject]);

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
