import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface prop {
  children: any;
  modules?: any;
  navigation?: any;
  desktopWidth?: any;
  spaceBetween?: any;
  pagination?: any;
  slidesPerView?: any;
  className?: any;
  loop?: any;
  autoplay?: any;
}

//for inner map use <SwiperSlide>Slide 1</SwiperSlide>;
const Slider = (SliderProps: prop) => {
  const {
    children,
    navigation,
    desktopWidth,
    spaceBetween,
    pagination,
    slidesPerView,
    className,
    loop,
    autoplay,
  } = SliderProps;

  return (
    <>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Swiper
          slidesPerView={slidesPerView ? slidesPerView : 3}
          spaceBetween={spaceBetween}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={autoplay}
          className={className}
          loop={loop}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            766: {
              slidesPerView: 3,
            },
            800: {
              slidesPerView: 3,
            },
            1265: {
              slidesPerView: desktopWidth ? desktopWidth : 3,
            },
          }}
          navigation={navigation}
          pagination={pagination}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
        >
          {children}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
