import React from "react";
import styles from "./playersCard.module.scss";

interface Props {
  cardKey: any;
  heading?: string;
  subHeading?: string;
  img?: string;
  btnName?: string;
  onClick?: (prop: any) => void;
}
const PlayersCard = (prop: Props) => {
  const { cardKey, heading, subHeading, img, btnName, onClick } = prop;
  return (
    <div className={styles.card} key={cardKey}>
      <div className={styles.content}>
        <label>{heading}</label>
        <span>{subHeading}</span>
      </div>
      <img src={img} alt="" />
      <div className={styles.overLay}>
        <div className={styles.text} onClick={onClick}>
          {btnName}
        </div>
      </div>
    </div>
  );
};

export default PlayersCard;
