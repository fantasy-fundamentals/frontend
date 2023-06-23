import React from "react";
import DropDown from "../../_common/Dropdown/DropDown";
import Input from "../../_common/Input/input";
import styles from "./dropDown.module.scss";

interface Props {
  position: string;
  setPosition?: (prop?: any) => void;
  positionOption?: any[];
  season?: string;
  setSeason?: (prop?: any) => void;
  handleDateChange?: (prop?: any) => void;
  setData?: (prop?: any) => void;
  seasonOption?: any[];
  loading?: boolean;
  setWeeks?: (prop?: any) => void;
  weekArray?: any[];
  week?: string;
}
const ScoreDropDown = (prop: Props) => {
  const {
    position,
    setPosition,
    positionOption,
    season,
    setSeason,
    seasonOption,
    handleDateChange,
    setData,
    loading,
    weekArray,
    setWeeks,
    week,
  } = prop;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.middleWrapper}>
          <div className={styles.dropDownWrapper}>
            <label style={{ paddingBottom: "1rem" }}>Week</label>
            <DropDown
              selected={week}
              setSelected={(res: any) => {
                // formik.setFieldValue("team", res);
                // !loading && setData([]);
                setWeeks(res);
              }}
              options={weekArray}
              showRightIcon={false}
              // border
              rightIcon={"/icons/dropDownList.svg"}
            />
          </div>
          <div className={styles.dropDownWrapper}>
            <label style={{ paddingBottom: "1rem" }}>Position</label>
            <DropDown
              selected={position}
              setSelected={(res: any) => {
                !loading && position != res ? setData([]) : null;
                setPosition(res);
                // localStorage.setItem("val", position);
              }}
              options={positionOption}
              showRightIcon={false}
              // border
              rightIcon={"/icons/dropDownList.svg"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDropDown;
