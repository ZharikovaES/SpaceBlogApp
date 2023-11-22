import React, { FC, useEffect, useState } from "react";
import { PositionBackground, IImageAPOD, IVideoAPOD, mediaType } from "../../../types/APOD";
import Container from "../../layout/Container";

import classes from "./APOD.module.scss";
import { animated, AnimationResult, easings, SpringValue, useSpring } from "@react-spring/web";
import DatePicker, { registerLocale } from "react-datepicker";

import PopUpVideo from "../../pop-up/PopUpVideo";

import "react-datepicker/dist/react-datepicker.css";
import { subYears } from "date-fns";
import ru from 'date-fns/locale/ru';
import NASAService from "../../../API/NASAService";
import Image from "next/image";
import { Lookup } from "@react-spring/types";
import { useDispatch, useSelector } from "react-redux";
import { StateDate } from "../../../store/dateStore";
registerLocale('ru', ru);

//компонент с астрономическим фото/видео дня

const APOD: FC<{
  children: React.ReactNode
  data: IImageAPOD | IVideoAPOD
}> = ({ children, data }) => {  
  const selectedDate = useSelector((state: StateDate ) => state.selectedDate);
  const currentDate = useSelector((state: StateDate ) => state.currentDate);

  const [isFinishedAnimation, setIsFinishedAnimation] = useState(false);
  const [isFinishedAnimationBg, setIsFinishedAnimationBg] = useState(false);
  const [timeAnimationBg, setTimeAnimationBg] = useState(15);
  const [isLoadedImg, setLoadedImg] = useState(false);
  const [apod, setAPOD] = useState<IImageAPOD | IVideoAPOD>(data);
  const [hiddenApod, setHiddenAPOD] = useState<IImageAPOD | IVideoAPOD | null>(null);
  const [sizeOfImage, setSizeOfImage] = useState<{
    width: number,
    height: number
  }>({ 
    width: 0,
    height: 0
  });    
  const [positionOfImage, setPositionOfImage] = useState<PositionBackground>({ 
    x: 0,
    y: 0
  });    
  
  const [propsBgOpacity, apiBgOpacity] = useSpring(() => ({
    to: {
      opacity: 1,
    },
    from: {
      opacity: 0,
    },
    config: { 
      duration: 1700,
      easing: easings.easeInBack,
    },
    onRest: ({value}: AnimationResult<SpringValue<Lookup<any>>>) => {
      if (value.opacity === 0) {
        setIsFinishedAnimationBg(true);
      }
      if (value.opacity === 1) {
        setLoadedImg(false);
      }
    }
  }));
  const [propsContent, apiContent] = useSpring(() => ({
    to: {
      opacity: 1,
      transform: "translateY(0)"
    },
    from: {
      opacity: 0,
      transform: "translateY(-20%)"
    },
    delay: 2500,
    config: { 
      duration: 1700,
      easing: easings.easeInOutQuart,
    },
    onRest: ({value}: AnimationResult<SpringValue<Lookup<any>>>) => {
      if (value.opacity === 0) {
        setIsFinishedAnimation(true);
      }
    }
  }));

  //pop-up

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };


  useEffect(() => {
    if (hiddenApod?.urlImg === apod.urlImg && isLoadedImg) {
      apiBgOpacity.start({
        from: {
          opacity: 0
        },
        opacity: 1
      });
    }

    if (hiddenApod?.urlImg === apod.urlImg && apod.title && isLoadedImg) {       
      apiContent.start({
        from: {
          opacity: 0,
          transform: "translateY(0%)",
        },
        opacity: 1,
        delay: 2000
      });

      setHiddenAPOD(null);
    }
  }, [apod, isLoadedImg]);

  useEffect(() => {
    if (hiddenApod && isFinishedAnimation && isFinishedAnimationBg) {
      setAPOD({ ...hiddenApod });
      setIsFinishedAnimation(false);
      setIsFinishedAnimationBg(false);
    }
  }, [hiddenApod, isFinishedAnimation, isFinishedAnimationBg]);

  useEffect(() => {  
    const getAPOD = async () => {
      if (isFinishedAnimation && isFinishedAnimationBg && selectedDate) {        
        const data = await NASAService.getAPOD(selectedDate);
        
        if (data) {
          let imageURL: string = "";
          let videoURL: string = "";
          if (data?.media_type === mediaType.IMAGE) imageURL = (data as IImageAPOD).hdurl;
          else if (data?.media_type === mediaType.VIDEO) {
            imageURL = (data as IVideoAPOD).thumbnail_url;
            videoURL = (data as IVideoAPOD).url;
          }
          
          setHiddenAPOD({ ...data,  urlImg: imageURL, urlVideo: videoURL });
        }
      }
    }
    getAPOD();
  }, [isFinishedAnimation, isFinishedAnimationBg, selectedDate]);

  useEffect(() => {
    let i: NodeJS.Timer | null = null;
    if (sizeOfImage.width && sizeOfImage.height) {
      const aspectRatio = sizeOfImage.width > sizeOfImage.height ? sizeOfImage.width / sizeOfImage.height : sizeOfImage.height / sizeOfImage.width;
      
      setTimeAnimationBg(aspectRatio * 12);
      setPositionOfImage({ x: 0, y: 0});
      
      const callbackSetPositionOfImage = (positionOfImage: PositionBackground) => {
        const newPositionOfImage: PositionBackground = {
          x: positionOfImage.x,
          y: positionOfImage.y
        };

        if (sizeOfImage.width > sizeOfImage.height) {
          newPositionOfImage.x = Math.abs(positionOfImage.x - 100);
        }
        else {
          newPositionOfImage.y = Math.abs(positionOfImage.y - 100);
        }
        
        return newPositionOfImage;
      };

      setPositionOfImage(callbackSetPositionOfImage);
      
      i = setInterval(() => {  
            setPositionOfImage(callbackSetPositionOfImage);
          }, timeAnimationBg * 1000);
    }
    return () => {
      if (i) clearInterval(i);
    }
  }, [sizeOfImage]);

  const dispatch = useDispatch();
  const foo = useSelector((state: StateDate ) => state.selectedDate);
  console.log(foo);
  
  
