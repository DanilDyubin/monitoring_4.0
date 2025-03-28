import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector, useDispatch } from 'react-redux';

import useApiService from '../../service/useApiService';
import { transFormItem } from '../../service/transformResponseData';
import {
  setProjectData,
  setCalendarData,
  setCalendarItemsReport,
  setMainReport,
  setPhotosReport,
  clearReport,
} from '../../redux/slices/reportSlice';
import { clearSchedule } from '../../redux/slices/scheduleSlice';
import { useSendRequest } from '../../hooks/useSendRequest';
import NavigationMenu from '../../components/navigation-menu/NavigationMenu';
import ReportDocument from '../../pages/pdf-page/ReportDocument';
import Button from '../../ui/button/Button';
import PageSkeleton from '../../ui/skeletons/page-skeleton/PageSkeleton';

import s from './reportPage.module.scss';
import ReportDocumentViewer from '../../pages/pdf-page/ReportDocumentViewer';

const ReportLayout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { projectId, uploadId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { getProject, getCalendar, getMainReport, getPhotosReport } =
    useApiService();

  const projectData = useSelector((state) => state.report.projectData);
  const calendarItemsReport = useSelector(
    (state) => state.report.calendarItemsReport
  );
  const mainReport = useSelector((state) => state.report.mainReport);
  console.log(`ProjectData - ${JSON.stringify(projectData)}`);
  console.log(`calendarItemsReport - ${JSON.stringify(calendarItemsReport)}`);
  console.log(`mainReport - ${JSON.stringify(mainReport)}`);

  // const formData = useSelector((state) => state.report.formData);
  // const stages = useSelector((state) => state.report.total.stages || []);
  // const stagesSort = [...stages].sort((a, b) => a.id - b.id);
  // const reportByImage = useSelector(
  //   (state) => state.report.groupsReportByImage
  // );
  // const loadingPage = useSelector((state) => state.report.loadingPage);
  const loadingPage = false; // временно
  // const isDataLoaded = formData && stages && reportByImage;

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      getProject(projectId),
      getCalendar(projectId),
      getMainReport(uploadId),
      getPhotosReport(uploadId),
    ])
      .then(([project, calendar, report, photosReport]) => {
        dispatch(setProjectData(project));
        dispatch(setCalendarData(calendar));
        dispatch(setCalendarItemsReport(transFormItem(calendar)));
        dispatch(setMainReport(report));
        dispatch(setPhotosReport(photosReport));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId, uploadId]);

  // useEffect(() => {
  //   pollStageDetection(id);
  // }, [id]);

  // if (!id) {
  //   return <PageSkeleton />;
  // }

  const handleStateClear = () => {
    dispatch(clearReport());
    dispatch(clearSchedule());
    navigate('/');
  };

  return (
    <>
      {loadingPage ? (
        <PageSkeleton />
      ) : (
        <div className={s.container}>
          <div className={s.navigation}>
            <NavigationMenu projectId={projectId} uploadId={uploadId} />{' '}
          </div>
          {/* <ReportDocumentViewer
            formData={formData}
            stages={stagesSort}
            reportByImage={reportByImage}
          /> */}
          <div>
            <Outlet />
          </div>
          <div className={s.btns}>
            {/* {isDataLoaded ? (
              <PDFDownloadLink
                className={s.btn}
                document={
                  <ReportDocument
                    formData={formData}
                    stages={stagesSort}
                    reportByImage={reportByImage}
                  />
                }
                fileName="Отчет.pdf"
              >
                {({ blob, url, loading, error }) => (
                  <Button
                    title={loading ? 'Загрузка...' : 'Скачать отчет'}
                    size="big"
                    variant="secondaryHovered"
                    disabled={loading}
                  />
                )}
              </PDFDownloadLink>
            ) : (
              <Button title="Загрузка..." size="big" disabled />
            )} */}
            <Button
              title="Создать новый отчет"
              size="big"
              variant="secondaryHovered"
              onClick={handleStateClear}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReportLayout;
