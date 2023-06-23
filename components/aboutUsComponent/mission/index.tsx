import React from "react";
import styles from "./mission.module.scss";
const Mission = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftWrapper}>
            <img src={"/images/Rectangle 11.webp"} alt="" />
          </div>
          <div className={styles.rightWrapper}>
            <label>The Mission</label>
            <p>
              Our mission is to reach a variety of people whether they are
              interested in fantasy football or not. We periodically offer free
              items for all to enjoy. Our successful algorithm that predicts
              sports betting lines on betting websites is always given away for
              free . Our articles are also free and most sports publications are
              either created by A.I. or people who must be careful on what they
              say because of contracts, outside interests, as well as sponsors,
              for this reason many writers have lost or quit their jobs and we
              provide a platform for them to speak their mind completely free
              and clear without interruption. As you can see, we just want to
              provide sports enthusiasts like us to be able to play fantasy
              games, read articles, and speak to other enthusiasts on a platform
              that will never manipulate information or charge fees to exclude
              lower income members. We believe the money will come by providing
              a sound product while having fun with it when the time comes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mission;
