import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { RiUser2Fill } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import styles from "./signUp.module.scss";
import ReCAPTCHA from "react-google-recaptcha";
import useSignUp from "./useSignUp";
import { RECAPTCHA_KEY } from "../../../utilty/constants/walletConstants";

interface props {
  onClick?: (prop?: any) => void;
  setActiveModal?: (prop?: boolean) => void;
}
const SignUp = (prop: props) => {
  const { onClick, setActiveModal } = prop;
  const {
    showPass,
    setShowPass,
    formik,
    setShowRepPass,
    showRepPass,
    loading,
    googlerecaptcha,
    show,
  } = useSignUp(setActiveModal);

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
        <div className={styles.headingWrapper}>
          <label>Sign up</label>
          {/* <p>Enter your Email and new Password</p> */}
        </div>
        <div className={styles.inputWrapper}>
          <label>Name</label>
          <div className={styles.inputStyle}>
            <RiUser2Fill className={styles.icon} />
            <input
              autoFocus
              placeholder="Name"
              type="text"
              {...formik.getFieldProps("name")}
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.errorStyle}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={styles.inputWrapper}>
          <label>Email</label>
          <div className={styles.inputStyle}>
            <MdEmail className={styles.icon} />
            <input
              placeholder="Email"
              type="text"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.errorStyle}>{formik.errors.email}</div>
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
        <ReCAPTCHA
          sitekey={RECAPTCHA_KEY.SITEKEY}
          onChange={(e) => googlerecaptcha(e)}
        />
        {show ? (
          <p style={{ color: "#E5516B" }}>Please verify you are human</p>
        ) : (
          ""
        )}

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
            <button type="submit">Sign Up</button>
          )}
        </div>
        <div className={styles.account}>
          <label>
            Already have an account? <span onClick={onClick}>Login now!</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
