import moment from 'moment';

const stageColors = [
  {
    id: 0,
    color: '#FF8080',
  },
  {
    id: 1,
    color: '#80E6CB',
  },
  {
    id: 2,
    color: '#8080FF',
  },
  {
    id: 3,
    color: '#FFFF80',
  },
  {
    id: 4,
    color: '#80FFFF',
  },
  {
    id: 5,
    color: '#FFB3C9',
  },
  {
    id: 6,
    color: '#D280FF',
  },
  {
    id: 7,
    color: '#80D2FF',
  },
  {
    id: 8,
    color: '#D2FF80',
  },
  {
    id: 9,
    color: '#FFD394',
  },
  {
    id: 10,
    color: '#A9E7A4',
  },
];

export const transFormGroup = (group) => {
  return {
    id: group.id,
    title: group.name,
    plan: Math.round(group.planValue),
    fact: Math.round(group.factValue),
    progress: Math.round(group.progress_diff),
    height: 40,
    // color: group.color,
    color: group.calendar_vivid,
    color_light: group.calendar_dull,
  };
};

// export const transFormItem = (group) => {
//   return {
//     id: group.id,
//     group: group.stage_id, // обязательно для привязки item к group
//     color: group.calendar_vivid,
//     plan: group.planValue,
//     title:
//       group.plannedStart && group.plannedEnd
//         ? `${moment(group.plannedStart).format('DD.MM')} — ${moment(
//             group.plannedEnd
//           ).format('DD.MM')}`
//         : null,
//     start_time: group.plannedStart
//       ? moment(group.plannedStart).valueOf()
//       : null,
//     end_time: group.plannedEnd
//       ? moment(group.plannedEnd).endOf('day').valueOf()
//       : null, // endOf('day') устанавливаем время в конце дня на 23:59 чтобы выбранный день в item был подностью закрашен
//     itemProps: {
//       // className: 'bordernone',
//       style: {
//         background: group.calendar_dull,
//         border: 'none',
//         color: '#131313',
//         fontWeight: '400',
//         fontSize: '16px',
//       },
//     },
//   };
// };

export const transFormItem = (data) => {
  return data.flatMap((item, index) => {
    const planItem = {
      id: (index + 1) * 2 - 1,
      group: item.stage_id, // обязательно для привязки item к group
      // color: '#036BFD',
      title:
        item.plan_start && item.plan_end
          ? `${moment(item.plan_start).format('DD.MM')} — ${moment(
              item.plan_end
            ).format('DD.MM')}`
          : null,
      start_time: item.plan_start ? moment(item.plan_start).valueOf() : null,
      end_time: item.plan_end
        ? moment(item.plan_end).endOf('day').valueOf()
        : null, // endOf('day') устанавливаем время в конце дня на 23:59 чтобы выбранный день в item был подностью закрашен
      itemProps: {
        // className: 'bordernone',
        style: {
          background: '#036BFD',
          border: 'none',
          color: '#ffffff',
          fontWeight: '400',
          fontSize: '16px',
        },
      },
    };

    const factItem = {
      id: (index + 1) * 2,
      group: item.stage_id,
      // color: '#ffffff', // Если нужна какая-то логика цвета – добавьте
      title:
        item.fact_start && item.fact_end
          ? `${moment(item.fact_start).format('DD.MM')} — ${moment(
              item.fact_end
            ).format('DD.MM')}`
          : null,
      start_time: item.fact_start ? moment(item.fact_start).valueOf() : null,
      end_time: item.fact_end
        ? moment(item.fact_end).endOf('day').valueOf()
        : null,
      itemProps: {
        style: {
          background: stageColors[item.stage_id].color,
          border: 'none',
          color: '#131313',
          fontWeight: '400',
          fontSize: '16px',
        },
      },
    };

    return [planItem, factItem];
  });
};

export const transformByImageArray = (byImageArr) => {
  return byImageArr.map((byImgObj) => {
    // создаем копию массива и сортируем его, чтобы вывести stages по id
    const sortedStages = [...(byImgObj.report?.stages || [])].sort(
      (a, b) => a.id - b.id
    );
    // Преобразуем каждую stage
    const transformedStages = sortedStages.map((stage) => ({
      id: stage.id,
      title: stage.name,
      done: Math.round(stage.factValue),
      color: stage.calendar_vivid,
      height: 40,
      progress: true, // поменять
    }));

    return {
      image: byImgObj.image,
      predicted_image: byImgObj.predicted_image,
      stages: transformedStages,
    };
  });
};

// [
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 0,
//     plan_start: '2025-02-23',
//     plan_end: '2025-03-29',
//     fact_start: null,
//     fact_end: null,
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 1,
//     plan_start: '2025-03-04',
//     plan_end: '2025-03-21',
//     fact_start: null,
//     fact_end: null,
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 2,
//     plan_start: '2025-02-23',
//     plan_end: '2025-03-07',
//     fact_start: null,
//     fact_end: null,
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 3,
//     plan_start: '2025-04-03',
//     plan_end: '2025-04-06',
//     fact_start: null,
//     fact_end: null,
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 4,
//     plan_start: '2025-03-22',
//     plan_end: '2025-03-28',
//     fact_start: null,
//     fact_end: null,
//   },
//   {
//     project_id: 'bab6235e-6f2f-4456-b562-5ae94132a75a',
//     stage_id: 5,
//     plan_start: '2025-04-10',
//     plan_end: '2025-04-18',
//     fact_start: null,
//     fact_end: null,
//   },
// ];
