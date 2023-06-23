import React, { useState } from "react";
import styles from "./career.module.scss";
import { RiPlayFill } from "react-icons/ri";
import ReactPlayer from "react-player";
import Modal from "../../_common/modal";

interface Props {
  playersDetails?: any;
}
const PlayerInfoCareer = (prop: Props) => {
  const [popupvisible, setpopupvisible] = useState(false);
  const togglepopup = (e: any) => {
    e.preventDefault();
    setpopupvisible((preview) => !preview);
  };
  return (
    <>
      {/* <Modal
        visible={popupvisible}
        showModal2
        onClose={() => setpopupvisible(false)}
      >
        <ReactPlayer
          url={prop?.playersDetails?.nft?.meta?.videoUrl}
          playing={true}
          controls={true}
          width="100%"
          height="400px"
        />
      </Modal> */}
      <div className={styles.container}>
        {/* <div
          className={styles.videoWrapper}
          onClick={(e: any) => {
            prop?.playersDetails?.nft?.meta?.videoUrl && togglepopup(e);
          }}
        >
          <div className={styles.videoLoading}>
            <div className={styles.btnWrapper}>
              <div className={styles.btn}>HIGHLIGHTS</div>
            </div>

            <div className={styles.iconWrapper}>
              {prop?.playersDetails?.nft?.meta?.videoUrl ? (
                <RiPlayFill className={styles.icon} />
              ) : (
                <span>No Video Available</span>
              )}
            </div>
          </div>
        </div> */}
        <div className={styles.wrapper}>
          <div className={styles.headingWrapper}>
            <label>Career</label>
          </div>
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>APPEARANCES</th>
                <th>TRIES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>59</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PlayerInfoCareer;
