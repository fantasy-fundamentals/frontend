import React, { useState } from "react";
import DropDown from "../../_common/Dropdown/DropDown";
import styles from "./playersHeader.module.scss";

interface Prop {
  searchCard?: any;
}

//

const PlayersHeader = (props: Prop) => {
  const { searchCard } = props;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.mainWrapper}>
          <div className={styles.leftWrapper}>Players</div>
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

export default PlayersHeader;
