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

// export const transFormGroup = (group) => {
//   return {
//     id: group.id,
//     title: group.name,
//     plan: Math.round(group.planValue),
//     fact: Math.round(group.factValue),
//     progress: Math.round(group.progress_diff),
//     height: 40,
//     // color: group.color,
//     color: group.calendar_vivid,
//     color_light: group.calendar_dull,
//   };
// };

export const transFormGroup = (mainReport) => {
  const mainReportSorted = [...(mainReport || [])]
    .sort((a, b) => a.stage_id - b.stage_id)
    .slice(0, -1);

  const groups = mainReportSorted.map((group) => {
    // Высчитываем % plan
    const calendars = group.stage.calendars;
    let donePercent;

    if (!calendars || calendars.length === 0) {
      return {
        id: group.stage_id,
        title: group.stage.name,
        height: 40,
        planPercent: 0,
        factPercent: Math.round(group.percent),
      };
    } else {
      // 1 получаем время планового начала
      const planStart = new Date(calendars[0].plan_start).getTime();

      // 2. Получаем время планового окончания
      const planEnd = new Date(calendars[0].plan_end).getTime();

      // 3. Получаем время “сегодня, полночь” (локальный часовой пояс)
      const currentDateObj = new Date();
      currentDateObj.setHours(0, 0, 0, 0);
      const currentDate = currentDateObj.getTime();

      if (currentDate <= planStart) {
        donePercent = 0;
      } else if (currentDate >= planEnd) {
        donePercent = 100;
      } else {
        const totalTime = planEnd - planStart;
        const overTime = currentDate - planStart;
        donePercent = (overTime / totalTime) * 100;
      }
    }

    return {
      id: group.stage_id,
      title: group.stage.name,
      height: 40,
      planPercent: Math.round(donePercent),
      factPercent: Math.round(group.percent),
    };
  });

  return groups;
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
  return data.map((item) => {
    return {
      id: item.stage_id,
      group: item.stage_id, // обязательно для привязки item к group
      group_title: item.stage.name,
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
          background: item.stage.calendar_vivid,
          // background: 'green',
          border: 'none',
          color: '#131313',
          fontWeight: '400',
          fontSize: '16px',
        },
      },
    };
  });
};

export const transFormItemReport = (data) => {
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
