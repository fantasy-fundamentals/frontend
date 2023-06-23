import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSettings } from "../../../../services/user.services";
import { savePrivacyPolicy } from "../../../../store/reducers/privacyPolicySlice";
import styles from "./policy.module.scss";
const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const { privacyPolicy } = useSelector((state: any) => state.privacyPolicy);

  const handleApiData = async () => {
    try {
      const res = await handleSettings();
      dispatch(savePrivacyPolicy(res?.data?.privacyPolicy));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleApiData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <label>Privacy policy</label> */}
        <p dangerouslySetInnerHTML={{ __html: privacyPolicy }}></p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
