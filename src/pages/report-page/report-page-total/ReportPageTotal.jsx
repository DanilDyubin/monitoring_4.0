import ImageBlock from '../../../components/image-block/ImageBlock';
import TimeLineReport from '../../../components/trash/TimeLineReport';
import { useSelector, useDispatch } from 'react-redux';
import Subtitle from '../../../components/subtitle/Subtitle';
import TimeLineSinglePage from '../../../components/time-line/time-line-single-page/TimeLineSinglePage';
import TimeLineTotalPage from '../../../components/time-line/time-line-total-page/TimeLineTotalPage';
import TimeLineTotalPageStyled from '../../../components/time-line/time-line-total-page/TimeLineTotalPageStyled';
import ProjectForm from '../../../components/project-form/ProjectForm';
import ReportDocumentViewer from '../../pdf-page/ReportDocumentViewer';
// import Carousel from '../../../components/slider/Carousel';

const ReportPageTotal = () => {
  const formData = useSelector((state) => state.report.projectData);
  // const mainReport = useSelector((state) => state.report.mainReport || []);
  // const photosReport = useSelector((state) => state.report.photosReport || []);
  // const isDataLoaded = formData && mainReport && photosReport;

  // console.log(`formData - ${JSON.stringify(formData)}`);
  // console.log(`mainReport - ${JSON.stringify(mainReport)}`);
  // console.log(`photosReport - ${JSON.stringify(photosReport)}`);

  return (
    <div>
      <Subtitle subtitle="Основная информация" />
      <ProjectForm formData={formData} />
      {/* <Carousel /> */}
      <Subtitle subtitle="График строительных работ" />
      <TimeLineTotalPageStyled />
    </div>
  );
};

export default ReportPageTotal;
