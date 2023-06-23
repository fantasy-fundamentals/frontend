import React from "react";
import styles from "./scoreHeader.module.scss";
const scoreHeader = ({ searchCard }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.mainWrapper}>
          <div className={styles.leftWrapper}>Score</div>
          {/* <input
            type="text"
            placeholder="Search date"
            onChange={(e: any) => searchCard(e)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default scoreHeader;
