import React from "react";
import styles from "./blogText.module.scss";

interface Prop {
  blogDetails?: { title?: string; summary?: any };
}
const BlogText = (props: Prop) => {
  const { blogDetails } = props;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <span>{blogDetails?.title}</span>
          <p dangerouslySetInnerHTML={{ __html: blogDetails?.summary }}></p>
        </div>
      </div>
    </div>
  );
};

export default BlogText;
