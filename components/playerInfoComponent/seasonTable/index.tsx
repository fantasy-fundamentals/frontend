import AttackTableComponent from "./attack";
import PlayerInfoCareerSummery from "./careerSummary";
import KickingTableComponent from "./KICKING";
import ScoringTableComponent from "./scoring";
import styles from "./seasonTable.module.scss";
import PlayerInfoSummery from "./summary";

interface Props {
  heading?: string;
  summeryName?: string;
  summaryData?: any[];
  scoringName?: string;
  scoreData?: any[];
  KickingName?: string;
  kickingData?: any[];
  attackName?: string;
  playerData?: any[];
  career?: boolean;
  tableHeading?: any[];
  type?: string;
}
const SeasonTableComponent = (prop: Props) => {
  const {
    heading,
    summeryName,
    summaryData,
    scoringName,
    scoreData,
    KickingName,
    kickingData,
    attackName,
    playerData,
    tableHeading,
    career,
    type,
  } = prop;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <label>{heading}</label>
        </div>
        <div className={styles.tableWrapper}>
          {/* <div className={styles.topSummaryWrapper}>
            {career ? (
              <PlayerInfoCareerSummery
                name={summeryName}
                summaryData={summaryData}
              />
            ) : (
              <PlayerInfoSummery name={summeryName} summaryData={summaryData} />
            )}
            <ScoringTableComponent name={scoringName} scoreData={scoreData} />
          </div> */}
          <div className={styles.bottomSummaryWrapper}>
            {/* <KickingTableComponent
              name={KickingName}
              kickingData={kickingData}
            /> */}
            <AttackTableComponent
              name={attackName}
              playerData={playerData}
              tableHeading={tableHeading}
              heading={heading}
              type={type}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonTableComponent;
