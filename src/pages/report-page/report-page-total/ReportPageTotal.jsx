import ImageBlock from '../../../components/image-block/ImageBlock';
import TimeLineReport from '../../../components/trash/TimeLineReport';
import Subtitle from '../../../components/subtitle/Subtitle';
import TimeLineSinglePage from '../../../components/time-line/time-line-single-page/TimeLineSinglePage';
import TimeLineTotalPage from '../../../components/time-line/time-line-total-page/TimeLineTotalPage';
import TimeLineTotalPageStyled from '../../../components/time-line/time-line-total-page/TimeLineTotalPageStyled';
import ProjectForm from '../../../components/project-form/ProjectForm';
import Carousel from '../../../components/slider/Carousel';

const ReportPageTotal = () => {
  return (
    <div>
      <Subtitle subtitle="Основная информация" />
      <ProjectForm />
      <Carousel />
      <Subtitle subtitle="График строительных работ" />

      {/* <TimeLineTotalPage /> */}
      <TimeLineTotalPageStyled />
    </div>
  );
};

export default ReportPageTotal;
