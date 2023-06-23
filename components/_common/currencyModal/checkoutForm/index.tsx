import { MdOutlineDateRange } from "react-icons/md";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import styles from "./checkoutForm.module.scss";
import useCheckout from "./useCheckout";
import { RotatingLines } from "react-loader-spinner";

interface props {}
const CheckoutForm = (prop: props) => {
  const {} = prop;
  const { showPass, setShowPass, formik, loading } = useCheckout();

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
        <div className={styles.headingWrapper}>
          <label>Checkout</label>
          {/* <p>Enter your Email and Password</p> */}
        </div>
        <div className={styles.inputWrapper}>
          <label>Card Number</label>
          <div className={styles.inputStyle}>
            <BsFillCreditCardFill className={styles.icon} />
            <input
              placeholder="Card Number"
              type="text"
              {...formik.getFieldProps("cardNumber")}
              maxLength={16}
              autoComplete="off"
            />
          </div>
          {formik.touched.cardNumber && formik.errors.cardNumber ? (
            <div className={styles.errorStyle}>{formik.errors.cardNumber}</div>
          ) : null}
        </div>
        <div className={styles.inputWrapper}>
          <label>Name on the Card</label>
          <div className={styles.inputStyle}>
            <FaUserTie className={styles.icon} />
            <input
              placeholder="Name"
              type="text"
              {...formik.getFieldProps("name")}
              autoComplete="off"
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.errorStyle}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={styles.middleWrapper}>
          <div className={styles.inputWrapper}>
            <label>Expiry</label>
            <div className={styles.inputStyle}>
              <MdOutlineDateRange className={styles.icon} />
              <input
                placeholder="Expiry"
                type="text"
                {...formik.getFieldProps("expiry")}
                maxLength={4}
                autoComplete="off"
              />
            </div>
            {formik.touched.expiry && formik.errors.expiry ? (
              <div className={styles.errorStyle}>{formik.errors.expiry}</div>
            ) : null}
          </div>
          <div className={styles.inputWrapper}>
            <label>CVV</label>
            <div className={styles.inputStyle}>
              <BsFillCreditCard2FrontFill className={styles.icon} />
              <input
                placeholder="CVV"
                type="text"
                {...formik.getFieldProps("cvv")}
                maxLength={4}
                autoComplete="off"
              />
            </div>
            {formik.touched.cvv && formik.errors.cvv ? (
              <div className={styles.errorStyle}>{formik.errors.cvv}</div>
            ) : null}
          </div>
        </div>

        <div className={styles.btnWrapper}>
          {loading ? (
            <button>
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="18"
                visible={true}
              />
            </button>
          ) : (
            <button type="submit">Purchase</button>
          )}
        </div>
        {/* <div className={styles.account}>
        
          <label>
            Don’t have an account? <span>Sign up now!</span>
          </label>
        </div> */}
      </form>
    </div>
  );
};

export default CheckoutForm;
