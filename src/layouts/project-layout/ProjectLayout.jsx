import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import {
  setFormData,
  setPhotosDatesFromDB,
  setProjectId,
} from '../../redux/slices/projectSlice';
import useApiService from '../../service/useApiService';
import NavigationLink from '../../components/navigation-link/NavigationLink';

import s from './projectLayout.module.scss';
import PageSkeleton from '../../ui/skeletons/page-skeleton/PageSkeleton';

const ProjectLayout = () => {
  const { projectId } = useParams();

  const { getProject, getPhotosDatesFromDB } = useApiService();

  const dispatch = useDispatch();

  const isPredictLoading = useSelector(
    (state) => state.project.isPredictLoading
  );

  const getPhotosDatesFromDBAndDispatch = (uin) => {
    getPhotosDatesFromDB(uin).then((data) => {
      dispatch(setPhotosDatesFromDB(data));
    });
  };

  useEffect(() => {
    getProject(projectId).then((data) => dispatch(setFormData(data)));
    getPhotosDatesFromDB('GJ8427-10-0002-001').then((data) => {
      dispatch(setPhotosDatesFromDB(data));
    });
    dispatch(setProjectId(projectId));
  }, [projectId]);

  if (isPredictLoading) {
    return <PageSkeleton />;
  }

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
