import React, { FC, useEffect, useState } from "react";
import { IAPOD, IImageAPOD, IVideoAPOD, mediaType } from "../../../types/APOD";
import Container from "../../layout/Container";
import classes from "./APOD.module.scss";
import { animated, easings, useSprings } from 'react-spring'

//компонент с астрономическим фото/видео дня
const APOD: FC<{
    children: React.ReactNode
    data: IAPOD
}> = ({ children, data }) => {
    const [isLoaded, setLoaded] = useState(false);
    const [apod, setAPOD] = useState<IAPOD>({} as IAPOD);
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        if (data) {
            setAPOD(data);
            if (data?.media_type === mediaType.IMAGE) setImageURL((data as IImageAPOD).hdurl);
            else setImageURL((data as IVideoAPOD).thumbnail_url);
            setLoaded(true);
        } else setLoaded(false);
    }, [data]);

    const [propsBg, propsBgOpacity, propsContent] = useSprings(3, [{
                                                                    to: {
                                                                        backgroundPosition: "center 100%",
                                                                    },
                                                                    from: {
                                                                        backgroundPosition: "center 0%",
                                                                    },
                                                                    config: { 
                                                                        duration: 20000,
                                                                        easing: easings.easeInOutQuart,
                                                                    },
                                                                    reset: true,
                                                                    loop: { reverse: true }
                                                                }, {
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
                                                                    reset: true,
                                                                }, {
                                                                    to: {
                                                                        opacity: isLoaded ? 1 : 0,
                                                                        transform: "translateY(0)"
                                                                    },
                                                                    from: {
                                                                        opacity: 0,
                                                                        transform: "translateY(-20%)"
                                                                    },
                                                                    delay: 1000,
                                                                    config: { 
                                                                        duration: 1700,
                                                                        easing: easings.easeInOutQuart,
                                                                    },
                                                                    reset: true,
                                                                }]);

return (
        <div 
            className={classes.APOD} 
        >
            <animated.div 
                    className={classes.APODWrapper} 
                    style={{...propsBg, ...propsBgOpacity, backgroundImage: "url('" + imageURL + "')"}}
            >
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
                        <input type="image" src="/images/icons/arrow-white.svg" className={apod.media_type === mediaType.VIDEO ? classes.show : ""} alt="Смотреть"></input>
                        <h1>{ apod.media_type === mediaType.IMAGE ? "Фото" : "Видео" } дня</h1>
                        <h2 className="subtitle-white mt-4">{ apod.title }</h2>
                        <p>{ apod.explanation }</p>
                    </animated.div>
                </Container>
            </animated.div>
        </div>
    );
}
export default APOD;