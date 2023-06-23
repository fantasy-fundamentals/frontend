import React, { useState } from "react";
import NoDataFound from "../../noDataGif/noDataFound";
import styles from "./table.module.scss";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";

interface Prop {
  tableData?: any[];
  filterRes?: Boolean;
  onClick?: (prop?: any) => void;
  handleFavData?: (prop?: any) => void;
  loading?: boolean;
  loadingLength?: boolean;
}
const PlayerTable = (props: Prop) => {
  const { tableData, onClick, filterRes, handleFavData, loading } = props;
  const [fav, setFav] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { accessToken } = useSelector((state: any) => state?.user);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {tableData?.length === 0 && !props.loadingLength ? (
          <NoDataFound />
        ) : (
          <table cellSpacing="0">
            <thead>
              <tr>
                <th></th>
                <th>Player ID</th>
                <th>Player Name</th>
                <th>Team</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            {tableData?.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td style={{ cursor: "pointer" }}>
                      {loading && item?._id === selectedIndex ? (
                        <RotatingLines
                          strokeColor="#d80f29"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="24"
                          visible={true}
                        />
                      ) : (
                        <AiFillStar
                          onClick={() => {
                            !loading && setSelectedIndex(item?._id);
                            !loading && handleFavData(item);
                          }}
                          className={
                            item?.player
                              ? item?.player?.isFavorite
                              : item?.isFavorite
                              ? styles.favActive
                              : ""
                          }
                        />
                      )}
                    </td>

                    <td>
                      {item?.player
                        ? item?.player?.detail?.PlayerID
                        : item?.detail?.PlayerID}
                    </td>

                    <td>
                      {item?.player
                        ? item?.player?.detail?.Name
                        : item?.detail?.Name}
                    </td>
                    <td>
                      {item?.player
                        ? item?.player?.detail?.CurrentTeam
                        : item?.detail?.CurrentTeam}
                    </td>
                    <td>
                      {item?.player
                        ? item?.player?.detail?.Height
                        : item?.detail?.Height}
                    </td>
                    <td>
                      {item?.player
                        ? item?.player?.detail?.Weight
                        : item?.detail?.Weight}
                      &nbsp;lb
                    </td>
                    <td>
                      {item?.player
                        ? item?.player?.detail?.Status
                        : item?.detail?.Status}
                    </td>

                    <td onClick={() => onClick(item)}>
                      <button>Details</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
};

export default PlayerTable;
