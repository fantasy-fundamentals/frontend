import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ScoreInfoHeader from "../components/scoreInfoComponent/header";
import ScoreInfoInjuries from "../components/scoreInfoComponent/Injuries";
import ScoreInfoRecentGames from "../components/scoreInfoComponent/recentGames";
import ScoreInfoStats from "../components/scoreInfoComponent/stats";
import Gear from "../components/_common/GearCards";
import LatestNews from "../components/_common/latestNewsCards";
import { handleShopData } from "../services/shopServices";
import { saveShopData } from "../store/reducers/homeSlice";
import styles from "../styles/scoreInfo.module.scss";
import { getNormalizedError } from "../utilty/helpers";
const ScoreInfo = () => {
  const dispatch = useDispatch();
  const { shop } = useSelector((state: any) => state?.home);

  const handleData = async () => {
    try {
      const shopRes = await handleShopData();
      const filterShop = shopRes?.data?.data?.filter(
        (item: any) => item?.isActive
      );
      dispatch(saveShopData(filterShop?.slice(0, 4)));
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ScoreInfoHeader />
        <ScoreInfoStats />
        {/* <ScoreInfoInjuries /> */}
        {/* <ScoreInfoRecentGames /> */}
        <LatestNews />
        <Gear shopData={shop} />
      </div>
    </div>
  );
};

export default ScoreInfo;
