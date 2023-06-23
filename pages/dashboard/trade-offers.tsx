import React from "react";
import TradeOffersCardsComponent from "../../components/dashboardLayout/tradeOffers";
import Sidebar from "../../components/_common/sideBar/sidebar";
import styles from "../../styles/dashboard/tradeOffers.module.scss";
import PrivateRoute from "../../components/PrivateRoute";
const TradeOffers = () => {
  return (
    <PrivateRoute>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <TradeOffersCardsComponent />
        </div>
      </div>
    </PrivateRoute>
  );
};
TradeOffers.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default TradeOffers;
