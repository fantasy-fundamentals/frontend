import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NoDataFound from "../../_common/noDataGif/noDataFound";
import PlayerTable from "../../_common/playersCard/table";
import styles from "./card.module.scss";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { savePlayerDetails } from "../../../store/reducers/playersSlice";

interface playerInterface {
  data?: any[] | any;
  page?: number;
  setPage?: Function;
  loading?: boolean;
  favLoading?: boolean;
  count?: Boolean;
  handleFavData?: () => void;
  selection: string;
  totalArrayData: number;
  totalSearchCount: number;
}
const PlayerComCards = (prop: playerInterface) => {
  const {
    data,
    page,
    setPage,
    loading,
    count,
    handleFavData,
    favLoading,
    totalArrayData,
    totalSearchCount,
  } = prop;

  const location = useRouter();
  const dispatch = useDispatch();

  const handlePlayersData = (item: any) => {
    let params = {
      ...item,
      selection: prop.selection,
    };
    dispatch(savePlayerDetails(params));
    location.push({
      pathname: "/player-info",
      query: { playerId: item?.playerId },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {data?.length === 0 && !loading ? (
          <NoDataFound />
        ) : (
          <>
            <div className={styles.cardWrapper}>
              <PlayerTable
                tableData={data}
                onClick={(item) => handlePlayersData(item)}
                handleFavData={handleFavData}
                loading={favLoading}
                loadingLength={loading}
              />
            </div>
            {data?.length === totalArrayData ||
            (totalSearchCount >= totalArrayData && !loading) ? (
              ""
            ) : loading ? (
              <div className={styles.loadingHeading}>
                <RotatingLines
                  strokeColor="#d80f29"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </div>
            ) : (
              <div
                className={styles.loadingHeading}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Load more
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerComCards;
