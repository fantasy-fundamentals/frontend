import { scoreData, scoreDataTable } from "./data";
import InjuriesTable from "./InjuriesTable";
import styles from "./Injuries.module.scss";
const ScoreInfoInjuries = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <label>Injuries</label>
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

export default ScoreInfoInjuries;
