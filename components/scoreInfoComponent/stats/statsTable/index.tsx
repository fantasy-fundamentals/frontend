import React from "react";
import NoDataFound from "../../../_common/noDataGif/noDataFound";
import styles from "./statsTable.module.scss";

interface prop {
  tableData?: any[];
  heading?: string;
  headingImg?: any;
}
const StatsTable = (props: prop) => {
  const { tableData, headingImg, heading } = props;
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeading}>
        {headingImg && <img src={headingImg} alt="" />}
        {heading}
      </div>
      {tableData?.length === 0 ? (
        <NoDataFound />
      ) : (
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>Home Team</th>
              <th>Away Team</th>
              <th>Over Under</th>
              <th>Point Spread</th>
              <th>Week</th>
              <th>Season</th>
              <th>Stadium</th>
              <th>City</th>
              <th>Country</th>
              <th>State</th>
            </tr>
          </thead>
          {tableData?.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item?.HomeTeam}</td>
                <td>{item?.AwayTeam}</td>
                <td>{item?.OverUnder}</td>
                <td>{item?.PointSpread}</td>
                <td>{item?.Week}</td>
                <td>{item?.Season}</td>
                <td>{item?.StadiumDetails?.Name}</td>
                <td>{item?.StadiumDetails?.City}</td>
                <td>{item?.StadiumDetails?.Country}</td>
                <td>{item?.StadiumDetails?.State}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default StatsTable;
