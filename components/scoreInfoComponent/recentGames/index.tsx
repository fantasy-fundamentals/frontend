import { scoreData, scoreDataTable } from "./data";
import InjuriesTable from "./recentGamesTable";
import styles from "./ScoreInfoRecentGames.module.scss";
const ScoreInfoRecentGames = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <label>
            Recent <span>Games</span>
          </label>
        </div>
        <div className={styles.tableWrapper}>
          <InjuriesTable
            // headingImg={"/images/BUFImage.svg"}
            tableData={scoreData}
            heading="Buffalo Bills"
          />
          <InjuriesTable
            // headingImg={"/images/laImage.svg"}
            tableData={scoreDataTable}
            heading="Los Angeles Rams"
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreInfoRecentGames;
