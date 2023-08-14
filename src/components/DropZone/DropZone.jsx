import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { colors } from '../../utils/colors';
import { Notify } from 'notiflix';

export const DropZone = forwardRef(
   (
      {
         list,
         onClickDelete,
         setCountIncrement,
         setCountDecrement,
         onChangeCount,
         onClickBuy,
      },
      ref
   ) => {
      const swiper = useRef(null);
      const [currentSlide, setCurrentSlide] = useState(0);
      const [listLength, setListLength] = useState(list.length);


      useEffect(() => {
         // console.log(swiper.current.swiper.activeIndex, swiper.current.swiper.realIndex)
         setCurrentSlide(list.length-1);
      }, [list.length]);

      const onClickPrevArrow = useCallback(() => {
         swiper.current.swiper.slidePrev();
         setCurrentSlide(swiper.current.swiper.activeIndex);
      }, []);

      const onClickNextArrow = useCallback(() => {
         swiper.current.swiper.slideNext();
         setCurrentSlide(swiper.current.swiper.activeIndex);
      }, []);

      const onClickPlus = useCallback(
         (id) => {
            setCountIncrement(id);
         },
         [setCountIncrement]
      );

      const onClickMinus = useCallback(
         (id) => {
            setCountDecrement(id);
         },
         [setCountDecrement]
      );

      const onClickBuyButton = useCallback(
         (id, count) => {
            if (!count) {
               Notify.warning('Set count');
               return;
            }
            onClickBuy(id);
            onClickNextArrow();
         },
         [onClickBuy, onClickNextArrow]
      );

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
               initialSlide={2}
            >
               {list.map(({ id, image, title, description, count, price, isInCart }) => (
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
                              onClick={() => onClickDelete(id)}
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
                              <span>{currentSlide +1}</span>
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
                              onClick={() => onClickBuyButton(id, count)}
                              className="bag"
                           >
                              <div className="bag__top">
                                 <Icon
                                    name="bag"
                                    fill="red"
                                    width={100}
                                    height={100}
                                 />
                                 <span>{price}$</span>
                              </div>
                              <div
                                 className={
                                    isInCart
                                       ? `bag__bottom ${colors["women's clothing"]}`
                                       : 'bag__bottom'
                                 }
                              >
                                 {isInCart ? 'In CART' : 'Add to product cart'}
                              </div>
                           </Button>
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
