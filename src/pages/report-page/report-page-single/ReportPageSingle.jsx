import { useSelector } from 'react-redux';
import ImageBlockSlider from '../../../components/image-block-slider/ImageBlockSlider';
import Slider from '../../../components/slider/Slider';
import Subtitle from '../../../components/subtitle/Subtitle';
import TimeLineSinglePage from '../../../components/time-line/time-line-single-page/TimeLineSinglePage';
import TimeLineSinglePageStyled from '../../../components/time-line/time-line-single-page/TimeLineSinglePageStyled';
import Carousel from '../../../components/slider/Carousel';
import Chart from '../../../components/chart/Chart';
import Slick from '../../../components/slider/Slick';

const ReportPageSingle = () => {
  const images = useSelector((state) => state.report.byImage);
  return (
    <div>
      {/* <Carousel /> */}
      <Slick />
      <div style={{ marginTop: '80px' }}>
        <Subtitle />
        <Chart />
        <TimeLineSinglePageStyled />
      </div>
    </div>
  );
};

export default ReportPageSingle;
