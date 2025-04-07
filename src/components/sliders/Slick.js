import { useDispatch } from 'react-redux';
import { setCurrentSlide } from '../../redux/slices/reportSlice';
import Slider from 'react-slick';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick.css';

// const images = [
//   {
//     link: 'https://teletype.in/files/6e/d7/6ed7ffd8-aa01-4c8b-9ee9-de45c5d65f18.jpeg',
//   },
//   { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
//   { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
//   { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
//   { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
//   { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
//   { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
//   {
//     link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
//   },
//   { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
//   { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
//   {
//     link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
//   },
//     {
//       link: 'https://teletype.in/files/6e/d7/6ed7ffd8-aa01-4c8b-9ee9-de45c5d65f18.jpeg',
//     },
//     { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
//     { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
//     { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
//     { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
//     { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
//     { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
//     {
//       link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
//     },
//     { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
//     { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
//     {
//       link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
//     },
// ];

const Slick = ({ images }) => {
  const dispatch = useDispatch();

  const showSlides = images.length < 5 ? images.length : 5;

  const settings = {
    focusOnSelect: true,
    dots: true,
    dotsClass: 'slider-one-dots',
    infinite: images.length > 1,
    slidesToShow: showSlides,
    slidesToScroll: 1,
    speed: 500,
    afterChange: (index) => dispatch(setCurrentSlide(index)),
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
  };

  const btnStyle = {
    height: '44px',
    width: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f0f6',
    color: '#000000',
    borderRadius: '50px',
    fontSize: '20px',
  };

  function SlickNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...btnStyle, right: '-54px' }}
        onClick={onClick}
      >
        <IoChevronForwardSharp />
      </div>
    );
  }

  function SlickPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...btnStyle, left: '-54px' }}
        onClick={onClick}
      >
        <IoChevronBackSharp />
      </div>
    );
  }

  return (
    <div className="slider-one-container">
      <Slider {...settings} className="slider-one-slide">
        {images.map((image, i) => (
          <div className="slick-image-block" key={i}>
            {/* <span style={{ position: 'absolute' }}>{i}</span> */}
            <img
              src={
                `https://msi.construction-monitoring.contextmachine.cloud/get_one_mask?image_id=${image.photoId}` ||
                null
              }
              alt="object-photo"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slick;
