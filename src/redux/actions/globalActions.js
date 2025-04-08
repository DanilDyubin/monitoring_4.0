import { clearCalendar } from '../slices/calendarSlice';
import { clearProject } from '../slices/projectSlice';
import { clearSchedule } from '../slices/scheduleSlice';
import { clearUploadId } from '../slices/uploadIdSlice';
import { clearReport } from '../slices/reportSlice';
import { persistor } from '../store';

export const resetAllSlices = () => (dispatch) => {
  dispatch(clearCalendar());
  dispatch(clearProject());
  dispatch(clearSchedule());
  dispatch(clearUploadId());
  dispatch(clearReport());
  persistor.purge();
};
