import React from "react";
import styles from "./headerHeading.module.scss";
const HeaderHeading = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftWrapper}>
            <label>The Start</label>
            <p>
              It all started with a group of friends who launched THEDUH.COM, a
              website for The Fantasy FunDUHmentals. These enthusiasts started a
              YouTube channel for fantasy players to get an extra edge. We have
              created our own algorithms and charts that have been successful in
              projecting future player statistics in fantasy. Since we started,
              we’ve been playing on multiple platforms like DraftKings, FanDuel
              and Underdogs to name a few. Playing on these platforms and
              talking with the fantasy community has allowed us to understand
              what players truly want and has led us to develop a completely new
              way to play fantasy sports.
            </p>
          </div>
          <div className={styles.rightWrapper}>
            <img src={"/images/aboutHeader.webp"} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderHeading;
