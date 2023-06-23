import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdEmail, MdVpnKey } from "react-icons/md";
import { ImFacebook, ImGoogle } from "react-icons/im";
import styles from "./login.module.scss";
import useLogin from "./useLogin";
import { RotatingLines } from "react-loader-spinner";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_KEY } from "../../../utilty/constants/walletConstants";

interface props {
  onClick?: (prop?: any) => void;
  onClickForgot?: (prop?: any) => void;
  popupvisible?: Function;
}
const Login = (prop: props) => {
  const { onClick, onClickForgot, popupvisible } = prop;
  const { showPass, setShowPass, formik, loading, googlerecaptcha, show } =
    useLogin(popupvisible);

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
        <div className={styles.headingWrapper}>
          <label>Log in</label>
          {/* <p>Enter your Email and Password</p> */}
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
          <div className={styles.forgot}>
            <label onClick={onClickForgot}>Forgot password?</label>
          </div>
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
              "Login"
            )}
          </button>
        </div>
        <div className={styles.account}>
          {/* <div className={styles.borderWrapper}>
            <div className={styles.border} />
            Or
            <div className={styles.border} />
          </div> */}
          {/* <div className={styles.socialIcons}>
            <div className={styles.icon}>
              <ImFacebook />
            </div>
            <div className={styles.icon}>
              <ImGoogle />
            </div>
          </div> */}
          <label>
            Don’t have an account? <span onClick={onClick}>Sign up now!</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
