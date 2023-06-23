import React from "react";
import Card from "./card";
import styles from "./roadmap.module.scss";
const RoadmapGraph = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.cardWrapper}>
            <Card
              date="1st January 2023"
              img="/images/roadmapImages/WebsitegoesLive.webp"
              heading="Website goes Live"
              subheading="Sports articles "
              subheading2="Fun Merchandise DUH"
              subheading3="Fantasy Sports, Stats and NEWS"
            />
            <div className={styles.borderWrapper} />
          </div>
          <div className={styles.cardWrapper}>
            <Card
              date="27th April 2023"
              img="/images/roadmapImages/Fantasynfl.webp"
              heading="Fantasy nfl"
              subheading="Fantasy NFL Starts"
              subheading2="NFT are fully Liquid"
              subheading3="Draft day Event"
            />
            <div className={styles.borderWrapper} />
          </div>
          <div className={styles.cardWrapper}>
            <Card
              date="5th  Feb 2024"
              img="/images/roadmapImages/FAntasyRacing.webp"
              heading="Fantasy racing"
              subheading="Nascar and indy car NFTs"
              subheading2="NFTs are fully Liquid"
              subheading3="Event for free stuff"
            />
            <div className={styles.borderWrapper} />
          </div>
          <div className={styles.cardWrapper}>
            <Card
              date="15th  June  2024"
              img="/images/roadmapImages/FantasyMMA.webp"
              heading="Fantasy MMA"
              subheading="Fantasy MMA Starts"
              subheading2="NFT are fully Liquid"
              subheading3="Draft day Event"
            />
            <div className={styles.borderWrapper} />
          </div>
        </div>
        <div className={styles.middleWrapper}></div>
        <div className={styles.rightWrapper}>
          <div className={styles.cardWrapper}>
            <div className={styles.borderWrapper} />
            <Card
              date="1st April 2023"
              img="/images/roadmapImages/FantasyGolf.webp"
              heading="Fantasy Golf"
              subheading="Fantasy Golf Starts"
              subheading2="NFTs are fully liquid"
              subheading3="Event for free stuff"
            />
          </div>
          <div className={styles.cardWrapper}>
            <div className={styles.borderWrapper} />
            <Card
              date="30th September 2023"
              img="/images/roadmapImages/FantasyNBA.webp"
              heading="Fantasy NBA"
              subheading="Fantasy NBA Starts"
              subheading2="NFTs are fully liquid"
              subheading3="Event for free stuff"
            />
          </div>
          <div className={styles.cardWrapper}>
            <div className={styles.borderWrapper} />
            <Card
              date="7th April 2024"
              img="/images/roadmapImages/FantasyMLBFantasyMLB.webp"
              heading="Fantasy MLB"
              subheading="Fantasy MLB Starts"
              subheading2="NFTs are fully liquid"
              subheading3="Event for free stuff"
            />
          </div>
          <div className={styles.cardWrapper}>
            <div className={styles.borderWrapper} />
            <Card
              date="End of  2024"
              img="/images/roadmapImages/Soccer.webp"
              heading="Soccer, tennis, nfl,
 and more"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGraph;
