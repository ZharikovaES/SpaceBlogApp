import React, { FC, useState } from "react";
import classes from "./PopUpVideo.module.scss";

const PopUpVideo: FC<{
  title: string
  setModal: (modal: boolean) => void,
  url: string
}> = ({ title, setModal, url }) => {
  const [videoLoading, setVideoLoading] = useState(true);

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  return (
          <section className={classes.modalBg}>
            <div className={classes.modalAlign}>
              <div className={classes.modalContent} 
              // modal={modal}
              >
                <button
                  className={[classes.modalClose, "close"].join(' ')}
                  arial-label="Close modal"
                  onClick={() => { setModal(false) }}
                ></button>
                <div className={classes.modalVideoAlign}>
                  {videoLoading &&
                    <img className={classes.modalSpinner} src="/images/icons/loader.svg"/>
                  }
                  <iframe
                    className={classes.modalVideoStyle}
                    onLoad={spinner}
                    loading="lazy"
                    width="800"
                    height="500"
                    src={url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    // allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
  );
}

export default PopUpVideo;