import ProjectCard from '../project-card/ProjectCard';

import s from './projectList.module.scss';

const ProjectList = ({ allProjects }) => {
  return (
    <div className={s.container}>
      <ul className={s.list}>
        {allProjects &&
          allProjects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
      </ul>
    </div>
  );
};

export default ProjectList;
