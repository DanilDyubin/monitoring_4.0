import { useDispatch } from 'react-redux';

import { setOpenModal } from '../../redux/slices/projectSlice';
import ProjectCard from '../project-card/ProjectCard';
import Button from '../../ui/button/Button';

import s from './projectList.module.scss';

const ProjectList = ({ currentItems }) => {
  const dispatch = useDispatch();

  const onModalOpen = () => {
    dispatch(setOpenModal(true));
  };

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
        onClick={onModalOpen}
      />
    </div>
  );
};

export default ProjectList;
