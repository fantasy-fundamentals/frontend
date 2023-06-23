import React from "react";
import styles from "./shopHeader.module.scss";
const ShopHeader = ({ searchCard }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.mainWrapper}>
          <div className={styles.leftWrapper}>
            Fantasy FUNDUHMENTALS Gear Shop
          </div>
          {/* <input
            type="text"
            placeholder="Search name"
            onChange={(e: any) => searchCard(e)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
