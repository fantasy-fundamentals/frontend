import React, { useState } from "react";
import Button from "../../../_common/Button";
import DropDown from "../../../_common/Dropdown/DropDown";
import Input from "../../../_common/Input/input";
import styles from "./language.module.scss";
const LanguageComponent = () => {
  const [filterBy, setFilterBy] = useState("English (United States)");
  const filterOptions = ["English (United States)", "Urdu"];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <label>Default Language</label>
          <p>Select your default Language below.</p>
        </div>
        <div className={styles.DropDownWrapper}>
          <div className={styles.dropDownHeading}>
            <label>Language</label>
          </div>
          <DropDown
            selected={filterBy}
            setSelected={setFilterBy}
            options={filterOptions}
            showRightIcon={true}
          />
        </div>
        <div className={styles.bottomWrapper}>
          <label>
            Your Default Currency is:&nbsp;
            <span>English (United States)</span>
          </label>
        </div>
        <Button name="Save" />
      </div>
    </div>
  );
};

export default LanguageComponent;
