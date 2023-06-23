import React from "react";
import styles from "./blogHeader.module.scss";

interface Prop {
  blogDetails?: { mediaUrl?: string };
}
const BlogHeader = (props: Prop) => {
  const { blogDetails } = props;
  return (
    <div className={styles.container}>
      <div
        className={styles.wrapper}
        style={{ backgroundImage: `url(${blogDetails?.mediaUrl})` }}
      >
        {/* <img src={blogDetails?.mediaUrl} alt="" /> */}
        <div className={styles.imgOver}></div>
      </div>
    </div>
  );
};

export default BlogHeader;
