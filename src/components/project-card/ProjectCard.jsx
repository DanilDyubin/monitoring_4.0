import { Link } from 'react-router-dom';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { CiCircleInfo } from 'react-icons/ci';

import s from './projectCard.module.scss';

const ProjectCard = ({ project }) => {
  return (
    <li className={s['projects-list__item']}>
      <Link className={s.card}>
        <div className={s.img}>
          <HiOutlineBuildingOffice2 className={s['img-icon']} />
        </div>
        <div className={s.content}>
          <p className={s.address}>{project.address}</p>
          <div className={s.wrapper}>
            <CiCircleInfo className={s['info-icon']} />
            <span className={s.uin}>{project.uin}</span>
            <span className={s.floors}>{project.floors}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProjectCard;
