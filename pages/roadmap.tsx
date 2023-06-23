import React from "react";
import HeaderImg from "../components/roadmapComponent/HeaderImg";
import RoadmapGraph from "../components/roadmapComponent/roadmap";
import styles from "../styles/roadmap.module.scss";
const RoadMap = () => {
  return (
    <>
      <HeaderImg />
      <div className={styles.container}>
        <RoadmapGraph />
      </div>
    </>
  );
};

export default RoadMap;
