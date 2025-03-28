import ImageBlock from '../../../components/image-block/ImageBlock';
import TimeLineReport from '../../../components/trash/TimeLineReport';
import { useSelector, useDispatch } from 'react-redux';
import Subtitle from '../../../components/subtitle/Subtitle';
import TimeLineSinglePage from '../../../components/time-line/time-line-single-page/TimeLineSinglePage';
import TimeLineTotalPage from '../../../components/time-line/time-line-total-page/TimeLineTotalPage';
import TimeLineTotalPageStyled from '../../../components/time-line/time-line-total-page/TimeLineTotalPageStyled';
import ProjectForm from '../../../components/project-form/ProjectForm';
// import Carousel from '../../../components/slider/Carousel';

const ReportPageTotal = () => {
  const formData = useSelector((state) => state.report.projectData);

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
