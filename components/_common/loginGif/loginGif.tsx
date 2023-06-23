import React from "react";
import styles from "./loginGif.module.scss";
interface Props {
  name: string;
}
const LoginGif = (prop: Props) => {
  const { name } = prop;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src={"/gif/loginGif.gif"} alt="" draggable={false} />
        <p>{name}</p>
      </div>
    </div>
  );
};

export default LoginGif;
