import React from "react";
import NoDataFound from "../../../_common/noDataGif/noDataFound";
import styles from "./table.module.scss";

interface Prop {
  tableData?: any[];
}
const ScoreTabl = (props: Prop) => {
  const { tableData } = props;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {tableData?.length === 0 ? (
          <NoDataFound />
        ) : (
          tableData?.map((item, index) => (
            <table key={index} cellSpacing="0">
              <thead>
                <tr>
                  <th>{item?.heading}</th>
                  <th>W</th>
                  <th>L</th>
                  <th>T</th>
                  <th>Pct</th>
                </tr>
              </thead>
              {item?.innerData?.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      {/* <img src={item?.img} alt="" /> &nbsp; */}
                      {item?.name}
                    </td>
                    <td>{item?.w}</td>
                    <td>{item?.l}</td>
                    <td>{item?.t}</td>
                    <td>{item?.pct}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          ))
        )}
      </div>
    </div>
  );
};

export default ScoreTabl;
