import { useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./confirmCode.module.scss";
import useConfirmCode from "./useConfirmCode";

interface props {
  onClickSignUp?: (prop?: any) => void;
  setScreenActive?: (prop?: any) => void;
  setSaveAuthToken?: (prop?: any) => void;
  email?: any;
  setActiveModal?: Function;
  popupvisible?: Function;
}
const ConfirmCode = (prop: props) => {
  const {
    onClickSignUp,
    popupvisible,
    setActiveModal,
    setScreenActive,
    setSaveAuthToken,
    email,
  } = prop;
  const {
    showPass,
    setShowPass,
    handleSubmit,
    loading,
    secRef,
    theRef,
    fourRef,
    ChangeHandler,
  } = useConfirmCode(popupvisible, setScreenActive, setSaveAuthToken, email);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <label>Confirmation Pin</label>
        </div>
        <div className={styles.inputWrapper}>
          <label>Please enter it in the field below.</label>
          <div className={styles.inputStyle}>
            <input
              placeholder="-"
              type="text"
              autoFocus
              maxLength={1}
              minLength={1}
              onChange={(e: any) => ChangeHandler(e)}
              name="numberOne"
            />
            <input
              placeholder="-"
              type="text"
              maxLength={1}
              minLength={1}
              ref={secRef}
              onChange={(e: any) => ChangeHandler(e)}
              name="numberTwo"
            />
            <input
              placeholder="-"
              type="text"
              maxLength={1}
              minLength={1}
              ref={theRef}
              name="numberThree"
              onChange={(e: any) => ChangeHandler(e)}
            />
            <input
              ref={fourRef}
              placeholder="-"
              type="text"
              maxLength={1}
              minLength={1}
              name="numberFour"
              onChange={(e: any) => ChangeHandler(e)}
            />
          </div>
        </div>

        <div className={styles.btnWrapper}>
          {loading ? (
            <button type="button">
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="18"
                visible={true}
              />
            </button>
          ) : (
            <button onClick={() => handleSubmit()}>Confirm</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmCode;
