import React, { useState } from "react";
import NoDataFound from "../../noDataGif/noDataFound";
import styles from "./table.module.scss";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface Prop {
  tableData?: any[];
  filterRes?: Boolean;
  onClick?: (prop?: any) => void;
  handleFavData?: (prop?: any) => void;
  loading?: boolean;
}
const SkeltonTable = (props: Prop) => {
  const { tableData, onClick, filterRes, handleFavData, loading } = props;
  const [fav, setFav] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { accessToken } = useSelector((state: any) => state?.user);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {tableData?.length === 0 && filterRes ? (
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
            {[...Array(5)]?.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td style={{ cursor: "pointer" }}>
                      <Skeleton
                        // circle
                        // height="25px"
                        // width="25px"
                        baseColor="#5f5f5f"
                      />
                    </td>

                    <td>
                      <Skeleton width="100%" baseColor="#5f5f5f" />
                    </td>

                    <td>
                      <Skeleton baseColor="#5f5f5f" />
                    </td>
                    <td>
                      <Skeleton baseColor="#5f5f5f" />
                    </td>
                    <td>
                      <Skeleton baseColor="#5f5f5f" />
                    </td>
                    <td>
                      <Skeleton baseColor="#5f5f5f" />
                    </td>
                    <td>
                      <Skeleton baseColor="#5f5f5f" />
                    </td>

                    <td>
                      <Skeleton width="100%" baseColor="#5f5f5f" />
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

export default SkeltonTable;
