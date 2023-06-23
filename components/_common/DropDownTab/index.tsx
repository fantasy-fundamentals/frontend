import React, { Children, useState } from "react";
import styles from "./index.module.scss";

interface Props {
  children?: any;
  title?: string;
  style?: any;
  headerStyle?: any;
  changeStyle?: boolean;
}
const DropDownTab = (prop: Props) => {
  const { children, title, style, headerStyle, changeStyle } = prop;
  const [active, setActive] = useState(true);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.headerWrapper} style={headerStyle}>
            <div className={styles.leftWrapper}>{title}</div>
            <div
              className={styles.rightWrapper}
              onClick={() => setActive(!active)}
            >
              <img
                className={active ? styles.imgActive : styles.imgNotActive}
                src={"/icons/down.svg"}
                alt=""
              />
            </div>
          </div>
          {active ? (
            <div
              className={
                changeStyle ? styles.changeStyle : styles.bottomWrapper
              }
              style={style}
            >
              {children}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default DropDownTab;
