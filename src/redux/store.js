import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // Стандартный storage для Web (использует localStorage)

import calendar from './slices/calendarSlice';
import schedule from './slices/scheduleSlice';
import report from './slices/reportSlice';
import project from './slices/projectSlice';

// 1) Собираем все редьюсеры в rootReducer
const rootReducer = combineReducers({
  calendar,
  schedule,
  report,
  project,
});

// 2) Настраиваем конфиг для redux-persist
// key: 'root' означает "корневой" уровень хранилища.
// storage - выбрали localStorage (по умолчанию).
// whitelist или blacklist - указываем, какие именно слайсы сохранять.
// Если ничего не указать, по умолчанию будет сохранять все.
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['project'],
};

// 3) Оборачиваем rootReducer в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4) Создаём store с persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
});

// 5) Создаём persistor, который будет запускать процессы сохранения/восстановления
export const persistor = persistStore(store);
