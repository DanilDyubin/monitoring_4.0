import ProjectForm from '../../components/project-form/ProjectForm';
import Subtitle from '../../components/subtitle/Subtitle';
import TimeLine from '../../components/time-line/TimeLine';
import s from './projectPage.module.scss';

const ProjectPage = () => {
  return (
    <div className={s.container}>
      <Subtitle subtitle="Основная информация" />
      <div className={s.form}>
        <ProjectForm />
      </div>
      <Subtitle subtitle="График строительных работ" />
      <TimeLine />
    </div>
  );
};

export default ProjectPage;
