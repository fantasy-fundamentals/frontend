import React, { useState } from "react";
import Button from "../../../_common/Button";
import DropDown from "../../../_common/Dropdown/DropDown";
import Input from "../../../_common/Input/input";
import styles from "./language.module.scss";
import { TbEdit } from "react-icons/tb";
import useLanguage from "./useLanguage";
const LanguageComponent = () => {
  const {
    formik,
    setFilterBy,
    filterBy,
    filterOptions,
    active,
    setActive,
    data,
  } = useLanguage();
  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
        <div className={styles.headingWrapper}>
          <label>Profile</label>
          {active ? (
            <button className={styles.rightWrapper} type="submit">
              <TbEdit className={styles.icon} />
              &nbsp;Update
            </button>
          ) : (
            <div
              className={styles.rightWrapper}
              onClick={() => setActive(!active)}
            >
              <TbEdit className={styles.icon} />
              &nbsp;Edit Profile
            </div>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.leftWrapper}>
            <Input
              Name="Name"
              placeholder="name"
              config={formik.getFieldProps("name")}
              disable={!active}
            />
            {formik.errors.name || formik.touched.name ? (
              <div className={styles.errorStyle}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className={styles.rightWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.headingWrapper}>Email</div>
              <div className={styles.inputWrapper}>
                <div className={styles.inputWrapper}>{data?.email}</div>
              </div>
            </div>
            {/* <Input
              Name="Email"
              placeholder="email"
              value={data?.email}
              config={formik.getFieldProps("email")}
              disable={true}
            /> */}
            {/* {formik.errors.email || formik.touched.email ? (
              <div className={styles.errorStyle}>{formik.errors.email}</div>
            ) : null} */}
          </div>
        </div>
        {/* <div className={styles.DropDownWrapper}>
          <div className={styles.dropDownHeading}>
            <label>Language</label>
          </div>
          <DropDown
            selected={filterBy}
            options={filterOptions}
            setSelected={(val: any) => {
              formik.setFieldValue("language", val), setFilterBy(val);
            }}
            showRightIcon={true}
            disable={!active}
          />
          {formik.errors.language || formik.touched.language ? (
            <div className={styles.errorStyle}>{formik.errors.language}</div>
          ) : null}
        </div> */}
        {/* <div className={styles.bottomWrapper}>
          <label>
            Your Default Language is:&nbsp;
            <span>English (United States)</span>
          </label>
        </div> */}
      </form>
    </div>
  );
};

export default LanguageComponent;
