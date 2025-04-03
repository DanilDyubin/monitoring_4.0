import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // openModal: false,
  photoReportDate: '',
  formData: {},
  projectId: '', // подгрузка проекта по id
  uploadPhotosId: '', // подгрузка всех фото
  photosUploadType: '', // блокиратор для кнопок загрузки фото (принимает 'db' или 'device')
  scheduleItemsProject: [],
};

export const projectSlice = createSlice({
  name: 'newProject',
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    setPhotoReportDate(state, action) {
      state.photoReportDate = action.payload;
    },
    setFormData(state, action) {
      state.formData = action.payload;
    },
    setScheduleItemsProject(state, action) {
      state.scheduleItemsProject = action.payload || [];
    },
    setProjectId(state, action) {
      const newProjectId = action.payload;

      if (state.projectId !== newProjectId) {
        state.projectId = newProjectId;
        state.uploadPhotosId = '';
      }
    },
    setUploadPhotosId(state, action) {
      state.uploadPhotosId = action.payload;
    },
    setPhotosUploadType(state, action) {
      state.photosUploadType = action.payload;
    },
    clearPhotosUploadType(state) {
      state.photosUploadType = '';
    },
    clearProject() {
      return initialState;
    },
  },
});

export const {
  setOpenModal,
  setPhotoReportDate,
  setFormData,
  setScheduleItemsProject,
  setProjectId,
  setUploadPhotosId,
  setPhotosUploadType,
  clearPhotosUploadType,
  clearProject,
} = projectSlice.actions;
export default projectSlice.reducer;
