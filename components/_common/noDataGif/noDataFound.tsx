import styles from "./noData.module.scss";
interface Props {
  style?: any;
  fontSize?: string;
}
const NoDataFound = (prop: Props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img src={"/gif/noDataFound.gif"} alt="" style={prop.style} />
          <label style={{ fontSize: `${prop.fontSize}` }}>NO Data Found</label>
        </div>
      </div>
    </>
  );
};

export default NoDataFound;
