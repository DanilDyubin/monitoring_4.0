// import s from './sideBar.module.scss';

// const SidebarItem = ({ stage, handleMouseEnter, handleMouseLeave }) => {
//   const clazz =
//     stage.fact >= stage.plan
//       ? `${s['item__values-fact']}`
//       : `${s['item__values-fact']} ${s.warning}`; // ` + ` ` + `

//   return (
//     <li
//       className={s.item}
//       onMouseEnter={() => handleMouseEnter(stage.id)}
//       onMouseLeave={() => handleMouseLeave()}
//     >
//       <div className={s['item__title']}>{stage.title}</div>
//       <div className={s['item__values']}>
//         <div className={s['item__values-plan']}>{`${stage.plan}%`}</div>
//         <div className={clazz}>{`${stage.fact}%`}</div>
//       </div>
//     </li>
//   );
// };

// const SideBar = ({ stages, onSetStageId}) => {
//   const handleMouseEnter = (id) => {
//     onSetStageId(id);
//   };

//   const handleMouseLeave = () => {
//     onSetStageId('');
//   };

//   return (
//     <div className={s.sidebar}>
//       <div className={s.header}>
//         <span>Этапы</span>
//         <div className={s['header__right']}>
//           <span className={s['header__plan']}>План</span>
//           <span className={s['header__fact']}>Факт</span>
//         </div>
//       </div>
//       <ul className={s.list}>
//         {stages.map((stage, i) => (
//           <SidebarItem
//             stage={stage}
//             key={i}
//             handleMouseEnter={handleMouseEnter}
//             handleMouseLeave={handleMouseLeave}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SideBar;

import { useSelector } from 'react-redux';
import s from './sideBar.module.scss';

const SidebarItem = ({ stage, handleMouseEnter, handleMouseLeave }) => {
  const factPercent = Math.round(stage.percent);

  const clazz =
    factPercent >= 0 ? `${s['item__fact']}` : `${s['item__fact']} ${s.warning}`; // ` + ` ` + `

  return (
    <li
      className={s.item}
      onMouseEnter={() => console.log(handleMouseEnter(stage.stage_id))}
      onMouseLeave={() => handleMouseLeave()}
    >
      <span className={s['item__title']}>{stage.stage.name}</span>
      <span className={clazz}>{`${factPercent}%`}</span>
    </li>
  );
};

const SideBar = ({ photosData, onSetStageId }) => {
  const currentSlide = useSelector((state) => state.report.currentSlide);

  const handleMouseEnter = (id) => {
    onSetStageId(id);
  };

  const handleMouseLeave = () => {
    onSetStageId('');
  };

  return (
    <div className={s.sidebar}>
      <div className={s.header}>
        <span>Этапы</span>
        <span className={s['header__fact']}>Факт</span>
      </div>
      <ul className={s.list}>
        {photosData?.[currentSlide]?.report?.slice(0, -1).map((stage, i) => (
          <SidebarItem
            stage={stage}
            key={i}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
