import styles from "./table.module.scss";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { RiArrowDropUpFill, RiArrowDropDownFill } from "react-icons/ri";

interface Prop {
  tableData?: any[];
  onClick?: (prop?: any) => void;
  handleFavData?: (prop?: any) => void;
  loading?: boolean;
  week: string;
  team: string;
}

const ScoreTable = (props: Prop) => {
  const { tableData, onClick, handleFavData, loading, week, team } = props;

  const historicalArrayHandler = (arr: any) => {
    for (let index = 0; index < arr.length; index++) {
      let element = arr[index];
      if (element.week === +week) {
        return element.rating;
      }
    }
    return 0;
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                <ReactTooltip
                  anchorId="won"
                  place="bottom"
                  content="Number of times the NFT won."
                  variant="info"
                />
                Won
                <span
                  style={{
                    fontSize: "10px",
                    cursor: "default",
                  }}
                  id="won"
                >
                  ۞
                </span>
              </th>
              {/* <th>Average Position</th> */}
              <th>
                <ReactTooltip
                  anchorId="Finish"
                  place="bottom"
                  content="The closing position of the NFT this week."
                  variant="info"
                />
                Finish
                <span
                  id="Finish"
                  style={{ fontSize: "10px", cursor: "default" }}
                >
                  ۞
                </span>
              </th>
              <th>Fantasy points</th>
              <th>Player ID</th>
              <th>Team</th>
              <th>Current value</th>
              <th>Price Difference ( ADA )</th>
              <th></th>
            </tr>
          </thead>
          {tableData?.map((item: any, index) => {
            const teamOptions = ["QB", "WR", "RB", "TE"];
            return (
              <tbody key={index}>
                <tr
                  style={
                    team === "QB"
                      ? index < 5
                        ? { backgroundColor: "rgb(27 66 54)" }
                        : null
                      : team === "WR"
                      ? index < 15
                        ? { backgroundColor: "rgb(27 66 54)" }
                        : null
                      : team === "TE"
                      ? index < 3
                        ? { backgroundColor: "rgb(27 66 54)" }
                        : null
                      : team === "RB"
                      ? index < 8
                        ? { backgroundColor: "rgb(27 66 54)" }
                        : null
                      : null
                  }
                >
                  {/* style={index < 5 ? { color: "#0066cc" } : null} */}

                  <td>{item?.detail?.Name ? item?.detail?.Name : "-"}</td>
                  <td>{item?.won ? item?.won : "0"}</td>

                  <td>{index + 1}</td>
                  <td> {historicalArrayHandler(item?.historicalRating)}</td>
                  <td>
                    {item?.detail?.PlayerID ? item?.detail?.PlayerID : "-"}
                  </td>
                  <td>{item?.detail?.Team ? item?.detail?.Team : "-"}</td>

                  <td>
                    {item?.nft?.value
                      ? `${Number(item?.nft?.value)?.toLocaleString()} ADA`
                      : "-"}
                  </td>
                  <td>
                    {Number(item?.nft?.value > item?.nft?.lastValue) ? (
                      <span style={{ color: "lime" }}>
                        <RiArrowDropUpFill fontSize="50px" fontWeight="bold" />
                        {Number(
                          item?.nft?.value - item?.nft?.lastValue
                        )?.toLocaleString()}
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        <RiArrowDropDownFill
                          fontSize="50px"
                          fontWeight="bold"
                        />
                        {Number(
                          item?.nft?.value - item?.nft?.lastValue
                        )?.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td onClick={() => onClick(item)}>
                    <button>Details</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default ScoreTable;
