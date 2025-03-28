import { useDispatch, useSelector } from 'react-redux';
import { transFormItem } from '../../service/transformResponseData';
import { setCalendarItemsReport } from '../../redux/slices/reportSlice';
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
  const transformedItems = useSelector((state) => state.report.itemsReport);
  console.log(`CalendarItems - ${JSON.stringify(calendarItems)}`);

  const getCalendarAndDispatch = (projectId) => {
    getCalendar(projectId).then((data) =>
      dispatch(setCalendarItemsReport(transFormItem(data)))
    );
  };

  console.log(transformedItems && JSON.stringify(transformedItems));

  return (
    <div className={s.container}>
      <Subtitle subtitle="Основная информация" />
      <div className={s.form}>
        <ProjectForm formData={formData} />
      </div>
      <Subtitle subtitle="График строительных работ" />
      <TimeLine />
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
