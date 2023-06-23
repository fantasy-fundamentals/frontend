import NoDataFound from "../../../_common/noDataGif/noDataFound";
import styles from "./summary.module.scss";
interface props {
  summaryData?: any[];
  name?: string;
}
const PlayerInfoSummery = (prop: props) => {
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
              <th>Team</th>
              <th>Season Type</th>
              <th>Fantasy Points</th>
              <th>Sacks</th>
              <th>Assisted Tackles</th>
            </tr>
          </thead>
          {summaryData?.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item?.Team}</td>
                <td>
                  {/* <img src={item?.img} alt="" /> &nbsp; */}
                  {item?.SeasonType}
                </td>
                <td>
                  <label>{item?.FantasyPoints}</label>
                  {/* {item?.w} */}
                </td>
                <td>{item?.Sacks}</td>
                <td>{item?.AssistedTackles}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default PlayerInfoSummery;
