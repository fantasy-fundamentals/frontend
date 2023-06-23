import React, { useState } from "react";
import style from "./scoreTabs.module.scss";
import ScoreTabl from "./table";
import { scoreData } from "./data";
import NoDataFound from "../../_common/noDataGif/noDataFound";

function ScoreTabs() {
  const [activeTab, setActiveTab] = useState("AFC");
  return (
    <div className={style.container}>
      <div className={style.tabs}>
        <ul className={style.nav}>
          <li
            onClick={() => setActiveTab("AFC")}
            className={activeTab === "AFC" ? style.active : ""}
          >
            AFC
          </li>

          <li
            onClick={() => setActiveTab("NFC")}
            className={activeTab === "NFC" ? style.active : ""}
          >
            NFC
          </li>
          <li
            onClick={() => setActiveTab("Playoffs")}
            className={activeTab === "Playoffs" ? style.active : ""}
          >
            Playoffs
          </li>
        </ul>
        <div className="outlet">
          {activeTab === "AFC" && <ScoreTabl tableData={scoreData} />}
          {activeTab === "NFC" && <ScoreTabl tableData={scoreData} />}
          {activeTab === "Playoffs" && "No Data Found"}
        </div>
      </div>
    </div>
  );
}

export default ScoreTabs;
