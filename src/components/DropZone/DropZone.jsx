import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { forwardRef, useEffect, useRef, useState } from 'react';

export const DropZone = forwardRef(({ list, onClickClose }, ref) => {
   const swiper = useRef(null);
   const [currentSlide, setCurrentSlide] = useState(0);

   useEffect(() => {
      setCurrentSlide(swiper.current.swiper.activeIndex);
   }, [list.length]);

   //    if (!list.length) return;
   //    const { image, description, title } = list[list.length - 1];
   // console.log(list)

   const onClick = () => {
      // console.log(swiper.current.swiper.activeIndex);
      // console.log(swiper.current.swiper.slides.length);
   };

   const onClickPrevArrow = () => {
      swiper.current.swiper.slidePrev();
      setCurrentSlide(swiper.current.swiper.activeIndex);
   };
   const onClickNextArrow = () => {
      swiper.current.swiper.slideNext();
      setCurrentSlide(swiper.current.swiper.activeIndex);
   };
   return (
      <div
         className="dropzone hidden"
         ref={ref}
      >
         <Swiper
            ref={swiper}
            spaceBetween={15}
            slidesPerView={1}
            className="dropzone__list"
            rewind
            // modules={[Navigation]}
            // navigation={{
            //    nextEl: '.custom-navigation button.next',
            //    prevEl: '.custom-navigation button.prev',
            // }}
            // scrollbar={{ draggable: true }}
         >
            {list.map(({ id, image, title, description }) => (
               <SwiperSlide
                  key={id}
                  className="dropzone__item"
               >
                  <img
                     src={image}
                     alt={title}
                  />
                  <div className="dropzone__preview-info">
                     <h3>{title}</h3>
                     <p>{description}</p>
                     <div className="custom-navigation">
                        <Button
                           onClick={() => onClickClose(id)}
                           className="close"
                        >
                           <Icon
                              name="close"
                              fill="red"
                              width={32}
                              height={32}
                           />
                        </Button>
                        <Button
                           onClick={onClickPrevArrow}
                           className="prev"
                        >
                           <Icon
                              name="arrow-left"
                              fill="red"
                              width={32}
                              height={32}
                           />
                        </Button>
                        <div>
                           <span>{currentSlide + 1}</span>
                           <span>/{'   ' + list.length}</span>
                        </div>
                        <Button
                           onClick={onClickNextArrow}
                           className="next"
                        >
                           <Icon
                              name="arrow-right"
                              fill="red"
                              width={32}
                              height={32}
                           />
                        </Button>
                     </div>
                  </div>
                  <Button
                     onClick={onClick}
                     className="slider-button"
                  >
                     <Icon
                        name="bag"
                        fill="red"
                        width={64}
                        height={64}
                     />
                  </Button>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
});
