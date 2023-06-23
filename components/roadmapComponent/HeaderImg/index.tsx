import React, { useState } from "react";
import DropDown from "../../_common/Dropdown/DropDown";
import styles from "./headerImg.module.scss";

interface Prop {
  searchCard?: any;
}

//

const HeaderImg = (props: Prop) => {
  const { searchCard } = props;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.mainWrapper}>
          <div className={styles.leftWrapper}>
            Fun<span>DUH</span>mentals Roadmap 2023-24
          </div>
          <div className={styles.rightWrapper}>
            {/* <input
              type="text"
              placeholder="Search player name"
              onChange={(e: any) => searchCard(e)}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderImg;
