import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import ReactPlayer from "react-player";
import styles from "./marketplace.module.scss";
import HoverVideoPlayer from "react-hover-video-player";

interface Props {
  key?: string | number;
  img?: string;
  heading?: string;
  amount?: string | number;
  onClick?: (prop?: any) => void;
  onDetailClick?: (prop?: any) => void;
  btn?: string;
  ranking?: string;
  imgHeading?: string;
  height?: string;
  weight?: string;
  experience?: string;
  age?: string;
  current?: string;
  price?: string;
  subHeading?: string;
  activeBtn?: string;
  active?: boolean;
  DetailButton?: string;
  videoUrl?: string;
  backgroundColor?: string;
  color?: string;
  topActive?: any;
  topActiveBtnText?: string;
  loading?: boolean;
}
const MarketplaceCard = (prop: Props) => {
  const {
    key,
    img,
    heading,
    subHeading,
    onClick,
    btn,
    ranking,
    imgHeading,
    height,
    weight,
    experience,
    age,
    current,
    price,
    active,
    activeBtn,
    DetailButton,
    videoUrl,
    onDetailClick,
    backgroundColor,
    color,
    topActive,
    topActiveBtnText,
    loading,
  } = prop;

  // const [loadingVideo, setLoadingVideo] = useState(false);

  // const VideoEventHandler = (type: any) => {
  //   if (type === "buffer") {
  //     setLoadingVideo(true);
  //   } else if (type === "bufferEnd") {
  //     setLoadingVideo(false);
  //   } else if (type === "start") {
  //     setLoadingVideo(true);
  //   } else if (type === "play") {
  //     setLoadingVideo(false);
  //   }
  // };

  return (
    <div className={styles.card} key={key}>
      <div className={styles.headingWrapper}>
        {/* 
        <div className={styles.headingRanking}>
          <div className={styles.leftSide}>{subHeading}</div>
          <div className={styles.rightSide}>{ranking}</div>
        </div>
        <div className={styles.imgWrapper}>
          {img && <img src={img} alt="" />}
          <span>{imgHeading}</span>
        </div>
        <div className={styles.bottomWrapper}>
          <div className={styles.leftWrapper}>
            <span>Height</span>
            <p>{height}</p>
          </div>
          <div className={styles.rightWrapper}>
            <span>Weight</span>
            <p>{weight}</p>
          </div>
        </div>
        <div className={styles.bottomWrapper}>
          <div className={styles.leftWrapper}>
            <span>Experience</span>
            <p>{experience}</p>
          </div>
          <div className={styles.rightWrapper}>
            <span>Age</span>
            <p>{age}</p>
          </div>
        </div> */}
        <div className={styles.videoWrapper}>
          <div className={styles.topHeading}>
            <div className={styles.leftWrapper}>{heading}</div>
            {topActive && (
              <div className={styles.rightWrapper}>
                <button
                  style={{
                    backgroundColor: `${backgroundColor}`,
                    color: `${color}`,
                  }}
                >
                  {topActiveBtnText}
                </button>
              </div>
            )}
          </div>

          {loading && (
            <div className={styles.loadingStyle}>
              <RotatingLines
                strokeColor="#d80f29"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          )}
          {videoUrl ? (
            <>
              <HoverVideoPlayer
                videoSrc={videoUrl}
                videoStyle={{ height: "320px", zIndex: 0 }}
              />
              {/* <ReactPlayer
                url={videoUrl}
                playing={true}
                controls={false}
                stopOnUnmount={true}
                loop
                muted
                width="100%"
                height="320px" 
                onBuffer={() => VideoEventHandler("buffer")}
                onBufferEnd={() => VideoEventHandler("bufferEnd")}
                onStart={() => VideoEventHandler("start")}
                onPlay={() => VideoEventHandler("play")}
              /> */}
            </>
          ) : (
            <div className={styles.videoText}>No Video Available</div>
          )}
        </div>
      </div>
      <hr />
      <div className={DetailButton ? styles.detailcontent : styles.content}>
        <label>{current}</label>
        <span>{price}</span>
      </div>
      {active ? (
        <div className={styles.activeBtnWrapper}>
          <button>{activeBtn}</button>
        </div>
      ) : (
        <div
          className={DetailButton ? styles.detailBtnWrapper : styles.btnWrapper}
        >
          {DetailButton && (
            <button className={styles.detailBtn} onClick={onDetailClick}>
              {DetailButton}
            </button>
          )}
          <button onClick={onClick}>{btn}</button>
        </div>
      )}
    </div>
  );
};

export default MarketplaceCard;
