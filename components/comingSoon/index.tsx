import React from "react";
import styles from "./comingsoon.module.scss";

interface Prop {
  style?: any;
  height?: string;
  width?: string;
  fontSize?: string;
}

const ComingSoon = (prop: Prop) => {
  const { style, height, width, fontSize } = prop;

  return (
    <div className={styles.container} style={style}>
      <div className={styles.wrapper}>
        <img
          style={{
            height: height,
            width: width,
          }}
          src={"./gif/comingSoon.svg"}
          alt=""
        />
        <label style={{ fontSize: fontSize }}>
          Coming <span>Soon</span>
        </label>
      </div>
    </div>
  );
};

export default ComingSoon;
