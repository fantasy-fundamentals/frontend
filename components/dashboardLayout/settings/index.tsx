import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LanguageComponent from "./language";
import PrivacyPolicy from "./policy";
import styles from "./scoreTabs.module.scss";
import SupportComponent from "./support";

function SettingsComponent() {
  const location = useRouter();
  const [activeTab, setActiveTab] = useState("Support");

  useEffect(() => {
    if (location?.query?.name === "policy") {
      setActiveTab("policy");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div className={styles.headingWrapper}>
          <div className={styles.heading}>Settings</div>
          <ul className={styles.nav}>
            {/* <li
              onClick={() => setActiveTab("Language")}
              className={activeTab === "Language" ? styles.active : ""}
            >
              Language
            </li> */}

            <li
              onClick={() => setActiveTab("Support")}
              className={activeTab === "Support" ? styles.active : ""}
            >
              Support
            </li>
            <li
              onClick={() => setActiveTab("policy")}
              className={activeTab === "policy" ? styles.active : ""}
            >
              Privacy policy
            </li>
          </ul>
        </div>

        <div className="outlet">
          {/* {activeTab === "AFC" && <ScoreTabl tableData={scoreData} />} */}
          {/* {activeTab === "NFC" && <ScoreTabl tableData={scoreData} />} */}
          {/* {activeTab === "Language" && <LanguageComponent />} */}
          {activeTab === "Support" && <SupportComponent />}
          {activeTab === "policy" && <PrivacyPolicy />}
        </div>
      </div>
    </div>
  );
}

export default SettingsComponent;
