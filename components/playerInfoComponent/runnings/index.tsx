import React from "react";
import DoughnutChart from "./chart";
import { data } from "./data";
import styles from "./runnings.module.scss";
const PlayerInfoRunnings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.heading}>
              <label>DEFENCE</label>
            </div>
            <div className={styles.peraWrapper}>
              <div className={styles.leftWrapper}>
                <label>TACKLES MADE</label>
                <p>417</p>
              </div>
              <div className={styles.rightWrapper}>
                <label>TACKLE EFFICIENCY</label>
                <div className={styles.cartWrappet}>
                  <DoughnutChart />
                </div>
              </div>
            </div>
          </div>
          {data.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.heading}>
                <label>{item.heading}</label>
              </div>
              <div className={styles.peraWrapper}>
                <div className={styles.leftWrapper}>
                  <label>{item.leftsubHeading}</label>
                  <p>{item.leftPera}</p>
                </div>
                <div className={styles.rightWrapper}>
                  <label>{item.rightSubHeading}</label>
                  <p>{item.rightPera}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoRunnings;
