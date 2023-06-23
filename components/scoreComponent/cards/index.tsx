import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { savePlayerDetails } from "../../../store/reducers/playersSlice";
import NoDataFound from "../../_common/noDataGif/noDataFound";
import ScoreTable from "../scoreTable";
import styles from "./card.module.scss";

interface ScoreInterface {
  searchData?: String;
  data?: any[] | any;
  page?: number;
  setPage?: Function;
  loading?: boolean;
  count?: Boolean;
  filteredDataRes?: Boolean;
  handleFavData?: () => void;
  setpaginationCheck?: (props?: any) => void;
  selection: string;
  week: string;
  teamBy: string;
}
const ScoreComCards = (prop: ScoreInterface) => {
  const {
    searchData,
    data,
    page,
    setPage,
    loading,
    count,
    handleFavData,
    filteredDataRes,
    week,
    teamBy,
  } = prop;

  const [filterRes, setFilterRes] = useState(false);
  const location = useRouter();
  const dispatch = useDispatch();

  const filteredData = useMemo(() => {
    if (searchData?.length >= 1) {
      setFilterRes(true);
      return data?.filter((item) =>
        item?.detail?.Name?.toLowerCase().includes(searchData.toLowerCase())
      );
    } else {
      return data;
    }
  }, [searchData, data]);

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
        {!loading && data?.length === 0 ? (
          <NoDataFound />
        ) : (
          <>
            <div className={styles.cardWrapper}>
              <ScoreTable
                tableData={data}
                week={week}
                onClick={(item) => handlePlayersData(item)}
                handleFavData={handleFavData}
                team={teamBy}
              />
            </div>
            {loading ? (
              <div className={styles.loadingHeading}>
                <RotatingLines
                  strokeColor="#d80f29"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </div>
            ) : count ? (
              <div
                className={styles.loadingHeading}
                style={{ cursor: "unset" }}
              >
                No more data
              </div>
            ) : (
              <div
                className={styles.loadingHeading}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                {/* <AiOutlineLoading3Quarters className={styles.ico} /> */}
                Load more
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScoreComCards;
