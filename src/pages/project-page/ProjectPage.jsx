import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  transFormItem,
  transFormItemReport,
} from '../../service/transformResponseData';
import {
  setScheduleItemsProject,
  setPhotosDatesFromDB,
} from '../../redux/slices/projectSlice';
import { addFactToGroups } from '../../redux/slices/scheduleSlice';
import { addRequestItems } from '../../redux/slices/scheduleSlice';
import ProjectForm from '../../components/project-form/ProjectForm';
import Subtitle from '../../components/subtitle/Subtitle';
import TimeLine from '../../components/time-line/TimeLine';
import s from './projectPage.module.scss';
import TimeLineTotalPageStyled from '../../components/time-line/time-line-total-page/TimeLineTotalPageStyled';
import useApiService from '../../service/useApiService';
import { setCalendarItemsReport } from '../../redux/slices/reportSlice';

const ProjectPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const formData = useSelector((state) => state.project.formData);
  const projectId = useSelector((state) => state.project.projectId);
  // const groups = useSelector((state) => state.schedule.groups);

  const uploadId = useSelector((state) => state.project.uploadPhotosId);

  const { createCalendar, getCalendar, createPredict, getMainReport } =
    useApiService();
  const calendarItems = useSelector((state) => state.schedule.items);
  const transformedItems = useSelector(
    (state) => state.project.scheduleItemsProject
  );
  console.log(`CalendarItems - ${JSON.stringify(calendarItems)}`);
  console.log(`transformedItems - ${JSON.stringify(transformedItems)}`);

  const getCalendarAndDispatch = (projectId) => {
    getCalendar(projectId).then((data) => {
      dispatch(addRequestItems(transFormItem(data)));
      dispatch(setCalendarItemsReport(transFormItemReport(data)));
      dispatch(addFactToGroups(data));
    });
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
      <div className={s.wrapper}>
        <Subtitle subtitle="График строительных работ" />
        {isEditing ? (
          <button className={s.btn} onClick={() => setIsEditing(false)}>
            Сохранить
          </button>
        ) : (
          <button className={s.btn} onClick={() => setIsEditing(true)}>
            Редактировать
          </button>
        )}
      </div>
      {isEditing ? (
        <TimeLine items={calendarItems} />
      ) : (
        <TimeLineTotalPageStyled />
      )}

      {/* <button
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
      </button> */}
    </div>
  );
};

export default ProjectPage;
