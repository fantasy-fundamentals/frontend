import React from "react";
import styles from "./heading.module.scss";
import ReactPlayer from "react-player";
const BetaHeading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <label>
          CLOSE BETA IS <span>LIVE</span>
        </label>
        <h4>
          Close Beta is only available on desktop as NAMI wallet doesn't support
          cell-phone devices
        </h4>
        <p>
          Register now using the form and be in the first 50 volunteers who will
          test and play the game with us. This closed beta will simulate an
          entire NFL season starting on the 6th and progress each day for
          Eighteen consecutive days acting as a week In each 24 hour period. Feb
          24th will be the 18th week and conclude the test. The results will
          stay up until the 25th which will reset and start the port onto the
          main net. NOTE: this reset is not indicative to the game and will
          never reset at any time when on the MAIN net <br />
          <br />
          All 50 members will be awarded random NFTs of great worth to have a
          lead in the game on the launch in April 2023. Also the players
          involved will also be competing for a DeAndre Hopkins Signed Jersey, (
          OR ) 250 ada. To qualify make sure you are in our discord and your
          username is listed on the form. ( If you wish to wave these rewards
          you can leave blank and you will participate in the closed beta
          without possibility of rewards) all players Must use TA funds before
          February 9th, and must make at least one trade during the event. HAVE
          fun .. DUH !! and we wish you all the best of luck
        </p>
        <ReactPlayer
          url="https://youtu.be/hg-XZ80RGU4"
          controls={true}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default BetaHeading;
