import ProjectCard from '../project-card/ProjectCard';
import Button from '../../ui/button/Button';

import s from './projectList.module.scss';

const ProjectList = ({ currentItems }) => {
  return (
    <div className={s.container}>
      <ul className={s.list}>
        {currentItems &&
          currentItems.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
      </ul>
      <Button
        title="Создать новый проект"
        size="big"
        variant="secondaryHovered"
      />
    </div>
  );
};

export default ProjectList;
