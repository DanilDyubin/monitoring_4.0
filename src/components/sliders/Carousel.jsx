import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import './carousel.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const images = [
  {
    link: 'https://teletype.in/files/6e/d7/6ed7ffd8-aa01-4c8b-9ee9-de45c5d65f18.jpeg',
  },
  { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  {
    link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
  },
  { link: 'https://ooossi.ru/assets-riw/images/homes/9%20pl%20fasad.jpg' },
  { link: 'https://domsbobrom.com/uploads/images/stati/486.jpg' },
  {
    link: 'https://cdn.tripster.ru/thumbs2/2dd725c8-5e6e-11ee-acc3-b2623b589497.1220x600.jpeg',
  },
];

const Carousel = () => {
  const items = images.map((image, i) => {
    return (
      <SwiperSlide key={i} className="mySwiper-slide">
        <div className="image-block">
          <img src={image.link || null} alt="object-photo" />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="carousel">
      <Swiper
        slidesPerView={5}
        centeredSlides={true}
        // slideActiveClass
        pagination={{ clickable: true }}
        // loop={true}
        spaceBetween={12}
        navigation={{
          prevEl: '.mySwiper-button-prev',
          nextEl: '.mySwiper-button-next',
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {items}
      </Swiper>
      <button className="mySwiper-button-prev">
        <IoChevronBackSharp className="mySwiper-button-icon" />
      </button>
      <button className="mySwiper-button-next">
        <IoChevronForwardSharp className="mySwiper-button-icon" />
      </button>
    </div>
  );
};

export default Carousel;

// // Import Swiper React components
// import { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';

// import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// // import 'swiper/css/navigation';

// import './carousel.css';

// // import required modules
// import { Pagination, Navigation, Thumbs } from 'swiper/modules';

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
// ];

// const Carousel = () => {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);

//   const items = images.map((image, i) => {
//     return (
//       <SwiperSlide key={i} className="mySwiper-slide">
//         <div className="image-block">
//           <img src={image.link || null} alt="object-photo" />
//         </div>
//       </SwiperSlide>
//     );
//   });

//   const items2 = images.map((image, i) => {
//     return (
//       <SwiperSlide key={i} className="mySwiper-slide">
//         <div className="image-block">
//           <img src={image.link || null} alt="object-photo" />
//         </div>
//       </SwiperSlide>
//     );
//   });

//   return (
//     <div className="carousel">
//       <Swiper
//         className="swiper"
//         slidesPerView={1}
//         loop={true}
//         autoHeight={false}
//         spaceBetween={30}
//         navigation={{
//           prevEl: '.mySwiper-button-prev',
//           nextEl: '.mySwiper-button-next',
//         }}
//         thumbs={{ swiper: thumbsSwiper }}
//         modules={[Navigation, Pagination, Thumbs]}
//       >
//         {items}
//         <button className="mySwiper-button-prev">
//           <IoChevronBackSharp className="mySwiper-button-icon" />
//         </button>
//         <button className="mySwiper-button-next">
//           <IoChevronForwardSharp className="mySwiper-button-icon" />
//         </button>
//       </Swiper>
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         slidesPerView={images.length}
//         // loop={true}
//         spaceBetween={12}
//         navigation={{
//           prevEl: '.thumbs-button-prev',
//           nextEl: '.thumbs-button-next',
//         }}
//         modules={[Pagination, Navigation, Thumbs]}
//         className="mySwiper"
//       >
//         {items2}
//       </Swiper>
//       <div style={{ display: 'flex', gap: '20px' }}>
//         <button className=".thumbs-button-prev">
//           <IoChevronBackSharp className="swiper-button-icon" />
//         </button>
//         <button className=".thumbs-button-next">
//           <IoChevronForwardSharp className="swiper-button-icon" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Carousel;
