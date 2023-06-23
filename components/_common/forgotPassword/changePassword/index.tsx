import styles from "./changePassword.module.scss";
import useConfirmCode from "./useChangePassword";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";

interface props {
  onClickSignUp?: (prop?: any) => void;
  setScreenActive?: (prop?: any) => void;
  setActiveModal?: (prop?: any) => void;
  setEmail?: (prop?: any) => void;
  popupvisible?: Function;
  saveAuthToken?: string;
}
const ChangePassword = (prop: props) => {
  const {
    onClickSignUp,
    popupvisible,
    setActiveModal,
    setScreenActive,
    saveAuthToken,
    setEmail,
  } = prop;
  const {
    showPass,
    setShowPass,
    setShowRepPass,
    setShowOldPass,
    showOldPass,
    showRepPass,
    formik,
    loading,
  } = useConfirmCode(popupvisible, setActiveModal, saveAuthToken);

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
        <div className={styles.headingWrapper}>
          <label>Change Password</label>
        </div>

        <div className={styles.inputWrapper}>
          <label>New Password</label>
          <div className={styles.inputStyle}>
            <MdVpnKey className={styles.icon} />
            <input
              autoFocus
              placeholder="New Password"
              type={showPass ? "text" : "password"}
              {...formik.getFieldProps("password")}
            />
            {!showPass ? (
              <BsEyeSlashFill
                className={styles.pIcon}
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <BsEyeFill
                className={styles.pIcon}
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className={styles.errorStyle}>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className={styles.inputWrapper}>
          <label>Repeat Password</label>
          <div className={styles.inputStyle}>
            <MdVpnKey className={styles.icon} />
            <input
              placeholder="Repeat Password"
              type={showRepPass ? "text" : "password"}
              {...formik.getFieldProps("passwordConfirmation")}
            />
            {!showRepPass ? (
              <BsEyeSlashFill
                className={styles.pIcon}
                onClick={() => setShowRepPass(!showRepPass)}
              />
            ) : (
              <BsEyeFill
                className={styles.pIcon}
                onClick={() => setShowRepPass(!showRepPass)}
              />
            )}
          </div>
          {formik?.touched?.passwordConfirmation &&
          formik?.errors?.passwordConfirmation ? (
            <div className={styles.errorStyle}>
              {formik?.errors?.passwordConfirmation}
            </div>
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
            <button type="submit">Change Password</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
