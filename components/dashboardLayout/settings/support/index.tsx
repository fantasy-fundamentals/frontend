import { RotatingLines } from "react-loader-spinner";
import DropDown from "../../../_common/Dropdown/DropDown";
import Input from "../../../_common/Input/input";
import styles from "./support.module.scss";
import useSupport from "./useSupport";
const SupportComponent = () => {
  const { formik, loading, setFilterBy, filterBy, filterOptions, fileCheck } =
    useSupport();

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
        <div className={styles.headingWrapper}>
          <label>Email Us</label>
          <p>
            Simply email us at <span>support@theduh.com</span>
          </p>
          <span>Or fill out this form, we'll quickly get back to you</span>
        </div>
        <div className={styles.imageWrapper}>
          <input
            type="file"
            key={fileCheck && formik?.values?.image}
            onChange={(ev: any) => {
              formik.setFieldValue("image", ev?.target?.files);
            }}
            accept="image/*"
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.DropDownWrapper}>
              <div className={styles.dropDownHeading}>
                <label>Subject</label>
              </div>
              <DropDown
                selected={filterBy}
                setSelected={(val: any) => {
                  formik.setFieldValue("subject", val), setFilterBy(val);
                }}
                options={filterOptions}
                showRightIcon={false}
                rightIcon={"/icons/dropDownList.svg"}
              />
              {formik.errors.subject || formik.touched.subject ? (
                <div className={styles.errorStyle}>{formik.errors.subject}</div>
              ) : null}
            </div>
            <Input
              Name="Full Name"
              type="text"
              placeholder="Enter your full name"
              config={formik.getFieldProps("name")}
            />
            {formik.errors.name || formik.touched.name ? (
              <div className={styles.errorStyle}>{formik.errors.name}</div>
            ) : null}
            <Input
              Name="Email"
              type="email"
              placeholder="Enter your email address"
              config={formik.getFieldProps("email")}
            />
            {formik.errors.email || formik.touched.email ? (
              <div className={styles.errorStyle}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className={styles.rightWrapper}>
            <div className={styles.textAreaWrapper}>
              <div className={styles.textAreaHeading}>
                <label>Message</label>
              </div>
              <textarea
                placeholder="Enter your message here"
                {...formik.getFieldProps("message")}
              />
            </div>
            {formik.errors.message || formik.touched.message ? (
              <div className={styles.errorStyle}>{formik.errors.message}</div>
            ) : null}
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button type="submit" disabled={loading}>
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

export default SupportComponent;
