import React from "react";
import NoDataFound from "../../../_common/noDataGif/noDataFound";
import styles from "./recentGamesTable.module.scss";

interface prop {
  tableData?: any[];
  heading?: string;
  headingImg?: any;
}
const RecentGamesTable = (props: prop) => {
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
        tableData?.map((item, index) => (
          <table key={index} cellSpacing="0">
            <tbody key={index}>
              <tr>
                <td>
                  {item.date} &nbsp;&nbsp;{item.vs}&nbsp;&nbsp;
                  {/* <img src={item?.img} alt="" /> &nbsp;&nbsp;  */}
                  {item?.heading}
                </td>
                <td style={{ color: item?.status === "W" ? "green" : "red" }}>
                  {item?.status}
                </td>
                <td>{item?.run}</td>
              </tr>
            </tbody>
          </table>
        ))
      )}
    </div>
  );
};

export default RecentGamesTable;
