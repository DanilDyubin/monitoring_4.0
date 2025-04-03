import { useSelector } from 'react-redux';
import s from './customGroup.module.scss';

// props group приходят из <Timeline groups/>

export const groupRenderer = ({ group }) => {
  const clazz =
    group.fact >= 0
      ? `${s['custom-group__values-fact']}`
      : `${s['custom-group__values-fact']}` + ` ` + `${s.warning}`;
  return (
    <div className={s['custom-group']}>
      <div className={s['custom-group__title']}>{group.title}</div>
      <div className={s['custom-group__values']}>
        <div className={s['custom-group__values-plan']}>{`${group.plan}%`}</div>
        <div className={clazz}>
          {group.fact > 0 ? `+${group.fact}%` : `-${group.fact}%`}
        </div>
        {/* <div className={clazz}>
          {group.progress > 0 ? `+${group.progress}%` : `-${group.progress}%`}
        </div> */}
      </div>
    </div>
  );
};

export const groupRendererWithoutColls = ({ group }) => {
  return (
    <div className={s['custom-group']}>
      <div className={s['custom-group__title']}>{group.title}</div>
      <div className={s['custom-group__values-done']}>{`${Math.round(
        group.done
      )}%`}</div>
    </div>
  );
};

export const groupRendererSinglePage = ({ group }) => {
  return (
    <div className={s['custom-group']}>
      <div className={s.wrapper}>
        <div className={s.color} style={{ background: `${group.color}` }}></div>
        <div className={s['custom-group__title']}>{group.title}</div>
      </div>
      <div className={s['custom-group__values-done']}>{`${Math.round(
        group.done
      )}%`}</div>
    </div>
  );
};

export const groupRendererColored = ({ group }) => {
  return (
    <div className={s['colored-group']}>
      <div className={s.color} style={{ background: `${group.color}` }}></div>
      <div className={s['custom-group__title']}>{group.title}</div>
    </div>
  );
};

export const groupRendererTest = ({ group }) => {
  const factClass =
    group.factPercent >= 0 || !group.factPercent
      ? `${s['custom-group__values-fact']}`
      : `${s['custom-group__values-fact']} ${s.warning}`;

  return (
    <div className={s['custom-group']}>
      <div className={s['custom-group__title']}>{group.title}</div>
      <div className={s['custom-group__values']}>
        <div className={s['custom-group__values-plan']}>
          {group.planPercent || '0'}%
        </div>
        <div className={factClass}>{group.factPercent || '0'}%</div>
      </div>
    </div>
  );
};

const calendarItemsReport = [
  {
    id: 1,
    group: 0,
    title: '23.02 — 22.03',
    start_time: 1740258000000,
    end_time: 1742677199999,
    itemProps: {
      style: {
        background: '#036BFD',
        border: 'none',
        color: '#ffffff',
        fontWeight: '400',
        fontSize: '16px',
      },
    },
  },
  {
    id: 2,
    group: 0,
    title: '24.03 — 25.03',
    start_time: 1742763600000,
    end_time: 1742936399999,
    itemProps: {
      style: {
        background: '#FF8080',
        border: 'none',
        color: '#131313',
        fontWeight: '400',
        fontSize: '16px',
      },
    },
  },
  {
    id: 3,
    group: 1,
    title: '02.03 — 20.03',
    start_time: 1740862800000,
    end_time: 1742504399999,
    itemProps: {
      style: {
        background: '#036BFD',
        border: 'none',
        color: '#ffffff',
        fontWeight: '400',
        fontSize: '16px',
      },
    },
  },
  {
    id: 4,
    group: 1,
    title: '24.03 — 25.03',
    start_time: 1742763600000,
    end_time: 1742936399999,
    itemProps: {
      style: {
        background: '#80E6CB',
        border: 'none',
        color: '#131313',
        fontWeight: '400',
        fontSize: '16px',
      },
    },
  },
];
const mainReport = [
  {
    stage_id: 0,
    percent: 100,
    info: null,
    stage: {
      name: 'Земляные работы',
      calendar_dull: '#FFD9D9',
      calendar_vivid: '#FF8080',
      color: '#FF0000',
    },
  },
  {
    stage_id: 1,
    percent: 100,
    info: null,
    stage: {
      name: 'Шпунтовое ограждение',
      calendar_dull: '#D9F8EF',
      calendar_vivid: '#80E6CB',
      color: '#00CC96',
    },
  },
  {
    stage_id: 2,
    percent: 100,
    info: null,
    stage: {
      name: 'Распорная система',
      calendar_dull: '#D9D9FF',
      calendar_vivid: '#8080FF',
      color: '#0000FF',
    },
  },
  {
    stage_id: 3,
    percent: 87.5,
    info: null,
    stage: {
      name: 'Устройство фундамента',
      calendar_dull: '#FFFFD9',
      calendar_vivid: '#FFFF80',
      color: '#FFFF00',
    },
  },
  {
    stage_id: 4,
    percent: 75,
    info: null,
    stage: {
      name: 'Монолит',
      calendar_dull: '#D9FFFF',
      calendar_vivid: '#80FFFF',
      color: '#00FFFF',
    },
  },
  {
    stage_id: 5,
    percent: 57.46,
    info: null,
    stage: {
      name: 'Кладка',
      calendar_dull: '#FFE8EF',
      calendar_vivid: '#FFB3C9',
      color: '#FF6692',
    },
  },
  {
    stage_id: 6,
    percent: 48.65,
    info: null,
    stage: {
      name: 'Теплоизоляция',
      calendar_dull: '#F1D9FF',
      calendar_vivid: '#D280FF',
      color: '#A500FF',
    },
  },
  {
    stage_id: 7,
    percent: 47.93,
    info: null,
    stage: {
      name: 'Подсистема фасада',
      calendar_dull: '#D9F1FF',
      calendar_vivid: '#80D2FF',
      color: '#00A5FF',
    },
  },
  {
    stage_id: 8,
    percent: 16.57,
    info: null,
    stage: {
      name: 'Облицовка фасада',
      calendar_dull: '#F1FFD9',
      calendar_vivid: '#D2FF80',
      color: '#A5FF00',
    },
  },
  {
    stage_id: 11,
    percent: 64.82,
    info: null,
    stage: {
      name: 'Работы завершены',
      calendar_dull: '#D9FFF1',
      calendar_vivid: '#80FFD2',
      color: '#00FFA5',
    },
  },
  {
    stage_id: 9,
    percent: 34.11,
    info: null,
    stage: {
      name: 'Остекление',
      calendar_dull: '#FFF2DF',
      calendar_vivid: '#FFD394',
      color: '#FFA629',
    },
  },
  {
    stage_id: 10,
    percent: 0,
    info: null,
    stage: {
      name: 'Благоустройство',
      calendar_dull: '#E5F8E4',
      calendar_vivid: '#A9E7A4',
      color: '#52CE49',
    },
  },
];
