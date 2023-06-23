import React from "react";
import styles from "./fantasyGear.module.scss";

interface Props {
  key?: string | number;
  img?: string;
  heading?: string;
  amount?: string | number;
  onClick?: (prop?: any) => void;
  btn?: string;
}
const FantasyGearCard = (prop: Props) => {
  const { key, img, heading, amount, onClick, btn } = prop;
  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img src={img} alt="" />
      </div>
      <hr />
      <div className={styles.content}>
        <label>{heading}</label>
        <span>{amount}</span>
      </div>
      <div className={styles.btnWrapper}>
        <button onClick={onClick}>{btn}</button>
      </div>
    </div>
  );
};

export default FantasyGearCard;
