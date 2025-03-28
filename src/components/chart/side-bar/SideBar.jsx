import s from './sideBar.module.scss';

const SidebarItem = ({ stage, handleMouseEnter, handleMouseLeave }) => {
  const clazz =
    stage.fact >= stage.plan
      ? `${s['item__values-fact']}`
      : `${s['item__values-fact']} ${s.warning}`; // ` + ` ` + `

  return (
    <li
      className={s.item}
      onMouseEnter={() => handleMouseEnter(stage.id)}
      onMouseLeave={() => handleMouseLeave()}
    >
      <div className={s['item__title']}>{stage.title}</div>
      <div className={s['item__values']}>
        <div className={s['item__values-plan']}>{`${stage.plan}%`}</div>
        <div className={clazz}>{`${stage.fact}%`}</div>
      </div>
    </li>
  );
};

const SideBar = ({ stages, onSetStageId }) => {
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
        <div className={s['header__right']}>
          <span className={s['header__plan']}>План</span>
          <span className={s['header__fact']}>Факт</span>
        </div>
      </div>
      <ul className={s.list}>
        {stages.map((stage, i) => (
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

// import s from './sideBar.module.scss';

// const SidebarItem = ({ stageObj, handleMouseEnter, handleMouseLeave }) => {
//   const { stage_id, stage } = stageObj;
//   const clazz =
//     stageObj.percent >= stageObj.plan
//       ? `${s['item__values-fact']}`
//       : `${s['item__values-fact']} ${s.warning}`; // ` + ` ` + `

//   return (
//     <li
//       className={s.item}
//       onMouseEnter={() => handleMouseEnter(stage_id)}
//       onMouseLeave={() => handleMouseLeave()}
//     >
//       <div className={s['item__title']}>{stage.title}</div>
//       <div className={s['item__values']}>
//         <div className={s['item__values-plan']}>{`${stage.plan}%`}</div>
//         <div className={clazz}>{`${stage.percent}%`}</div>
//       </div>
//     </li>
//   );
// };

// const SideBar = ({ stages, onSetStageId }) => {
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
//         {stages[0].report.map((stageObj, i) => (
//           <SidebarItem
//             stage={stageObj}
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
