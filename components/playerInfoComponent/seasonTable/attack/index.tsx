import NoDataFound from "../../../_common/noDataGif/noDataFound";
import styles from "./attackTable.module.scss";
interface props {
  playerData?: any[];
  name?: string;
  tableHeading?: any[];
  heading?: string;
  type?: string;
}
const AttackTableComponent = (prop: props) => {
  const { playerData, name, tableHeading, heading, type } = prop;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headingWrapper}>{/* <label>{name}</label> */}</div>
      {playerData?.length === 0 ? (
        <NoDataFound />
      ) : (
        <table cellSpacing="0">
          <thead>
            <tr>
              {tableHeading?.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {heading === "Recent game" ? (
              <>
                {" "}
                <tr>
                  {playerData &&
                    playerData?.map((item, index) => (
                      <td key={index}>{item}</td>
                    ))}
                </tr>
              </>
            ) : (
              <>
                {type === "QB" ? (
                  <>
                    {" "}
                    {playerData &&
                      playerData?.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.Week}</td>
                          <td>{item?.FantasyPoints}</td>
                          <td>{item?.PassingYards}</td>
                          <td>{item?.RushingYards}</td>
                          <td>{item?.Touchdowns}</td>
                          <td>{item?.Interceptions}</td>
                          <td>{item?.FumblesOwnRecoveries}</td>
                          <td>{item?.PassingCompletionPercentage}</td>
                        </tr>
                      ))}{" "}
                  </>
                ) : type === "WR" ? (
                  <>
                    {playerData &&
                      playerData?.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.Week}</td>
                          <td>{item?.FantasyPoints}</td>
                          <td>{item?.PassingYards}</td>
                          <td>{item?.RushingYards}</td>
                          <td>{item?.Touchdowns}</td>
                          <td>{item?.Interceptions}</td>
                          <td>{item?.FumblesOwnRecoveries}</td>
                          <td>{item?.PassingCompletionPercentage}</td>
                        </tr>
                      ))}
                  </>
                ) : type === "RB" ? (
                  <>
                    {playerData &&
                      playerData?.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.Week}</td>
                          <td>{item?.Stadium}</td>
                          <td>{item?.RushingAttempts}</td>
                          <td>{item?.RushingYards}</td>
                          <td>{item?.Touchdowns}</td>
                          <td>-</td>
                          <td>{item?.Interceptions}</td>
                          <td>{item?.ReceivingYards}</td>
                          <td>{item?.ReceivingTouchdowns}</td>
                          <td>{item?.FantasyPoints}</td>
                        </tr>
                      ))}
                  </>
                ) : type === "TE" ? (
                  <>
                    {playerData &&
                      playerData?.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.Week}</td>
                          <td>{item?.FantasyPoints}</td>
                          <td>{item?.PassingYards}</td>
                          <td>{item?.RushingYards}</td>
                          <td>{item?.Touchdowns}</td>
                          <td>{item?.Interceptions}</td>
                          <td>{item?.FumblesOwnRecoveries}</td>
                          <td>{item?.PassingCompletionPercentage}</td>
                        </tr>
                      ))}
                  </>
                ) : (
                  <>
                    {playerData &&
                      playerData?.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.Week}</td>
                          <td>{item?.FantasyPoints}</td>
                          <td>{item?.PassingYards}</td>
                          <td>{item?.RushingYards}</td>
                          <td>{item?.Touchdowns}</td>
                          <td>{item?.Interceptions}</td>
                          <td>{item?.FumblesOwnRecoveries}</td>
                          <td>{item?.PassingCompletionPercentage}</td>
                          <td>{item?.QuarterbackHits}</td>
                        </tr>
                      ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttackTableComponent;
