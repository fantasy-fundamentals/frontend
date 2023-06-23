import NoDataFound from "../../../_common/noDataGif/noDataFound";
import styles from "./scoringTable.module.scss";
interface props {
  scoreData?: any[];
  name?: string;
}
const ScoringTableComponent = (prop: props) => {
  const { name, scoreData } = prop;
  return (
    <div className={styles.wrapper}>
      <div className={styles.headingWrapper}>
        <label>{name}</label>
      </div>
      {scoreData?.length === 0 ? (
        <NoDataFound />
      ) : (
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>Scoring Details</th>
              <th>Touchdowns Scored</th>
            </tr>
          </thead>
          {scoreData?.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item?.ScoringDetails ? item?.ScoringDetails : "-"}</td>
                <td>{item?.TouchdownsScored ? item?.TouchdownsScored : "-"}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default ScoringTableComponent;
