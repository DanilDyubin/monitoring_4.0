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
  console.log(JSON.stringify(photosReport));

  const onModalOpen = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <OpenSliderBtn onClick={onModalOpen} />
      <Slick images={photosReport} />
      <div style={{ marginTop: '80px' }}>
        <Subtitle />
        <Chart photosData={photosReport} />
      </div>
      <SliderModal active={openModal} onClose={onModalClose}>
        {openModal && (
          <FullScreenSlider onCloseModal={onModalClose} images={photosReport} />
        )}
      </SliderModal>
    </div>
  );
};

export default ReportPageSingle;
