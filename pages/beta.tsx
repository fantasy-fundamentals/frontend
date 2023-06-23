import React from "react";
import BetaAddress from "../components/betaCommponent/address";
import BetaForm from "../components/betaCommponent/form";
import BetaHeading from "../components/betaCommponent/heading";
import styles from "../styles/beta.module.scss";
const Beta = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftWrapper}>
            <BetaHeading />
          </div>
          <div className={styles.rightWrapper}>
            <BetaAddress />
            <BetaForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Beta;
