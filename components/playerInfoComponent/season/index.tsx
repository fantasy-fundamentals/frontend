import React from "react";
import styles from "./season.module.scss";
const PlayerInfoSeason = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <label>2022 Season</label>
        </div>
        <div className={styles.tableWrapper}>
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>APPEARANCES</th>
                <th>SCORING</th>
                <th>TACKLE BREAKS</th>
                <th>POST CONTACT METRES</th>
                <th>AVERAGE HIT UPS</th>
                <th>PASSING OFFLOADS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>59</td>
                <td>0</td>
                <td>20</td>
                <td>744.7</td>
                <td>13.7</td>
                <td>17</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoSeason;
