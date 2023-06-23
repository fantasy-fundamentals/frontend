import React from "react";
import BarChart from "../../../_common/BarChart/BarChart";
import data from "./data";
import styles from "./graph.module.scss";
const DashboardGraph = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <label>
            TOP PERFORMING <span>PlAYERS</span>
          </label>
        </div>
        <div className={styles.graphWrapper}>
          <BarChart styles={{ height: "379px" }} dataKey="uv" data={data} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
