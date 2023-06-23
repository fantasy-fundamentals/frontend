import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "../../_common/modal";
import styles from "./scoreInfoHeader.module.scss";
import ReactPlayer from "react-player";
import { sliderData } from "../../scoreComponent/scoreCards/data";
import { RiPlayFill } from "react-icons/ri";
import { BsBellFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import moment from "moment";
const ScoreInfoHeader = () => {
  const location = useRouter();
  const [popupvisible, setpopupvisible] = useState(false);
  const { scoreDetails } = useSelector((state: any) => state?.scoreDetail);

  const togglepopup = (e: any) => {
    e.preventDefault();
    setpopupvisible((preview) => !preview);
  };
  return (
    <>
      <Modal
        visible={popupvisible}
        showModal2
        onClose={() => setpopupvisible(false)}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=CxwJrzEdw1U"
          playing={true}
          controls={true}
          width="100%"
          height="400px"
        />
      </Modal>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.topWrapper}>
            <div className={styles.leftCard}>
              <div className={styles.leftSide}>
                <label>{scoreDetails?.detail?.HomeTeam}</label>
                <p>Score: {scoreDetails?.detail?.HomeScore}</p>
              </div>
              {/* <div className={styles.rightSide}>
                <img src={"/images/BUFImage.svg"} alt="" />
              </div> */}
            </div>
            <div className={styles.centerCard}>
              <label>
                {moment(scoreDetails?.detail?.DateTime).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </label>
              <p>
                {scoreDetails?.detail?.StadiumDetails?.Name}
                {/* <br /> BUF-2.5O/U52.5 */}
              </p>
              <button className={styles.btn}>
                Remind Me
                <BsBellFill className={styles.icon} />
              </button>
            </div>
            <div className={styles.rightCard}>
              <div className={styles.leftSide}>
                <label>{scoreDetails?.detail?.AwayTeam}</label>
                <p>Score: {scoreDetails?.detail?.AwayScore}</p>
              </div>
              {/* <div className={styles.rightSide}>
                <img src={"/images/laImage.svg"} alt="" />
              </div> */}
            </div>
          </div>
          {/* <div
            className={styles.bottomWrapper}
            onClick={(e: any) => togglepopup(e)}
          >
            <img src={"/images/her05.webp"} alt="" />
            <div className={styles.videoLoading}>
              <div className={styles.btnWrapper}>
                <div className={styles.btn}>HIGHLIGHTS</div>
              </div>
              <div className={styles.iconWrapper}>
                <RiPlayFill className={styles.icon} />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ScoreInfoHeader;
