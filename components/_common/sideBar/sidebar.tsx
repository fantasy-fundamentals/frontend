import React from "react";
import styles from "./sideBar.module.scss";
import SideBarNav from "./sideBarNav/sideBarNav";
interface prop {
  children?: any;
}
const Sidebar = (props: prop) => {
  const { children } = props;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <SideBarNav />
        </div>
        <div className={styles.rightWrapper}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
