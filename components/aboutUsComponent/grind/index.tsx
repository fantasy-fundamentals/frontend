import React from "react";
import styles from "./grind.module.scss";
const Grind = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.textWrapper}>
            <label>The Grind</label>
            <p>
              We tried over and over to find the perfect algorithm and play
              style for “the user”. This came through years of trial and error.
              Now, we can’t guarantee you the million-dollar payout like these
              other sites, however we can guarantee you to never have a balance
              of $0. You will NEVER be eliminated and always have a chance, and
              you don’t need a fat wallet to function on a weekly basis. Our
              game is built on top of the block chain, this doesn’t mean we care
              about crypto, or even believe in it, we are just simply using it
              for what it has never failed at, secure transactions with low
              fees. If you believe in cryptocurrency then you will be able to do
              all that fun stuff that is available, however if you don’t
              understand it, that’s fine because we are just using it for
              backend security so that your moves will be guaranteed. There is
              no repercussion if our plan fails, you will still be able to
              access your account and the money in it. You hold your own keys to
              your wallet, and your NFT holds the key to your NFT wallet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grind;
