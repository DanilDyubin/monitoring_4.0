import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadPhotosId: '', // подгрузка всех фото
};

export const uploadIdSlice = createSlice({
  name: 'uploadId',
  initialState,
  reducers: {
    setUploadPhotosId(state, action) {
      state.uploadPhotosId = action.payload;
    },
    clearUploadId(state) {
      return initialState;
    },
  },
});

export const { setUploadPhotosId, clearUploadId } = uploadIdSlice.actions;
export default uploadIdSlice.reducer;
