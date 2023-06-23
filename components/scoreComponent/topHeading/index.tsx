import { useSelector } from "react-redux";
import { topHeading } from "./data";
import styles from "./topHeading.module.scss";

const TopHeading = () => {
  const { topHeading } = useSelector((state: any) => state?.home);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.cardWrapper}>
            <div className={styles.heading}>
              <label>TOP HEADING</label>
            </div>
            <div className={styles.card}>
              {topHeading?.map((item, index) => (
                <div
                  key={index}
                  className={styles.subHeading}
                  onClick={() => {
                    window.open(
                      item?.detail?.Url,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  {item?.detail?.Title ? item?.detail?.Title : "-"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeading;
