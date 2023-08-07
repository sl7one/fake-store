import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { forwardRef, useEffect, useRef, useState } from 'react';

export const DropZone = forwardRef(
   ({ list, onClickClose, setCountIncrement, setCountDecrement, onChangeCount }, ref) => {
      const swiper = useRef(null);
      const [currentSlide, setCurrentSlide] = useState(0);

      useEffect(() => {
         setCurrentSlide(swiper.current.swiper.activeIndex);
      }, [list.length]);

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
      const onClickPlus = (id) => {
         setCountIncrement(id);
      };
      const onClickMinus = (id) => {
         setCountDecrement(id);
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
            >
               {list.map(({ id, image, title, description, count, price }) => (
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
                                 width={25}
                                 height={25}
                              />
                           </Button>
                           <Button
                              onClick={onClickPrevArrow}
                              className="prev"
                           >
                              <Icon
                                 name="arrow-left"
                                 fill="red"
                                 width={25}
                                 height={25}
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
                                 width={25}
                                 height={25}
                              />
                           </Button>
                        </div>
                     </div>
                     <div className="buy-button">
                        <div className="bag-button">
                           <Button
                              onClick={onClick}
                              className="bag"
                           >
                              <Icon
                                 name="bag"
                                 fill="red"
                                 width={100}
                                 height={100}
                              />
                           </Button>
                           <span>{price}$</span>
                           <p>Add to cart</p>
                        </div>

                        <div className="counter">
                           <input
                              type="number"
                              min={0}
                              value={count ? count : 0}
                              onChange={({ target: { value } }) =>
                                 onChangeCount(id, value)
                              }
                           />

                           <div className="plus-minus">
                              <Button onClick={() => onClickPlus(id)}>
                                 <Icon
                                    name="plus"
                                    fill="red"
                                    width={15}
                                    height={15}
                                 />
                              </Button>

                              <Button onClick={() => onClickMinus(id)}>
                                 <Icon
                                    name="minus"
                                    fill="red"
                                    width={15}
                                    height={15}
                                 />
                              </Button>
                           </div>
                           <span>{count ? count * price : 0}$</span>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      );
   }
);
