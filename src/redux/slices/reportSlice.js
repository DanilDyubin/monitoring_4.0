import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   formData: {},
//   byImage: [],
//   total: {},
//   groupsReport: [],
//   itemsReport: [],
//   groupsReportByImage: [],
//   index: 0,
//   loadingPage: false,
//   loadingImages: false,
//   arrayFilesLength: 0,
// };

const initialState = {
  projectData: {},
  calendarData: [],
  // byImage: [],
  // total: {},
  // groupsReport: [],
  calendarItemsReport: [],
  mainReport: [],
  photosReport: [],
  currentPhotoReportIndex: 0,
  // groupsReportByImage: [],
  // index: 0,
  // loadingPage: false,
  // loadingImages: false,
  // arrayFilesLength: 0,
};

// try {
//   const exist = sessionStorage.getItem('report');
//   if (exist) {
//     const parsed = JSON.parse(exist);
//     // Сливаем то, что в parsed, с initialState
//     Object.assign(initialState, parsed);
//   }
// } catch (e) {
//   console.error('Ошибка при чтении sessionStorage:', e);
// }

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setProjectData(state, action) {
      state.projectData = action.payload;
    },
    // setReportData(state, action) {
    //   const { byImage = [], total = {} } = action.payload || {};
    //   state.byImage = byImage;
    //   state.total = total;
    // },
    // setReportGroups(state, action) {
    //   state.groupsReport = action.payload || [];
    // },
    setCalendarData(state, action) {
      state.calendarData = action.payload || [];
    },
    setCalendarItemsReport(state, action) {
      state.calendarItemsReport = action.payload || [];
    },
    setMainReport(state, action) {
      state.mainReport = action.payload || [];
    },
    setPhotosReport(state, action) {
      state.photosReport = action.payload || [];
    },
    // setReportGroupsByImage(state, action) {
    //   state.groupsReportByImage = action.payload || [];
    // },
    // setIndex(state, action) {
    //   state.index = action.payload;
    // },
    // setLoadingPage(state, action) {
    //   state.loadingPage = action.payload;
    // },
    // setLoadingImages(state, action) {
    //   state.loadingImages = action.payload;
    // },
    // setArrayFilesLength(state, action) {
    //   state.arrayFilesLength = action.payload;
    // },
    setCurrentPhotoReportIndex(state, action) {
      state.currentPhotoReportIndex = action.payload;
    },
    clearReport(state) {
      return initialState;
    },
  },
});

export const {
  setProjectData,
  // setReportData,
  // setReportGroups,
  setCalendarData,
  setCalendarItemsReport,
  setMainReport,
  setPhotosReport,
  setCurrentPhotoReportIndex,
  // setReportGroupsByImage,
  // setIndex,
  // setLoadingPage,
  // setLoadingImages,
  // setArrayFilesLength,
  clearReport,
} = reportSlice.actions;
export default reportSlice.reducer;
