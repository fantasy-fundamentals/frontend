import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import Slider from "../../_common/Slider/slider";
import styles from "./headerSlider.module.scss";
import { sliderData } from "../header/data";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { handlePlayersScore } from "../../../services/players.services";
import { saveScoreData } from "../../../store/reducers/homeSlice";
import { getNormalizedError } from "../../../utilty/helpers";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeaderSlider = (prop: any) => {
  const [upcoming, setUpcoming] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { score } = useSelector((state: any) => state?.home);
  const handlePlayerScore = async () => {
    try {
      setloading(true);
      const scoreRes = await handlePlayersScore(upcoming, 13, 0);

      dispatch(saveScoreData(scoreRes?.data?.data));
      setloading(false);
    } catch (error) {
      setloading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handlePlayerScore();
    }
    return () => {
      isMounted = false;
    };
  }, [upcoming]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.btnWrapper}>
            <button
              className={styles.btn1}
              style={
                !upcoming ? { cursor: "not-allowed", color: "#d80f29" } : null
              }
              onClick={() => setUpcoming(false)}
            >
              Recent
            </button>
            <button
              className={styles.btn2}
              style={
                upcoming ? { cursor: "not-allowed", color: "#d80f29" } : null
              }
              onClick={() => setUpcoming(true)}
            >
              Upcoming
            </button>
          </div>
          <div className={styles.sliderWrapper}>
            <Slider
              navigation={true}
              desktopWidth={6}
              spaceBetween={3}
              // loop={activeWidth}
              // autoplay={{
              //   delay: 3000,
              // }}
            >
              {loading && score?.length === 0 ? (
                [...Array(8)].map((item, index) => (
                  <SwiperSlide className={styles.cardWrapper} key={index}>
                    <div
                      className={styles.card}
                      style={{ padding: "1rem 1.5rem 1.4rem 1.5rem" }}
                    >
                      <div className={styles.header}>
                        {/* <img src={"/icons/logoIcon.svg"} alt="" /> */}
                        <label>
                          <Skeleton baseColor="#5f5f5f" />
                        </label>
                      </div>

                      <div className={styles.innerData}>
                        <div className={styles.content}>
                          <div className={styles.leftSide}>
                            <Skeleton baseColor="#5f5f5f" />
                          </div>
                          <div className={styles.rightSide}>
                            <Skeleton baseColor="#5f5f5f" />
                          </div>
                        </div>
                        <div className={styles.content}>
                          <div className={styles.leftSide}>
                            <Skeleton baseColor="#5f5f5f" />
                          </div>
                          <div className={styles.rightSide}>
                            <Skeleton baseColor="#5f5f5f" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : !loading && score?.length === 0 ? (
                <div className={styles.noDataWrapper}>{`No ${
                  upcoming ? "Upcoming" : "Recent"
                } Matches`}</div>
              ) : (
                score?.map((item: any, index) => (
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
                            <label>
                              {item?.detail?.HomeTeam
                                ? item?.detail?.HomeTeam
                                : "-"}
                            </label>
                          </div>
                          <div className={styles.rightSide}>
                            {item?.detail?.HomeScore
                              ? item?.detail?.HomeScore
                              : "-"}
                          </div>
                        </div>
                        <div className={styles.content}>
                          <div className={styles.leftSide}>
                            {/* <img src={item.img} alt="" /> */}
                            <label>
                              {item?.detail?.AwayTeam
                                ? item?.detail?.AwayTeam
                                : "-"}
                            </label>
                          </div>
                          <div className={styles.rightSide}>
                            {item?.detail?.AwayScore
                              ? item?.detail?.AwayScore
                              : "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Slider>
          </div>
          <div className={styles.sliderDotWrapper}>
            {score?.length > 1
              ? [...Array(3)].map((item, index) => (
                  <div className={styles.sliderDot} key={index}>
                    {item}
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSlider;
