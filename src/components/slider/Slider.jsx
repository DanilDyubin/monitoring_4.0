import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setIndex } from '../../redux/slices/reportSlice';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import {
  Navigation,
  Pagination,
  FreeMode,
  Thumbs,
  Grid,
  Scrollbar,
} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/grid';
import 'swiper/css/scrollbar';
import './slider.css';

const Slider = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const dispatch = useDispatch();
  const index = useSelector((state) => state.report.index);
  const images = useSelector((state) => state.report.byImage);

  // const handlePrevClick = () => {
  //   dispatch(setIndex(index > 0 ? index - 1 : images.length - 1));
  // };

  // const handleNextClick = () => {
  //   dispatch(setIndex(index < images.length - 1 ? index + 1 : 0));
  // };

  const items = images.map((item, i) => {
    return (
      <SwiperSlide key={i}>
        <div className="slider__img">
          <div className="slider__number">{`Дом ${i + 1}`}</div>
          <img
            src={
              `https://msi.stage-detection.contextmachine.cloud/get_predicted_images?uid=${item.predicted_image}` ||
              null
            }
            // src={item}
            alt="object-photo"
          />
        </div>
      </SwiperSlide>
    );
  });

  const items2 = images.map((item, i) => {
    return (
      <SwiperSlide key={i}>
        <div className="slider__img2">
          <img
            src={
              `https://msi.stage-detection.contextmachine.cloud/get_predicted_images?uid=${item.predicted_image}` ||
              null
            }
            alt="object-photo"
          />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="slider">
      <div className="slider__container">
        <Swiper
          className="swiper"
          slidesPerView={1}
          loop={true}
          autoHeight={false}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          onSlideChange={(swiper) => {
            // Если есть loop, лучше использовать realIndex
            dispatch(setIndex(swiper.realIndex));
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Pagination, Thumbs]}
          // breakpoints={{
          //   320: {
          //     slidesPerView: 1,
          //     spaceBetween: 20
          //   },
          //   480: {
          //     slidesPerView: 1,
          //     spaceBetween: 30
          //   },
          // }}
        >
          {items}
          <button className="swiper-button-prev">
            <VscChevronLeft className="swiper-button-icon" />
          </button>
          <button className="swiper-button-next">
            <VscChevronRight className="swiper-button-icon" />
          </button>
        </Swiper>
      </div>
      <div className="thumbs__container">
        <Swiper
          onSwiper={setThumbsSwiper}
          // loop={true}
          // freeMode={true}
          // slidesPerView={images.length}
          slidesPerView={'auto'}
          spaceBetween={10}
          // scrollbar={{
          //   el: '.swiper-scrollbar',
          //   draggable: true,
          // }}
          // grid={{
          //   rows: 2,
          // }}
          // modules={[Navigation, Thumbs, FreeMode]}
          scrollbar={true}
          mousewheel={true}
          modules={[Thumbs, Scrollbar]}
          className="swiper2"
        >
          {items2}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
