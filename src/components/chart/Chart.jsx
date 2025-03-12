import { useState } from 'react';
import BarChart from './bar-chart/BarChart';
import SideBar from './side-bar/SideBar';
import s from './chart.module.scss';

const data = [
  {
    id: '0',
    title: 'Земляные работы',
    plan: 100,
    fact: 87,
    deviation: 0,
    height: 40,
    progress: true,
    color: '#FF8080',
    color_light: '#FFD9D9',
  },
  {
    id: 1,
    title: 'Шпунтовое ограждение',
    plan: 18,
    fact: 18,
    deviation: 0,
    height: 40,
    progress: false,
    color: '#80E6CB',
    color_light: '#D9F8EF',
  },
  {
    id: 2,
    title: 'Распорная система',
    plan: 45,
    fact: 54,
    deviation: 0,
    height: 40,
    progress: true,
    color: '#8080FF',
    color_light: '#D9D9FF',
  },
  {
    id: 3,
    title: 'Устройство фундамента',
    plan: 87,
    fact: 64,
    deviation: 0,
    height: 40,
    progress: true,
    color: '#FFFF80',
    color_light: '#FFFFD9',
  },
  {
    id: 4,
    title: 'Монолит',
    plan: 0,
    fact: 87,
    deviation: 0,
    height: 40,
    progress: true,
    color: '#80FFFF',
    color_light: '#D9FFFF',
  },
  {
    id: 5,
    title: 'Кладка',
    plan: 0,
    fact: 0,
    deviation: 0,
    height: 40,
    progress: false,
    color: '#FFB3C9',
    color_light: '#FFE8EF',
  },
  {
    id: 6,
    title: 'Тепло\u00ADизоляция',
    plan: 0,
    fact: 0,
    deviation: 0,
    height: 40,
    progress: true,
    color: '#D280FF',
    color_light: '#F1D9FF',
  },
  {
    id: 7,
    title: 'Подсистема фасада',
    plan: 100,
    fact: 100,
    deviation: 0,
    height: 40,
    progress: true,
    color: '#80D2FF',
    color_light: '#D9F1FF',
  },
  {
    id: 8,
    title: 'Облицовка фасада',
    plan: 100,
    fact: 91,
    deviation: 0,
    height: 40,
    progress: true,
    color: '#D2FF80',
    color_light: '#F1FFD9',
  },
  {
    id: 9,
    title: 'Остекление',
    plan: 0,
    fact: 0,
    deviation: 0,
    height: 40,
    progress: true,
    color: '#FFD394',
    color_light: '#FFF2DF',
  },
  {
    id: 10,
    title: 'Благо\u00ADустройство',
    plan: 0,
    fact: 0,
    deviation: 0,
    height: 40,
    progress: true,
    color: '#A9E7A4',
    color_light: '#E5F8E4',
  },
];

const Chart = () => {
  const [stageId, setStageId] = useState('');

  return (
    <div className={s.chart}>
      <SideBar stages={data} onSetStageId={setStageId} />
      <BarChart stages={data} stageId={stageId} />
    </div>
  );
};

export default Chart;
