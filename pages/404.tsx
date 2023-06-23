import styles from "../styles/notFound.module.scss";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.Wrapper}>
        <div className={styles.HeadingWrapper}>
          <img
            src={"/images/errorImg.svg"}
            alt=""
            className={styles.imgWrapper}
          />
          <div className={styles.heading}>Page Not Found</div>
          <div className={styles.subHeading}>
            Looks Like you’re lost in space
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
