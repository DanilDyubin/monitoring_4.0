import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  imgsIds: [], //'1e3b6309-1fc9-402d-ba67-23822cfcacf1', 'fb5dcafc-e446-4d21-84ca-d09e604ec98f'
  currentDate: null,
  items: [],
  nextItemId: 0,
  groups: [
    {
      id: 0,
      title: 'Земляные работы',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#FF8080',
      color_light: '#FFD9D9',
    },
    {
      id: 1,
      title: 'Шпунтовое ограждение',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#80E6CB',
      color_light: '#D9F8EF',
    },
    {
      id: 2,
      title: 'Распорная система',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#8080FF',
      color_light: '#D9D9FF',
    },
    {
      id: 3,
      title: 'Устройство фундамента',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#FFFF80',
      color_light: '#FFFFD9',
    },
    {
      id: 4,
      title: 'Монолит',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#80FFFF',
      color_light: '#D9FFFF',
    },
    {
      id: 5,
      title: 'Кладка',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#FFB3C9',
      color_light: '#FFE8EF',
    },
    {
      id: 6,
      title: 'Теплоизоляция',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#D280FF',
      color_light: '#F1D9FF',
    },
    {
      id: 7,
      title: 'Подсистема фасада',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#80D2FF',
      color_light: '#D9F1FF',
    },
    {
      id: 8,
      title: 'Облицовка фасада',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#D2FF80',
      color_light: '#F1FFD9',
    },
    {
      id: 9,
      title: 'Остекление',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#FFD394',
      color_light: '#FFF2DF',
    },
    {
      id: 10,
      title: 'Благоустройство',
      planValue: 0,
      factValue: 0,
      height: 40,
      color: '#A9E7A4',
      color_light: '#E5F8E4',
    },
    // {
    //   id: 11,
    //   title: 'Работы завершены',
    //   done: 0,
    //   deviation: 0,
    //   height: 40,
    //   progress: true,
    //   color: '#B2FFE4',
    // },
  ],
  testItems: [
    {
      group: 0,
      group_title: 'Земляные работы',
      color: '#FF8080',
      color_light: '#FFD9D9',
      title: '24.02 — 05.03',
      start_time: 1740344400000,
      end_time: 1741208399999,
      id: 10,
      itemProps: {
        style: {
          background: 'green',
          border: 'none',
          color: '#131313',
          fontWeight: '400',
          fontSize: '16px',
        },
      },
    },
    {
      group: 0,
      group_title: 'Земляные работы',
      color: '#FF8080',
      color_light: '#FFD9D9',
      title: '24.02 — 05.03',
      start_time: 1740344400000,
      end_time: 1741208399999,
      id: '0',
      itemProps: {
        style: {
          background: 'red',
          border: 'none',
          color: '#131313',
          fontWeight: '400',
          fontSize: '16px',
        },
      },
    },

    {
      group: 0,
      group_title: 'Земляные работы',
      color: '#FF8080',
      color_light: '#FFD9D9',
      title: '08.03 — 15.03',
      start_time: 1741381200000,
      end_time: 1742072399999,
      id: 1,
    },
    {
      group: 0,
      group_title: 'Земляные работы',
      color: '#FF8080',
      color_light: '#FFD9D9',
      title: '08.03 — 15.03',
      start_time: 1741381200000,
      end_time: 1742072399999,
      id: 12,
    },

    {
      group: 0,
      group_title: 'Земляные работы',
      color: '#FF8080',
      color_light: '#FFD9D9',
      title: '21.03 — 30.03',
      start_time: 1742504400000,
      end_time: 1743368399999,
      id: 2,
    },
    {
      group: 0,
      group_title: 'Земляные работы',
      color: '#FF8080',
      color_light: '#FFD9D9',
      title: '24.02 — 05.03',
      start_time: 1740344400000,
      end_time: 1742072399999,
      id: 11,
      itemProps: {
        style: {
          background: 'red',
          border: 'none',
          color: '#131313',
          fontWeight: '400',
          fontSize: '16px',
        },
      },
    },

    {
      group: 1,
      group_title: 'Шпунтовое ограждение',
      color: '#80E6CB',
      color_light: '#D9F8EF',
      title: '24.02 — 29.03',
      start_time: 1740344400000,
      end_time: 1743281999999,
      id: 3,
    },

    {
      group: 2,
      group_title: 'Распорная система',
      color: '#8080FF',
      color_light: '#D9D9FF',
      title: '24.02 — 21.03',
      start_time: 1740344400000,
      end_time: 1742590799999,
      id: 4,
    },

    {
      group: 2,
      group_title: 'Распорная система',
      color: '#8080FF',
      color_light: '#D9D9FF',
      title: '06.04 — 12.04',
      start_time: 1743886800000,
      end_time: 1744491599999,
      id: 5,
    },

    {
      group: 3,
      group_title: 'Устройство фундамента',
      color: '#FFFF80',
      color_light: '#FFFFD9',
      title: '03.03 — 28.03',
      start_time: 1740949200000,
      end_time: 1743195599999,
      id: 6,
    },

    {
      group: 4,
      group_title: 'Монолит',
      color: '#80FFFF',
      color_light: '#D9FFFF',
      title: '14.02 — 21.02',
      start_time: 1739480400000,
      end_time: 1740171599999,
      id: 7,
    },

    {
      group: 4,
      group_title: 'Монолит',
      color: '#80FFFF',
      color_light: '#D9FFFF',
      title: '11.03 — 28.03',
      start_time: 1741640400000,
      end_time: 1743195599999,
      id: 8,
    },
    //     id(pin):0
    // group(pin):0
    // color(pin):"#FF8080"
    // current_date(pin):1741986000000
    // plan(pin):70.370370400536
    // title(pin):"24.02 — 22.03"
    // start_time(pin):1740344400000
    // end_time(pin):1742677199999
  ],
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addImgsIds(state, action) {
      state.imgsIds = [...state.imgsIds, ...action.payload];
    },
    removeImgId(state, action) {
      state.imgsIds = state.imgsIds.filter((id) => id !== action.payload);
    },
    addItem(state, action) {
      const newItem = action.payload;
      // newItem.id = state.nextItemId; // добавляем уникальный id
      // state.nextItemId = state.nextItemId + 1;
      // state.items.push(newItem);

      // Находим, есть ли уже item с таким id
      const existingIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingIndex === -1) {
        // Если нет такого id, то обавляем в конец
        state.items = [...state.items, newItem];
      } else {
        // Удаляем старый item
        const filtered = state.items.filter((item) => item.id !== newItem.id);

        // И добавляем новый
        state.items = [...filtered, newItem];
      }

      // // добавление процентов "выполнено" в поле done
      // const findGroup = state.groups.find((obj) => obj.id === action.payload.id);
      // if (findGroup && state.currentDate && action.payload.start_time && action.payload.end_time) {
      //   const { start_time, end_time } = action.payload;
      //   const current = state.currentDate;

      //   // Проверка границ
      //   let donePercent;
      //   if (current <= start_time) {
      //     donePercent = 0;
      //   } else if (current >= end_time) {
      //     donePercent = 100;
      //   } else {
      //     const totalTime = end_time - start_time;
      //     const overTime = current - start_time;
      //     donePercent = (overTime / totalTime) * 100;
      //   }

      //   findGroup.done = donePercent;
      //   newItem.done = donePercent;
      //   // findGroup.done = Math.round(donePercent);
      // }
    },
    addRequestItems(state, action) {
      state.items = action.payload;
    },
    clearItems(state) {
      state.items = [];
      state.groups = initialState.groups;
    },
    deleteItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const findGroup = state.groups.find(
        (group) => group.id === action.payload
      );
      if (findGroup) {
        findGroup.done = 0;
      }
    },
    addCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    clearSchedule() {
      // state.imgsIds = [];
      // state.currentDate = null;
      // state.items = [];
      return initialState;
    },
  },
});

export const {
  addItem,
  addRequestItems,
  addCurrentDate,
  addImgsIds,
  removeImgId,
  clearItems,
  clearSchedule,
  deleteItem,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
