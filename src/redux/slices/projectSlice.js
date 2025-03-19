import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openModal: false,
  photoReportDate: '',
  formData: {},
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
  },
});

export const { setOpenModal, setPhotoReportDate, setFormData } =
  projectSlice.actions;
export default projectSlice.reducer;
