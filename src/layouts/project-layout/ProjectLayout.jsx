import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import { setFormData, setProjectId } from '../../redux/slices/projectSlice';
import useApiService from '../../service/useApiService';
import NavigationLink from '../../components/navigation-link/NavigationLink';

import s from './projectLayout.module.scss';

const ProjectLayout = () => {
  const { projectId } = useParams();

  const { getProject } = useApiService();

  const dispatch = useDispatch();

  useEffect(() => {
    getProject(projectId).then((data) => dispatch(setFormData(data)));
    dispatch(setProjectId(projectId));
  }, [projectId, getProject]);

  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <div className={s.wrapper}>
          <NavigationLink
            label="Проект"
            to={`/project/${projectId}/overview`}
          />
          <NavigationLink
            label="Создать новый отчет"
            to={`/project/${projectId}/create-report`}
          />
        </div>
        <NavigationLink label="Архив" to={`/project/${projectId}/archive`} />
      </div>
      <Outlet />
    </div>
  );
};

export default ProjectLayout;
