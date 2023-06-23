import React from "react";
import styles from "./card.module.scss";

interface PropInterface {
  date: string;
  img: string;
  heading: string;
  subheading?: string;
  subheading2?: string;
  subheading3?: string;
}
const Card = (prop: PropInterface) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.dateWrapper}>
          <label>{prop.date}</label>
        </div>
        <img src={prop.img} alt="" />
        <div className={styles.textWrapper}>
          <div className={styles.mainHeading}>{prop.heading}</div>
          <label>{prop.subheading}</label>
          <label>{prop.subheading2}</label>
          <label>{prop.subheading3}</label>
        </div>
      </div>
    </div>
  );
};

export default Card;
