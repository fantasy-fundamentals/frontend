import React from "react";
import DropDownTab from "../../_common/DropDownTab";
import styles from "./offers.module.scss";
const Offres = () => {
  return (
    <div className={styles.dropDownWrapper}>
      <DropDownTab
        title="Price History"
        headerStyle={{ backgroundColor: "black" }}
      >
        <table cellSpacing="0">
          <tbody>
            <tr>
              <th>Price</th>
              <th>USD Price</th>
              <th>Name</th>
              <th>From</th>
              <th></th>
            </tr>
            {[...Array(1)].map((index) => (
              <tr key={index}>
                <td>
                  <img src={"/icons/cardano.svg"} alt="" /> -
                </td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <button>No result to buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DropDownTab>
    </div>
  );
};

export default Offres;