return (
  <div 
    className={classes.APOD} 
  >
    <animated.div 
      className={classes.APODWrapper} 
      style={propsBgOpacity}
    >
      <div
        className={classes.APODImgWrapper}
      >
        <Image
          placeholder="blur"
          alt={apod.title}
          priority={true}
          src={apod.urlImg}
          blurDataURL={apod.urlImg}
          onLoadingComplete={({naturalWidth, naturalHeight}) => {
            setSizeOfImage({
              width: naturalWidth,
              height: naturalHeight
            });              
            setLoadedImg(true);
          }}
          fill
          sizes="100vw"
          style={{
            transition: `object-position ${timeAnimationBg}s`,
            objectFit: "cover",
            objectPosition: `${positionOfImage.x}% ${positionOfImage.y}%`
          }} /> 
      </div>
      <div
        className="no-filter"
      >
        { children }
      </div>
      <Container>
        <animated.div 
          className={classes.APODContent + " no-filter"}
          style={propsContent}
        >
          <input type="image" src="/images/icons/arrow-white.svg" onClick={openModal} className={apod.media_type === mediaType.VIDEO ? classes.show : ""} alt="Смотреть"></input>
          <h1>{ apod.media_type === mediaType.IMAGE ? "Фото" : "Видео" } дня</h1>
          <div className={classes.APODDatePickerWrapper}>
            <span>Выберите дату</span>
            <DatePicker
              onChange={(date: Date) => {
                apiContent.start({
                  reverse: true
                });       
                apiBgOpacity.start({
                  reverse: true
                });                 
                dispatch({type: "UPDATE_SELECTED_DATE", payload: date})
              }}
              selected={selectedDate}
              includeDateIntervals={[{ 
                start: subYears(selectedDate, 10),
                end: new Date(currentDate)
              }]}
              closeOnScroll={true}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale="ru"
              dateFormat="yyyy-MM-dd"
              wrapperClassName={classes.APODDatePicker}
            />
          </div>
          <h2 className="subtitle-white mt-4">{ apod.title }</h2>
          <p>{ apod.explanation }</p>
        </animated.div>
      </Container>
    </animated.div>
    { modal && <PopUpVideo 
                      title={(apod as IVideoAPOD).title} 
                      setModal={setModal} 
                      url={(apod as IVideoAPOD).urlVideo}
                /> }
  </div>
);
}
export default APOD;