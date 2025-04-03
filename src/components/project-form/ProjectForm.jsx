// import { InputForm } from '../../ui/input-form/InputForm';

// import s from './projectForm.module.scss';

// const ProjectForm = () => {
//   const value =
//     'КОРПУСА N 6 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N 14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ)';
//   const valueAddress = value.length > 106 ? value.slice(0, 106) + '...' : value;

//   return (
//     <div className={s['create-project-form']}>
//       <form className={s.form}>
//         <div className={s.wrapper}>
//           <InputForm
//             label="Наименование объекта"
//             name="name"
//             readOnly={true}
//             variant="readOnly"
//           />
//           <InputForm
//             label="Этажность"
//             name="floors"
//             readOnly={true}
//             variant="readOnly"
//           />
//         </div>
//         <InputForm
//           label="Адрес"
//           name="address"
//           readOnly={true}
//           value={valueAddress}
//           variant="readOnly"
//         />
//       </form>
//     </div>
//   );
// };

// export default ProjectForm;

import InformationItem from './information-item/InformationItem';
import s from './projectForm.module.scss';

const ProjectForm = ({ formData }) => {
  // const name = 'Наименование объекта';
  // const floors = '10';
  // const address =
  //   'КОРПУСА N 6 В КВАРТАЛЕ N 57 ПО УЛИЦЕ ВАСИЛИСЫ КОЖИНОЙ ВО ВЛАДЕНИИ N 14 РАЙОНА ФИЛЕВСКИЙ ПАРК (ЗАПАДНЫЙ АДМИНИСТРАТИВНЫЙ ОКРУГ)';

  const { UIN, address, floor_count } = formData;
  return (
    <div className={s['object-information']}>
      <div className={s.wrapper}>
        <InformationItem label="Наименование объекта" value={UIN} />
        <InformationItem label="Этажность" value={floor_count} />
      </div>
      <InformationItem label="Адрес" value={address} />
    </div>
  );
};

export default ProjectForm;

const mainReport = [
  {
    percent: 100,
    stage_id: 0,
    stage: {
      name: 'Земляные работы',
      color: '#FF0000',
      calendar_dull: '#FFD9D9',
      calendar_vivid: '#FF8080',
      calendars: [
        {
          fact_end: '2025-04-01',
          fact_start: '2025-03-31',
          info: null,
          percent: 100,
          report_date: '2025-04-01',
          plan_end: '2025-04-25',
          plan_start: '2025-03-31',
        },
      ],
    },
  },
  {
    percent: 100,
    stage_id: 1,
    stage: {
      name: 'Шпунтовое ограждение',
      color: '#00CC96',
      calendar_dull: '#D9F8EF',
      calendar_vivid: '#80E6CB',
      calendars: [
        {
          fact_end: '2025-04-01',
          fact_start: '2025-03-31',
          info: null,
          percent: 100,
          report_date: '2025-04-01',
          plan_end: '2025-04-25',
          plan_start: '2025-04-01',
        },
      ],
    },
  },
  {
    percent: 100,
    stage_id: 2,
    stage: {
      name: 'Распорная система',
      color: '#0000FF',
      calendar_dull: '#D9D9FF',
      calendar_vivid: '#8080FF',
      calendars: [
        {
          fact_end: '2025-04-01',
          fact_start: '2025-03-31',
          info: null,
          percent: 100,
          report_date: '2025-04-01',
          plan_end: '2025-04-19',
          plan_start: '2025-04-02',
        },
      ],
    },
  },
  {
    percent: 90,
    stage_id: 3,
    stage: {
      name: 'Устройство фундамента',
      color: '#FFFF00',
      calendar_dull: '#FFFFD9',
      calendar_vivid: '#FFFF80',
      calendars: [],
    },
  },
  {
    percent: 80,
    stage_id: 4,
    stage: {
      name: 'Монолит',
      color: '#00FFFF',
      calendar_dull: '#D9FFFF',
      calendar_vivid: '#80FFFF',
      calendars: [],
    },
  },
  {
    percent: 62.21,
    stage_id: 5,
    stage: {
      name: 'Кладка',
      color: '#FF6692',
      calendar_dull: '#FFE8EF',
      calendar_vivid: '#FFB3C9',
      calendars: [],
    },
  },
  {
    percent: 38.92,
    stage_id: 6,
    stage: {
      name: 'Теплоизоляция',
      color: '#A500FF',
      calendar_dull: '#F1D9FF',
      calendar_vivid: '#D280FF',
      calendars: [],
    },
  },
  {
    percent: 38.34,
    stage_id: 7,
    stage: {
      name: 'Подсистема фасада',
      color: '#00A5FF',
      calendar_dull: '#D9F1FF',
      calendar_vivid: '#80D2FF',
      calendars: [],
    },
  },
  {
    percent: 13.26,
    stage_id: 8,
    stage: {
      name: 'Облицовка фасада',
      color: '#A5FF00',
      calendar_dull: '#F1FFD9',
      calendar_vivid: '#D2FF80',
      calendars: [],
    },
  },
  {
    percent: 65.14,
    stage_id: 11,
    stage: {
      name: 'Работы завершены',
      color: '#00FFA5',
      calendar_dull: '#D9FFF1',
      calendar_vivid: '#80FFD2',
      calendars: [],
    },
  },
  {
    percent: 27.29,
    stage_id: 9,
    stage: {
      name: 'Остекление',
      color: '#FFA629',
      calendar_dull: '#FFF2DF',
      calendar_vivid: '#FFD394',
      calendars: [],
    },
  },
  {
    percent: 0,
    stage_id: 10,
    stage: {
      name: 'Благоустройство',
      color: '#52CE49',
      calendar_dull: '#E5F8E4',
      calendar_vivid: '#A9E7A4',
      calendars: [
        {
          fact_end: null,
          fact_start: null,
          info: null,
          percent: null,
          report_date: null,
          plan_end: '2025-04-26',
          plan_start: '2025-04-06',
        },
      ],
    },
  },
];
