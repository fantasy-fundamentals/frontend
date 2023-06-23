import { useRouter } from "next/router";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { saveNftDetails } from "../../../store/reducers/nftSlice";
import Button from "../../_common/Button";
import MarketplaceCard from "../../_common/marketplaceCard";
import NoDataFound from "../../_common/noDataGif/noDataFound";
import styles from "./nftsCard.module.scss";
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
  totalNftPrice?: number;
}
const NftsCardsComponent = (prop: Props) => {
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
    totalNftPrice,
  } = prop;
  const location = useRouter();
  const { accessToken } = useSelector((state: any) => state?.user);
  const { usdPrice } = useSelector((state: any) => state?.shopDetail);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <label>
              Minted&nbsp;
              <span>NFT'S</span>
            </label>
            <div className={styles.btnWrapper}>
              <button>
                {loading
                  ? "loading..."
                  : totalNftPrice
                  ? ` Total Value:${totalNftPrice?.toLocaleString()} ADA`
                  : "No value available"}
              </button>
            </div>
          </div>
          {data?.length === 0 && !loading ? (
            <NoDataFound />
          ) : (
            <>
              <div className={styles.cardWrapper}>
                <div
                  className={styles.cardWrapper}
                  style={
                    data?.length < 4
                      ? { display: "flex", justifyContent: "flex-start" }
                      : { display: "flex", justifyContent: "center" }
                  }
                >
                  {data?.map((item, index) => (
                    <div className={styles.card} key={index}>
                      <MarketplaceCard
                        heading={item?.playerDetail?.Name}
                        subHeading={`playerId: ${item?.playerId}`}
                        ranking={`Status: ${item?.playerDetail?.Status}`}
                        videoUrl={item?.meta?.videoUrl}
                        // img={item.img}
                        topActive={item?.activeMarketplace}
                        topActiveBtnText="Listing"
                        backgroundColor="#199c19"
                        color="white"
                        imgHeading={item?.meta?.BirthDateString}
                        height={
                          item?.playerDetail?.Height?.split("")[0] +
                          "'" +
                          [1] +
                          " " +
                          "f"
                        }
                        weight={item?.playerDetail?.Weight}
                        experience={item?.playerDetail?.Experience}
                        age={item?.playerDetail?.Age}
                        current="Current value"
                        price={`${(
                          item?.value * usdPrice
                        )?.toLocaleString()} USD`}
                        btn="See Detail"
                        onClick={() => {
                          location.push({
                            pathname: "/nft-detail",
                            query: { mintedNftId: item?.mintedNftId },
                          }),
                            dispatch(saveNftDetails(item));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {data?.length === totalArrayData ? null : loading ? (
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
    </>
  );
};

export default NftsCardsComponent;
