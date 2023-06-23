import DashboardGraph from "../../components/dashboardLayout/dashboard/graph";
import TopPlayers from "../../components/dashboardLayout/dashboard/topPlayers";
import UpComingMatches from "../../components/dashboardLayout/dashboard/upcomingMatches";
import Sidebar from "../../components/_common/sideBar/sidebar";
import styles from "../../styles/dashboard/dashboard.module.scss";
import PrivateRoute from "../../components/PrivateRoute";
import { useEffect, useState } from "react";
import {
  getFavotitePlayers,
  handleAuthPlayers,
  handlePlayers,
  handlePlayersScore,
} from "../../services/players.services";
import { getNormalizedError } from "../../utilty/helpers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { savePlayer, saveScoreData } from "../../store/reducers/homeSlice";
import FavoritePlayers from "../../components/dashboardLayout/dashboard/favPlayers";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.user);
  const [favData, setFavData] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const PlayersData = async () => {
    try {
      setLoading(true);
      const playerRes = await handlePlayers(1, user?.email, "all");
      dispatch(savePlayer(playerRes?.data?.data?.slice(0, 5)));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const handleFavPlayer = async () => {
    try {
      setLoading(true);

      const FavRes = await getFavotitePlayers(user?.email);
      setFavData(FavRes?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const handleScoreData = async () => {
    try {
      setLoading(true);
      const scoreRes = await handlePlayersScore(true, 13, 0);
      dispatch(saveScoreData(scoreRes?.data?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      PlayersData();
      handleScoreData();
      handleFavPlayer();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <PrivateRoute>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <UpComingMatches />
          {/* <DashboardGraph /> */}
          {favData?.length != 0 ? (
            <FavoritePlayers
              PlayersData={handleFavPlayer}
              favData={favData}
              loading={loading}
            />
          ) : null}
          <TopPlayers PlayersData={handleFavPlayer} loading={loading} />
        </div>
      </div>
    </PrivateRoute>
  );
};
Dashboard.getLayout = (page) => <Sidebar>{page}</Sidebar>;
export default Dashboard;
