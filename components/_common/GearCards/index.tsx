import { useRouter } from "next/router";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import ComingSoon from "../../comingSoon";
import styles from "./Gear.module.scss";
interface Props {
  shopData?: any;
  loading?: boolean;
}
const Gear = (prop: Props) => {
  const { shopData, loading } = prop;
  const location = useRouter();
  const newTabFunction = (item?: any) => {
    window.open(item?.productURL, "_blank", "noopener,noreferrer");
  };
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftSide}>
            <label>
              FANTASY FUNDUHMENTALS <span>GEAR</span>
            </label>
          </div>
          <div className={styles.right}>
            {/* <Button
              name="Explore"
              changeStyle={false}
              onClick={() => location.push("/shop")}
            /> */}
          </div>
        </div>
        <div className={styles.secWrapper}>
          <div
            className={styles.cardWrapper}
            style={
              shopData?.length < 4
                ? { justifyContent: "flex-start" }
                : { justifyContent: "center" }
            }
          >
            <ComingSoon />
            {/* {loading ? (
              [...Array(4)].map((item, index) => (
                <div
                  className={styles.card}
                  key={index}
                  style={{
                    minHeight: "220px",
                  }}
                >
                  <Skeleton height="220px" baseColor="#5f5f5f" />
                </div>
              ))
            ) : shopData?.length === 0 ? (
              <NoDataFound />
            ) : (
              shopData?.map((item, index) => (
                <div className={styles.card} key={index}>
                  <FantasyGearCard
                    img={item?.images ? item?.images[0] : null}
                    heading={item?.title}
                    amount={item?.price}
                    btn="Buy Now"
                    onClick={() => {
                      dispatch(saveShopDetails(item));
                      location.push({
                        pathname: "/product-detail",
                        query: { id: item?._id },
                      });
                    }}
                  />
                </div>
              ))
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gear;
