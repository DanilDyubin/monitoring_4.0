import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openModal: false,
  photoReportDate: '',
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
  },
});

export const { setOpenModal, setPhotoReportDate } = projectSlice.actions;
export default projectSlice.reducer;
