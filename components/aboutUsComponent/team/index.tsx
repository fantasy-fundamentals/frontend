import React from "react";
import styles from "./team.module.scss";
const Team = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.textWrapper}>
            <label>The Team</label>
            <p>
              Since we are just regular guys, we have taken the debt of this
              idea on our own and hired professionals to do the work we cannot
              accomplish. This company has produced many projects currently in
              use and we have a certificate that can be viewed
              <span>“here when available “</span> for an American Approved audit
              firm to verify the code was accomplished and was purged to be
              attacked by hired hackers for this to be cleared for public use.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
