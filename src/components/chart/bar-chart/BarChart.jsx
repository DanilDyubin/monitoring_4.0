// import s from './barChart.module.scss';

// const BarChartItem = ({ stage, stageId }) => {
//   // const barClass =
//   //   stageId && stageId !== stage.id ? `${s.bar} + ${s.opacity}` : `${s.bar}`;

//   const barClass =
//     stageId && stageId === stage.id ? `${s.bar} + ${s.hovered}` : `${s.bar}`;

//   return (
//     <li className={s.item}>
//       <div className={barClass}>
//         <div
//           className={s['bar__plan']}
//           style={{
//             height: `${stage.plan}%`,
//           }}
//         >
//           {stage.plan}
//         </div>
//         <div
//           className={s['bar__fact']}
//           style={{
//             height: `${stage.fact}%`,
//             backgroundColor: `${stage.color}`,
//           }}
//         >
//           {stage.fact}
//         </div>
//       </div>
//       <div className={s['item-title']}>{stage.title}</div>
//     </li>
//   );
// };

// const BarChart = ({ stages, stageId }) => {
//   return (
//     <div className={s['bar-chart']}>
//       <ul className={s.lines}>
//         <li className={s.line}></li>
//         <li className={s.line}></li>
//         <li className={s.line}></li>
//         <li className={s.line}></li>
//         <li className={s.line}></li>
//         <li className={s.line}></li>
//       </ul>
//       <ul className={s.list}>
//         {stages.map((stage, i) => (
//           <BarChartItem stage={stage} key={i} stageId={stageId} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BarChart;

import { useSelector } from 'react-redux';
import useAnimatePercent from '../../../hooks/useAnimatePercent';
import s from './barChart.module.scss';

const BarChartItem = ({ stage, stageId }) => {
  const factPercent = Math.round(stage.percent);
  const animatePercent = useAnimatePercent(factPercent);

  // const barClass =
  //   stageId != null && stageId && stageId !== stage.stage_id
  //     ? `${s.bar} + ${s.opacity}`
  //     : `${s.bar}`;

  const barClass =
    stageId != null && stageId === stage.stage_id
      ? `${s.bar} + ${s.hovered}`
      : `${s.bar}`;

  return (
    <li className={s.item}>
      <div className={barClass}>
        <div
          className={s['bar__fact']}
          style={{
            height: `${animatePercent}%`,
            backgroundColor: `${stage.stage.calendar_vivid}`,
            transition: 'all 0.2s ease',
          }}
        >
          {animatePercent}
        </div>
      </div>
      <div className={s['item-title']}>{stage.stage.name}</div>
    </li>
  );
};

const BarChart = ({ stageId, photosData }) => {
  const currentSlide = useSelector((state) => state.report.currentSlide);

  return (
    <div className={s['bar-chart']}>
      <ul className={s.lines}>
        <li className={s.line}></li>
        <li className={s.line}></li>
        <li className={s.line}></li>
        <li className={s.line}></li>
        <li className={s.line}></li>
        <li className={s.line}></li>
      </ul>
      <ul className={s.list}>
        {photosData?.[currentSlide]?.report?.slice(0, -1).map((stage) => (
          <BarChartItem stage={stage} key={stage.stage_id} stageId={stageId} />
        ))}
      </ul>
    </div>
  );
};

export default BarChart;
