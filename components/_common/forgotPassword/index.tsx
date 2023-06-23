import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { ImFacebook, ImGoogle } from "react-icons/im";
import styles from "./forgotPassword.module.scss";
import useForgotPassword from "./useForgotPassword";
import ConfirmCode from "./confirmCode";
import ChangePassword from "./changePassword";
import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";

interface props {
  onClickSignUp?: (prop?: any) => void;
  setActiveModal?: (prop?: any) => void;
  popupvisible?: Function;
}
const ForgotPassword = (prop: props) => {
  const { onClickSignUp, popupvisible, setActiveModal } = prop;
  const {
    showPass,
    setShowPass,
    formik,
    setScreenActive,
    screenActive,
    loading,
    email,
  } = useForgotPassword(popupvisible, setActiveModal);
  const [saveAuthToken, setSaveAuthToken] = useState("");

  return (
    <>
      {screenActive === 0 ? (
        <div className={styles.container}>
          <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
            <div className={styles.headingWrapper}>
              <label>Forgot Password</label>
            </div>
            <div className={styles.inputWrapper}>
              <label>Email</label>
              <div className={styles.inputStyle}>
                <MdEmail className={styles.icon} />
                <input
                  autoFocus
                  placeholder="Email"
                  type="text"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className={styles.errorStyle}>{formik.errors.email}</div>
              ) : null}
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
                <button type="submit">Forgot</button>
              )}
            </div>
            <div className={styles.account}>
              <label>
                Don’t have an account?{" "}
                <span onClick={onClickSignUp}>Sign up now!</span>
              </label>
            </div>
          </form>
        </div>
      ) : screenActive === 1 ? (
        <ConfirmCode
          setScreenActive={setScreenActive}
          setSaveAuthToken={setSaveAuthToken}
          email={email}
        />
      ) : screenActive === 2 ? (
        <ChangePassword
          setScreenActive={setScreenActive}
          setActiveModal={setActiveModal}
          saveAuthToken={saveAuthToken}
        />
      ) : null}
    </>
  );
};

export default ForgotPassword;
