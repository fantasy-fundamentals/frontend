import React from "react";
import BarChart from "../../_common/BarChart/BarChart";
import DropDownTab from "../../_common/DropDownTab";
import styles from "./listings.module.scss";
interface Props {
  data?: any;
}
const Listings = (prop: Props) => {
  const { data } = prop;
  // const [filterBy, setFilterBy] = useState("All Time");
  // const filterOptions = ["Top"];
  const AbsoluteData = data?.reduce((first, sec) => {
    return first + sec?.biddingPrice;
  }, 0);

  let graphData = data?.map((item) => {
    return {
      offer: item?.biddingPrice,
    };
  });

  return (
    <div className={styles.dropDownWrapper}>
      <DropDownTab
        title="Listings"
        headerStyle={{ backgroundColor: "black" }}
        changeStyle
      >
        <div className={styles.graphDropDown}>
          <div className={styles.dropDown}>
            {/* <DropDown
              border
              selected={filterBy}
              setSelected={setFilterBy}
              options={filterOptions}
              showRightIcon={false}
            /> */}
          </div>

          <div className={styles.textArea}>
            <label>Average Price</label>
            <p>
              {" "}
              <img src={"/icons/cardano.svg"} alt="" />
              {data
                ? (AbsoluteData / data?.length
                    ? AbsoluteData / data?.length
                    : 0
                  )?.toLocaleString()
                : "-"}
            </p>
          </div>
        </div>
        {graphData?.length > 0 ? (
          <BarChart height={"315px"} dataKey="offer" data={graphData} />
        ) : (
          <div className={styles.graphNotFound}>
            No Data&nbsp;<span>Found</span>
          </div>
        )}
      </DropDownTab>
    </div>
  );
};

export default React.memo(Listings);
