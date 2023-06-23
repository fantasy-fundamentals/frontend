import React from "react";
import styles from "./maintenanceMode.module.scss";
const MaintenanceMode = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img src="/logo.svg" alt="" />
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>We'll be back soon!</div>
            <div className={styles.subHeading}>
              Sorry for the inconvenience, Our website is currently under going
              maintenance and will back online shortly!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenanceMode;
