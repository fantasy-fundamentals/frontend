import moment from "moment";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import { sliderData } from "../../../scoreComponent/scoreCards/data";
import NoDataFound from "../../../_common/noDataGif/noDataFound";
import Slider from "../../../_common/Slider/slider";
import styles from "./upComingMatches.module.scss";

const UpComingMatches = () => {
  const { score } = useSelector((state: any) => state?.home);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <label>
            UPCOMING <span>MATCHES</span>
          </label>
        </div>
        {score.length === 0 ? (
          <NoDataFound style={{ width: "190px" }} fontSize="20px" />
        ) : (
          <div className={styles.sliderWrapper}>
            <Slider
              navigation={true}
              desktopWidth={5}
              spaceBetween={3}
              loop={false}
            >
              {score?.map((item: any, index) => (
                <SwiperSlide className={styles.cardWrapper} key={index}>
                  <div className={styles.card}>
                    <div className={styles.header}>
                      <img src={"/icons/logoIcon.svg"} alt="" />
                      <label>
                        {moment(item?.detail?.Date).format("MMM Do YY")}
                      </label>
                    </div>

                    <div className={styles.innerData}>
                      <div className={styles.content}>
                        <div className={styles.leftSide}>
                          {/* <img src={item.img} alt="" /> */}
                          <label>{item?.detail?.HomeTeam}</label>
                        </div>
                        <div className={styles.rightSide}>
                          {item?.detail?.HomeScore}
                        </div>
                      </div>
                      <div className={styles.content}>
                        <div className={styles.leftSide}>
                          {/* <img src={item.img} alt="" /> */}
                          <label>{item?.detail?.AwayTeam}</label>
                        </div>
                        <div className={styles.rightSide}>
                          {item?.detail?.AwayScore}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpComingMatches;
