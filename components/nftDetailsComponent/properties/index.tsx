import React from "react";
import DropDownTab from "../../_common/DropDownTab";
import styles from "./properties.module.scss";
type Props = {
  attributes?: any;
};
const Properties = (props: Props) => {
  return (
    <DropDownTab
      title="Properties"
      headerStyle={{ backgroundColor: "black" }}
      changeStyle={true}
    >
      <div className={styles.properties}>
        <div className={styles.cardWrapper}>
          {[Array(10)].map((item: any, index: any) => (
            <div className={styles.card} key={index}>
              <label>{item.trait_type}</label>
              <span></span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </DropDownTab>
  );
};

export default Properties;
