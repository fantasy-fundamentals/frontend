import { useRouter } from "next/router";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveNftDetails } from "../../../../store/reducers/nftSlice";
import { savePlayerDetails } from "../../../../store/reducers/playersSlice";
import LoginGif from "../../../_common/loginGif/loginGif";
import MarketplaceCard from "../../../_common/marketplaceCard";
import NoDataFound from "../../../_common/noDataGif/noDataFound";
import styles from "./marketplaceCard.module.scss";
interface Props {
  btnActive?: Number;
  search?: string | any;
  data?: any[] | any;
  page?: number;
  setPage?: Function;
  loading?: boolean;
  handlePageChange?: () => void;
  activePrice?: boolean;
  totalArrayData?: null | number;
}
const MintedMarketplaceCards = (prop: Props) => {
  const {
    btnActive,
    search,
    data,
    page,
    setPage,
    loading,
    activePrice,
    handlePageChange,
    totalArrayData,
  } = prop;
  const { accessToken } = useSelector((state: any) => state?.user);
  const { usdPrice } = useSelector((state: any) => state?.shopDetail);
  const location = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      {/* {accessToken ? ( */}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {data?.length === 0 && !loading ? (
            <NoDataFound />
          ) : (
            <>
              <div className={styles.cardWrapper}>
                <div
                  className={styles.cardWrapper}
                  style={
                    data?.length < 4
                      ? { justifyContent: "flex-start" }
                      : { justifyContent: "center" }
                  }
                >
                  {data?.map((item, index) => (
                    <div className={styles.card} key={index}>
                      <MarketplaceCard
                        heading={item?.playerDetail?.Name}
                        // subHeading={`playerId: ${item?.playerId}`}
                        // ranking={`Status: ${item?.playerDetail?.Status}`}
                        // // img={item.img}
                        // imgHeading={item?.playerDetail?.BirthDateString}
                        // height={
                        //   item?.playerDetail?.Height?.split("")[0] +
                        //   "'" +
                        //   [1] +
                        //   " " +
                        //   "f"
                        // }
                        // weight={item?.playerDetail?.Weight}
                        // experience={item?.playerDetail?.Experience}
                        // age={item?.playerDetail?.Age}
                        videoUrl={item?.meta?.videoUrl}
                        current="Current value"
                        price={
                          activePrice
                            ? `${(
                                item?.value * usdPrice
                              )?.toLocaleString()} USD`
                            : `${item?.value?.toLocaleString()} ADA`
                        }
                        btn="See Detail"
                        onClick={() => {
                          if (!accessToken) {
                            toast.info("Please login first");
                          } else {
                            location.push({
                              pathname: "/nft-detail",
                              query: { mintedNftId: item?.mintedNftId },
                            }),
                              dispatch(saveNftDetails(item));
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {data.length === totalArrayData ? null : loading ? (
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
                  onClick={() => handlePageChange()}
                >
                  Load more
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* ) : (
        <div className={styles.gifWrapper}>
          <LoginGif name="Login to see Minted NFT's" />
        </div>
      )} */}
    </>
  );
};

export default MintedMarketplaceCards;
