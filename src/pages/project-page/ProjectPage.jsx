import { useSelector } from 'react-redux';
import ProjectForm from '../../components/project-form/ProjectForm';
import Subtitle from '../../components/subtitle/Subtitle';
import TimeLine from '../../components/time-line/TimeLine';
import s from './projectPage.module.scss';

const ProjectPage = () => {
  const formData = useSelector((state) => state.project.formData);
  console.log(`Formdata - ${JSON.stringify(formData)}`);

  return (
    <div className={s.container}>
      <Subtitle subtitle="Основная информация" />
      <div className={s.form}>
        <ProjectForm formData={formData} />
      </div>
      <Subtitle subtitle="График строительных работ" />
      <TimeLine />
    </div>
  );
};

export default ProjectPage;
