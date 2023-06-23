import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BettingTableComponent from "../components/bettingComponent/table";
import { handleBettingData } from "../services/betting.services";
import styles from "../styles/betting.module.scss";
import { getNormalizedError } from "../utilty/helpers";

const Betting = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const getbettingData = async () => {
    try {
      setLoading(true);
      const res = await handleBettingData();

      res?.data?.data?.map((item: any) => {
        if (Number(item[10]) >= 1 && Number(item[10]) < 4) {
          item[0] = "yellow";
        } else if (Number(item[10]) >= 4 && Number(item[10]) < 7) {
          item[0] = "yellow";
        } else if (Number(item[10]) >= 7 && Number(item[10]) <= 9) {
          item[0] = "green";
        } else if (Number(item[10]) > 9) {
          item[0] = "Dgreen";
        } else if (item[3] === "low confidence") {
          item[0] = "yellow";
        } else if (item[3] === "OK confidence") {
          item[0] = "green";
        } else if (item[3] === "BIG confidence") {
          item[0] = "Dgreen";
        }
      });
      setData(res?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  useEffect(() => {
    getbettingData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <span>2022</span> Betting archive
        </div>
        <div className={styles.statusBar}>
          We dont pick every game only the ones that give an edge. (
          <span>Yellow</span> = Edge of 3 - 6 pts) - (<span>Green</span> = 6 - 9
          points) - ( <span>D.Green</span> = 9+ pts)
        </div>
        <BettingTableComponent data={data} loading={loading} />
      </div>
    </div>
  );
};

export default Betting;
