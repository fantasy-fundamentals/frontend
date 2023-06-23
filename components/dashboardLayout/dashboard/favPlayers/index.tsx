import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleFavotitePlayers } from "../../../../services/players.services";
import { toggleIsFavorite } from "../../../../store/reducers/homeSlice";
import { savePlayerDetails } from "../../../../store/reducers/playersSlice";
import { getNormalizedError } from "../../../../utilty/helpers";
import PlayerTable from "../../../_common/playersCard/table";
import styles from "./FavoritePlayers.module.scss";

interface Prop {
  PlayersData?: () => void;
  favData?: any[];
  loading?: boolean;
}
const FavoritePlayers = (props: Prop) => {
  const { PlayersData, favData, loading } = props;
  const location = useRouter();
  const dispatch = useDispatch();
  const { player } = useSelector((state: any) => state?.home);
  const { user } = useSelector((state: any) => state?.user);

  const handlePlayersData = (item: any) => {
    dispatch(savePlayerDetails(item));
    location.push({
      pathname: "/player-info",
      query: { playerId: item?.playerId },
    });
  };

  const handleFavData = async (data?: {
    _id?: string;
    isFavorite?: boolean;
  }) => {
    try {
      const res = await handleFavotitePlayers(
        data?._id,
        user?.email,
        !data?.isFavorite
      );
      await PlayersData();
      dispatch(toggleIsFavorite(data?._id));
      toast.success(res?.data?.message);
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <label>
            Favorite<span> PlAYERS</span>
          </label>
        </div>
      </div>
      <div className={styles.secWrapper}>
        <PlayerTable
          handleFavData={handleFavData}
          loading={loading}
          tableData={favData}
          onClick={(item?: any) => handlePlayersData(item)}
        />
      </div>
    </div>
  );
};

export default FavoritePlayers;
