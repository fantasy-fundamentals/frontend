import React from "react";
import styles from "./address.module.scss";
const BetaAddress = () => {
  return (
    <div className={styles.container}>
      <div className={styles.borderWrapper} />
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <label>Wallet Address for closed beta</label>
          <p>
            For all of you who have been waiting and closely following Fantasy
            Funduhmentals, the wait is almost over. We are launching our closed
            Beta and the first 150 people will be invited to use the website and
            help us achieve perfection.
          </p>
        </div>
        <div className={styles.subHeading}>
          <label>How to become part of the closed beta?</label>
          <p>
            It is quite simple, all you need to do is create NAMI wallet and
            submit your wallet address so we can issue test-net assets to you.
            These assets will be used by you guys to purchase, trade, and earn
            rewards. Keep in mind that these are fake assets and closed beta
            rewards will also be fake, but don't FRET. Actual rewards will be
            given to all the people in closed BETA. 
          </p>
        </div>
        <div className={styles.subHeading}>
          <label>How to install NAMI?</label>
          <p>
            Simply go to{" "}
            <a
              href="https://namiwallet.io/"
              target="__blank"
              style={{ color: "#186DE1" }}
            >
              here
            </a>
              and install the extension to your browser. Chrome is suggested for
            closed Beta. Also here is a really cool and informative{" "}
            <a
              href="https://www.youtube.com/watch?v=Vf9Px4dC4eM"
              target="_blank"
              style={{ color: "#186DE1" }}
            >
              video
            </a>{" "}
            made my{" "}
            <a
              href="https://www.youtube.com/@MoneyZG"
              target="__blank"
              style={{ color: "#186DE1" }}
            >
              MoneyZG
            </a>
            . You only need to watch from 1:22 ~ 4:37. 
          </p>
        </div>
        <div className={styles.subHeading}>
          <label>Test Net</label>
          <p>
            Once the wallet is installed go into the settings, by clicking the
            top right profile/Avatar icon on Nami Wallet extension. Then in the
            drop down select settings. From there go to network and then chose
            test-net. A short guide over{" "}
            <a
              href="https://medium.com/astarter/astarter-testnet-nami-wallet-step-by-step-guide-c258f9988e4"
              target="__blank"
              style={{ color: "#186DE1" }}
            >
              here
            </a>{" "}
             by{" "}
            <a
              href="https://medium.com/@AstarterDefiHub"
              target="__blank"
              style={{ color: "#186DE1" }}
            >
              Astarter
            </a>
            .
          </p>
        </div>
        <div className={styles.subHeading}>
          <label>
            Copy your wallet (receive) address and submit down below
          </label>
          <p>
            Once again coming back to Nami Extension, you will see a receive
            button, click on it and copy and paste your receive address down
            below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetaAddress;
