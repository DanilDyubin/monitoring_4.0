import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // openModal: false,
  photoReportDate: '',
  formData: {},
  projectId: '', // подгрузка проекта по id
  uploadPhotosId: '', // подгрузка всех фото
  selectedUploadType: '', // блокиратор для кнопок загрузки фото
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
    setSelectedUploadType(state, action) {
      state.selectedUploadType = action.payload;
    },
  },
});

export const {
  setOpenModal,
  setPhotoReportDate,
  setFormData,
  setProjectId,
  setUploadPhotosId,
  setSelectedUploadType,
} = projectSlice.actions;
export default projectSlice.reducer;
