import { configureStore } from '@reduxjs/toolkit';
import calendar from './slices/calendarSlice';
import schedule from './slices/scheduleSlice';
import report from './slices/reportSlice';
import project from './slices/projectSlice';

export const store = configureStore({
  reducer: {
    calendar,
    schedule,
    report,
    project,
  },
});

// store.subscribe(...) вызывается при каждом dispatch и записывает данные в sessionStaorage
// store.subscribe(() => {
//   try {
//     const state = store.getState();

//     sessionStorage.setItem('report', JSON.stringify(state.report));
//   } catch (e) {
//     console.error('Ошибка при записи sessionStorage:', e);
//   }
// });
