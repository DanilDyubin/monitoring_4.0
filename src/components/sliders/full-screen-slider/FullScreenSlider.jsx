import Slider from 'react-slick';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { VscClose } from 'react-icons/vsc';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './fullScreenSlider.css';

const images = [
  {
    link: 'https://teletype.in/files/6e/d7/6ed7ffd8-aa01-4c8b-9ee9-de45c5d65f18.jpeg',
  },
  // { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  //{ link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  //{ link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  //{ link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  //{ link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  // { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  // {
  //   link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
  // },
  // { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  // { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  // {
  //   link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
  // },
  // {
  //   link: 'https://teletype.in/files/6e/d7/6ed7ffd8-aa01-4c8b-9ee9-de45c5d65f18.jpeg',
  // },
  // { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  // { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  // { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  // { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  // { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  // { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  //   {
  //     link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
  //   },
  //   { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  //   { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  //   {
  //     link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
  //   },
];

const FullScreenSlider = ({ onCloseModal }) => {
  const settings = {
    customPaging: function (i) {
      if (!images[i]) return null;
      return (
        <a key={i}>
          <img src={images[i].link} alt="object-photo" />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slider-fullscreen-dots',
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    zIndex: '10',
  };

  function SlickNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...btnStyle, right: '54px' }}
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
        style={{ ...style, ...btnStyle, left: '54px' }}
        onClick={onClick}
      >
        <IoChevronBackSharp />
      </div>
    );
  }

  return (
    <div className="slider-fullscreen-container">
      <VscClose className="icon-close" onClick={onCloseModal} />
      <Slider {...settings} className="slider-fullscreen">
        {images?.map((image, i) => (
          <div className="slider-fullscreen-image" key={i}>
            <img src={image.link || null} alt="object-photo" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FullScreenSlider;
