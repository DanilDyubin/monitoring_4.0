import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transFormItem } from '../../service/transformResponseData';
import { setScheduleItemsProject } from '../../redux/slices/projectSlice';
import { addRequestItems } from '../../redux/slices/scheduleSlice';
import ProjectForm from '../../components/project-form/ProjectForm';
import Subtitle from '../../components/subtitle/Subtitle';
import TimeLine from '../../components/time-line/TimeLine';
import s from './projectPage.module.scss';
import TimeLineTotalPageStyled from '../../components/time-line/time-line-total-page/TimeLineTotalPageStyled';
import useApiService from '../../service/useApiService';

const ProjectPage = () => {
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.project.formData);
  const projectId = useSelector((state) => state.project.projectId);
  const uploadId = useSelector((state) => state.project.uploadPhotosId);
  console.log(`Formdata - ${JSON.stringify(formData)}`);
  const { createCalendar, getCalendar, createPredict, getMainReport } =
    useApiService();
  const calendarItems = useSelector((state) => state.schedule.items);
  const transformedItems = useSelector(
    (state) => state.project.scheduleItemsProject
  );
  console.log(`CalendarItems - ${JSON.stringify(calendarItems)}`);
  console.log(`transformedItems - ${JSON.stringify(transformedItems)}`);

  const getCalendarAndDispatch = (projectId) => {
    getCalendar(projectId).then((data) =>
      console.log(`getCalendar - ${JSON.stringify(data)}`)
    );
    getCalendar(projectId).then((data) =>
      dispatch(addRequestItems(transFormItem(data)))
    );
  };

  useEffect(() => {
    getCalendarAndDispatch(projectId);
  }, [projectId]);

  return (
    <div className={s.container}>
      <Subtitle subtitle="Основная информация" />
      <div className={s.form}>
        <ProjectForm formData={formData} />
      </div>
      <Subtitle subtitle="График строительных работ" />
      <TimeLine items={calendarItems} />
      <button
        style={{ margin: '40px 40px' }}
        onClick={() => createCalendar(projectId)}
      >
        Создать календарь
      </button>
      <button
        style={{ margin: '40px 40px' }}
        onClick={() => getCalendarAndDispatch(projectId)}
      >
        Получить календарь
      </button>
      <button
        style={{ margin: '40px 40px' }}
        onClick={() => createPredict(uploadId)}
      >
        Создать предикт
      </button>
      <button
        style={{ margin: '40px 40px' }}
        onClick={() => getMainReport(uploadId)}
      >
        Получить mainReport
      </button>
      <TimeLineTotalPageStyled />
    </div>
  );
};

export default ProjectPage;
