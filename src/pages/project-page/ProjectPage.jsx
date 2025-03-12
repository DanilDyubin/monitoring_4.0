import ProjectForm from '../../components/project-form/ProjectForm';
import Subtitle from '../../components/subtitle/Subtitle';
import s from './projectPage.module.scss';

const ProjectPage = () => {
  return (
    <div className={s.container}>
      <Subtitle subtitle="Основная информация" />
      <div className={s.form}>
        <ProjectForm />
      </div>
      <Subtitle subtitle="График строительных работ" />
    </div>
  );
};

export default ProjectPage;
