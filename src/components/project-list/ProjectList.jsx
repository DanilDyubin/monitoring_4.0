import ProjectCard from '../project-card/ProjectCard';

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
    </div>
  );
};

export default ProjectList;
