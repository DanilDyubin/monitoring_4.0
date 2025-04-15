import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector, useDispatch } from 'react-redux';

import { resetAllSlices } from '../../redux/actions/globalActions';
import useApiService from '../../service/useApiService';
import {
  transFormItemReport,
  transFormGroup,
} from '../../service/transformResponseData';
import {
  setProjectData,
  setCalendarData,
  setGroupsReport,
  setCalendarItemsReport,
  setMainReport,
  setPhotosReport,
} from '../../redux/slices/reportSlice';
import { addPercentToGroups } from '../../redux/slices/scheduleSlice';
import ReportDocumentViewer from '../../pages/pdf-page/ReportDocumentViewer';
import NavigationMenu from '../../components/navigation-menu/NavigationMenu';
import ReportDocument from '../../pages/pdf-page/ReportDocument';
import Button from '../../ui/button/Button';
import PageSkeleton from '../../ui/skeletons/page-skeleton/PageSkeleton';

import s from './reportPage.module.scss';

const ReportLayout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { projectId, uploadId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { getProject, getCalendar, getMainReport, getPhotosReport } =
    useApiService();

  const projectData = useSelector((state) => state.report.projectData);
  const mainReport = useSelector((state) => state.report.mainReport || []);
  const mainReportSorted = [...mainReport]
    .sort((a, b) => a.stage_id - b.stage_id)
    .slice(0, -1);
  const photosReport = useSelector((state) => state.report.photosReport || []);
  const photosReportSorted = photosReport.map((item) => {
    return {
      ...item,
      report: [...item.report]
        .sort((a, b) => a.stage_id - b.stage_id)
        .slice(0, -1),
    };
  });

  // находим stage у которой есть report_date
  const stageWithReportDate = mainReportSorted.find(
    (item) =>
      item?.stage?.calendars?.length > 0 && item.stage.calendars[0].report_date
  );
  const reportDate = stageWithReportDate?.stage?.calendars?.[0]?.report_date;

  const isDataLoaded = projectData && mainReport.length && photosReport.length;

  console.log(`formData - ${JSON.stringify(projectData)}`);
  console.log(`mainReportSorted - ${JSON.stringify(mainReport)}`);
  console.log(`photosReport - ${JSON.stringify(photosReport)}`);

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
        dispatch(setCalendarItemsReport(transFormItemReport(calendar)));
        dispatch(setMainReport(report));
        dispatch(setGroupsReport(transFormGroup(report)));
        dispatch(addPercentToGroups(calendar));
        dispatch(setPhotosReport(photosReport));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId, uploadId]);

  const handleStateClear = () => {
    dispatch(resetAllSlices());
    navigate('/');
  };

  return (
    <>
      {loading || !projectId ? (
        <PageSkeleton />
      ) : (
        <div className={s.container}>
          <div className={s.navigation}>
            <NavigationMenu projectId={projectId} uploadId={uploadId} />{' '}
          </div>
          {/* {isDataLoaded && (
            <ReportDocumentViewer
              formData={projectData}
              reportDate={reportDate}
              stages={mainReportSorted}
              reportByImage={photosReportSorted}
            />
          )} */}

          <div>
            <Outlet />
          </div>
          <div className={s.btns}>
            {isDataLoaded ? (
              <PDFDownloadLink
                className={s.btn}
                document={
                  <ReportDocument
                    formData={projectData}
                    stages={mainReportSorted}
                    reportByImage={photosReportSorted}
                    reportDate={reportDate}
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
            )}
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
