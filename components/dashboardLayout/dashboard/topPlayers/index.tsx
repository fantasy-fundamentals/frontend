import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getFavotitePlayers,
  handleFavotitePlayers,
  handlePlayers,
} from "../../../../services/players.services";
import { toggleIsFavorite } from "../../../../store/reducers/homeSlice";
import { savePlayerDetails } from "../../../../store/reducers/playersSlice";
import { getNormalizedError } from "../../../../utilty/helpers";
import { playersData2 } from "../../../playersComponent/cards/playerCard";
import PlayerTable from "../../../_common/playersCard/table";
import styles from "./topPlayers.module.scss";

interface Prop {
  PlayersData?: () => void;
  loading?: boolean;
}
const TopPlayers = (props: Prop) => {
  const { PlayersData, loading } = props;
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
            TOP PERFORMING<span> PlAYERS</span>
          </label>
        </div>
      </div>
      <div className={styles.secWrapper}>
        <PlayerTable
          handleFavData={handleFavData}
          tableData={player}
          onClick={(item?: any) => handlePlayersData(item)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default TopPlayers;
