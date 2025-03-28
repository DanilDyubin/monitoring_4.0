import s from './barChart.module.scss';

const BarChartItem = ({ stage, stageId }) => {
  // const barClass =
  //   stageId && stageId !== stage.id ? `${s.bar} + ${s.opacity}` : `${s.bar}`;

  const barClass =
    stageId && stageId === stage.id ? `${s.bar} + ${s.hovered}` : `${s.bar}`;

  return (
    <div className={s.item}>
      <div className={barClass}>
        <div
          className={s['bar__plan']}
          style={{
            height: `${stage.plan}%`,
          }}
        >
          {stage.plan}
        </div>
        <div
          className={s['bar__fact']}
          style={{
            height: `${stage.fact}%`,
            backgroundColor: `${stage.color}`,
          }}
        >
          {stage.fact}
        </div>
      </div>
      <div className={s['item-title']}>{stage.title}</div>
    </div>
  );
};

const BarChart = ({ stages, stageId }) => {
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
        {stages.map((stage, i) => (
          <BarChartItem stage={stage} key={i} stageId={stageId} />
        ))}
      </ul>
    </div>
  );
};

export default BarChart;
