import React from "react";
import styles from "./stats.module.scss";
import { scoreData } from "./data";
import NoDataFound from "../../_common/noDataGif/noDataFound";
import StatsTable from "./statsTable";
const ScoreInfoStats = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <label>Stats</label>
        </div>
        <div className={styles.tableWrapper}>
          <StatsTable
            // headingImg={"/images/BUFImage.svg"}
            tableData={scoreData}
            // heading="Buffalo Bills"
          />
          {/* <StatsTable
            // headingImg={"/images/laImage.svg"}
            tableData={scoreData}
            heading="Los Angeles Rams"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ScoreInfoStats;
