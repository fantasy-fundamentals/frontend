import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { saveShopDetails } from "../../../store/reducers/shopSlice";
import FantasyGearCard from "../../_common/fantasyGearCard";
import NoDataFound from "../../_common/noDataGif/noDataFound";
import styles from "./card.module.scss";
import { gearData } from "./shopCard";

interface shopInterface {
  searchData?: String;
  data?: any[] | any;
  page?: number;
  setPage?: Function;
  loading?: boolean;
  count?: Boolean;
  handlePageData?: () => void;
}
const ShopComponentCards = (prop: shopInterface) => {
  const { searchData, data, page, setPage, loading, count, handlePageData } =
    prop;
  const dispatch = useDispatch();
  const location = useRouter();
  const [filterRes, setFilterRes] = useState(false);
  const filteredData = useMemo(() => {
    if (searchData?.length >= 1) {
      setFilterRes(true);
      return data.filter((item) =>
        item?.title?.toLowerCase().includes(searchData.toLowerCase())
      );
    } else {
      return data?.filter((item: any) => item?.isActive);
    }
  }, [searchData, data]);

  const handleShopData = (item?: any) => {
    dispatch(saveShopDetails(item));
    location.push({
      pathname: "/product-detail",
      query: { id: item?._id },
    });

    // window.open(item?.productURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* {filteredData?.length === 0 && filterRes ? (
          <NoDataFound />
        ) : ( */}
        <>
          <div
            className={styles.cardWrapper}
            style={
              gearData?.length <= 3
                ? { justifyContent: "flex-start" }
                : { justifyContent: "center" }
            }
          >
            {gearData?.map((item, index) => (
              <div className={styles.card} key={index}>
                {/* <FantasyGearCard
                    img={item?.images[0]}
                    heading={item?.title}
                    amount={item?.price}
                    btn="Buy Now"
                    onClick={() => handleShopData(item)}
                  /> */}
                <FantasyGearCard
                  img={item?.img}
                  heading={item?.label}
                  amount={item?.amount}
                  btn="Coming Soon"
                  // onClick={() => handleShopData(item)}
                />
              </div>
            ))}
          </div>
          {/* {count ? (
              <div
                className={styles.loadingHeading}
                style={{ cursor: "unset" }}
              >
                No more data
              </div>
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
            ) : filteredData.length === 0 ? (
              <div
                className={styles.loadingHeading}
                style={{ cursor: "unset" }}
              >
                No data
              </div>
            ) : (
              <div
                className={styles.loadingHeading}
                onClick={() => handlePageData()}
              >
                Load more
              </div>
            )} */}
        </>
        {/* )} */}
      </div>
    </div>
  );
};

export default ShopComponentCards;
