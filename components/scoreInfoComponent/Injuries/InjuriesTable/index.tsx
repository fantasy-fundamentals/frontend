import React from "react";
import NoDataFound from "../../../_common/noDataGif/noDataFound";
import styles from "./InjuriesTable.module.scss";

interface prop {
  tableData?: any[];
  heading?: string;
  headingImg?: any;
}
const InjuriesTable = (props: prop) => {
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
            <thead>
              <tr>
                <th>{item?.Player}</th>
                <th>{item.POS}</th>
                <th>{item.Status}</th>
                <th>{item.Date}</th>
              </tr>
            </thead>
            {item?.innerData?.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <img src={item?.img} alt="" /> &nbsp; {item?.name}
                  </td>
                  <td>{item?.w}</td>
                  <td>{item?.l}</td>
                  <td>{item?.t}</td>
                </tr>
              </tbody>
            ))}
          </table>
        ))
      )}
    </div>
  );
};

export default InjuriesTable;
