import moment from "moment";
import React from "react";
import { SwiperSlide } from "swiper/react";
import Slider from "../../_common/Slider/slider";
import styles from "./teamSlider.module.scss";
import { data } from "./data";
const TeamSlider = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <img src={"/images/profileImg2.webp"} alt="" />
            <label>Duane Ours</label>
            <p>
              <div className={styles.borderWrapper} />
              <span>The Executive</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSlider;
