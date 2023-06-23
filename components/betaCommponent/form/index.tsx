import React from "react";
import Button from "../../_common/Button";
import styles from "./form.module.scss";
import useBetaForm from "./useBetaForm";
const BetaForm = () => {
  const { formik, loading } = useBetaForm();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.card}>
            <label>Email *</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Your email"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.errorStyle}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className={styles.card}>
            <label>Submit your wallet receive address *</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Your answer"
                {...formik.getFieldProps("address")}
              />
            </div>
            {formik.touched.address && formik.errors.address ? (
              <div className={styles.errorStyle}>{formik.errors.address}</div>
            ) : null}
          </div>
          <div className={styles.card}>
            <label>Discord User Name *</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Your answer"
                {...formik.getFieldProps("name")}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className={styles.errorStyle}>{formik.errors.name}</div>
            ) : null}
          </div>
          <Button name="Submit" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default BetaForm;
