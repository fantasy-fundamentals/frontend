import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { savePlayerDetails } from "../../../store/reducers/playersSlice";
import Button from "../../_common/Button";
import SkeltonTable from "../../_common/playersCard/skeltonTable";
import PlayerTable from "../../_common/playersCard/table";
import styles from "./trending.module.scss";

interface Prop {
  handleFavData?: () => void;
  loading?: boolean;
  apiLoading?: boolean;
}
const TrendingPlayers = (props: Prop) => {
  const { handleFavData, loading, apiLoading } = props;

  const dispatch = useDispatch();
  const { player } = useSelector((state: any) => state?.home);
  const location = useRouter();
  const handlePlayersData = (item: any) => {
    dispatch(savePlayerDetails(item));
    location.push({
      pathname: "/player-info",
      query: { playerId: item?.playerId },
    });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftSide}>
            <label>
              <span>Trending</span> Players
            </label>
          </div>
          <div className={styles.right}>
            <Button
              name="Explore"
              changeStyle={false}
              onClick={() => location.push("/players")}
            />
          </div>
        </div>
        <div className={styles.secWrapper}>
          <div className={styles.cardWrapper}>
            {apiLoading && player?.length === 0 ? (
              <SkeltonTable />
            ) : (
              <PlayerTable
                handleFavData={handleFavData}
                tableData={player}
                onClick={(item?: any) => handlePlayersData(item)}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingPlayers;
