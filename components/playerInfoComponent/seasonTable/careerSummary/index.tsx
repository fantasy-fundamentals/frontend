import NoDataFound from "../../../_common/noDataGif/noDataFound";
import styles from "./careerSummery.module.scss";
interface props {
  summaryData?: any[];
  name?: string;
}
const PlayerInfoCareerSummery = (prop: props) => {
  const { summaryData, name } = prop;
  return (
    <div className={styles.wrapper}>
      <div className={styles.headingWrapper}>
        <label>{name}</label>
      </div>
      {summaryData?.length === 0 ? (
        <NoDataFound />
      ) : (
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>Round</th>
              <th>Year Start</th>
              <th>Year End</th>
              <th>Played</th>
              <th>Won</th>
              <th>Lost</th>
              <th>Drawn</th>
              <th>Win % </th>
            </tr>
          </thead>
          {summaryData?.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>
                  {/* <img src={item?.img} alt="" /> &nbsp; */}
                  {item?.name}
                </td>
                <td>{item?.start}</td>
                <td>{item?.end}</td>
                <td>{item?.played}</td>
                <td>{item?.won}</td>
                <td>{item?.lost}</td>
                <td>{item?.drawn}</td>
                <td>{item?.win}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default PlayerInfoCareerSummery;
