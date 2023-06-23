import { RotatingLines } from "react-loader-spinner";
import NoDataFound from "../../_common/noDataGif/noDataFound";
import styles from "./bettingTable.module.scss";
interface props {
  data?: any;
  name?: string;
  loading: boolean;
}
const BettingTableComponent = (prop: props) => {
  const { data, name, loading } = prop;
  return (
    <div className={styles.wrapper}>
      <div className={styles.headingWrapper}>{/* <label>{name}</label> */}</div>
      {data?.data?.length === 0 ? (
        <div className={styles.dataWrapper}>
          <NoDataFound />
        </div>
      ) : loading ? (
        <div className={styles.dataWrapper}>
          <RotatingLines
            strokeColor="#d80f29"
            strokeWidth="5"
            animationDuration="0.75"
            width="30"
            visible={true}
          />
        </div>
      ) : (
        <table cellSpacing="0">
          <thead>
            <tr>
              {data?.columns?.map((item: string, index: number) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          {data?.data?.map((item: any, index: number) => (
            <tbody key={index}>
              <tr>
                {item?.map((item: any, index: number) => (
                  <td
                    style={
                      item === "WIN"
                        ? { color: "green" }
                        : item === "Lost"
                        ? { color: "red" }
                        : item === "Dyellow"
                        ? { color: "#baba02", background: "#baba02" }
                        : item === "Dgreen"
                        ? { color: "green", background: "green" }
                        : item === "green"
                        ? { color: "#3fff3f", background: "#3fff3f" }
                        : item === "yellow"
                        ? {
                            color: "rgb(255 255 44)",
                            background: "rgb(255 255 44)",
                          }
                        : null
                    }
                    key={index}
                  >
                    {item ? item : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default BettingTableComponent;
