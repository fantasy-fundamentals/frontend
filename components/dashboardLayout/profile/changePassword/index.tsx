import React from "react";
import styles from "./changePassword.module.scss";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import useChangePassword from "./useChangePassword";
import { RotatingLines } from "react-loader-spinner";
const ChangePassword = () => {
  const {
    showPass,
    setShowPass,
    setShowRepPass,
    setShowOldPass,
    showOldPass,
    showRepPass,
    formik,
    loading,
  } = useChangePassword();
  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
        <div className={styles.headingWrapper}>
          <label>Change Password</label>
        </div>
        <div className={styles.inputWrapper}>
          <label>Old Password</label>
          <div className={styles.inputStyle}>
            <MdVpnKey className={styles.icon} />
            <input
              placeholder="Password"
              type={showOldPass ? "text" : "password"}
              {...formik.getFieldProps("oldPassword")}
            />
            {showOldPass ? (
              <BsEyeSlashFill
                className={styles.pIcon}
                onClick={() => setShowOldPass(!showOldPass)}
              />
            ) : (
              <BsEyeFill
                className={styles.pIcon}
                onClick={() => setShowOldPass(!showOldPass)}
              />
            )}
          </div>
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <div className={styles.errorStyle}>{formik.errors.oldPassword}</div>
          ) : null}
        </div>
        <div className={styles.inputWrapper}>
          <label>Password</label>
          <div className={styles.inputStyle}>
            <MdVpnKey className={styles.icon} />
            <input
              placeholder="Password"
              type={showPass ? "text" : "password"}
              {...formik.getFieldProps("password")}
            />
            {showPass ? (
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
            {showRepPass ? (
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
          <button type={loading ? "button" : "submit"}>
            {loading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="18"
                visible={true}
              />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
