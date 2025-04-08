import { useState } from 'react';
import { useSelector } from 'react-redux';
import Subtitle from '../../../components/subtitle/Subtitle';
import Chart from '../../../components/chart/Chart';
import Slick from '../../../components/sliders/Slick';
import OpenSliderBtn from '../../../ui/open-slider-btn/OpenSliderBtn';
import Modal from '../../../components/modal/Modal';
import FullScreenSlider from '../../../components/sliders/full-screen-slider/FullScreenSlider';
import SliderModal from '../../../components/modal/slider-modal/SliderModal';

const ReportPageSingle = () => {
  const [openModal, setOpenModal] = useState(false);

  const photosReport = useSelector((state) => state.report.photosReport);
  const photosReportSorted = photosReport.map((item) => {
    return {
      ...item,
      report: [...item.report]
        .sort((a, b) => a.stage_id - b.stage_id)
        .slice(0, -1),
    };
  });

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <OpenSliderBtn onClick={onModalOpen} />
      <Slick images={photosReportSorted} />
      <div style={{ marginTop: '80px' }}>
        <Subtitle />
        <Chart photosData={photosReportSorted} />
      </div>
      <SliderModal active={openModal} onClose={onModalClose}>
        {openModal && (
          <FullScreenSlider
            onCloseModal={onModalClose}
            images={photosReportSorted}
          />
        )}
      </SliderModal>
    </div>
  );
};

export default ReportPageSingle;
