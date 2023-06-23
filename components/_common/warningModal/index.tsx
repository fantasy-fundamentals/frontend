import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./warningModal.module.scss";

interface Props {
  setpopupvisible?: (props?: any) => void;
  onClick: (props?: any) => void;
  heading: string;
  btn1: string;
  btn2: string;
  loader: boolean;
}
const WarningModal = (prop: Props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <label>{prop.heading}</label>
          <div className={styles.btnWrapper}>
            <button onClick={() => !prop.loader && prop.setpopupvisible(false)}>
              {prop.btn1}
            </button>
            <button onClick={prop.onClick}>
              {prop?.loader ? (
                <RotatingLines
                  strokeColor="#ffff"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="15"
                  visible={true}
                />
              ) : (
                prop?.btn2
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarningModal;
