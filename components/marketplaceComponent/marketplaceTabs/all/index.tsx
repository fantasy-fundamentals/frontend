import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleShopDetails } from "../../../../services/shopServices";
import { savePlayerDetails } from "../../../../store/reducers/playersSlice";
import CheckoutForm from "../../../_common/currencyModal/checkoutForm";
import NftPaymentModal from "../../../_common/currencyModal/nftPaymentModal";
import MarketplaceCard from "../../../_common/marketplaceCard";
import Modal1 from "../../../_common/modal/modal1";
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
  selection: string;
}
const AllMarketplaceCard = (prop: Props) => {
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
  const [popupvisible, setpopupvisible] = useState(false);
  const [marketplaceData, setMarketplaceData] = useState(null);
  const { accessToken } = useSelector((state: any) => state?.user);
  const { usdPrice } = useSelector((state: any) => state?.shopDetail);

  const location = useRouter();
  const dispatch = useDispatch();

  const togglepopup = (e: any, item: any) => {
    e.preventDefault();
    setMarketplaceData(item);
    setpopupvisible((preview) => !preview);
  };

  const toggleData = () => {
    setpopupvisible(false);
  };

  const handleDetailData = useCallback((item) => {
    let params = {
      ...item,
      selection: prop.selection,
    };
    dispatch(savePlayerDetails(params)),
      location.push({
        pathname: "/player-info",
        query: { playerId: item?.playerId },
      });
  }, []);

  return (
    <>
      <Modal1 visible={popupvisible} btn onClose={() => toggleData()}>
        <NftPaymentModal
          data={marketplaceData}
          setpopupvisible={setpopupvisible}
        />
      </Modal1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <>
            <div
              className={styles.cardWrapper}
              style={
                data?.length <= 3
                  ? { justifyContent: "flex-start" }
                  : { justifyContent: "center" }
              }
            >
              {data?.length === 0 && !loading ? (
                <NoDataFound />
              ) : (
                data?.map((item: any, index: number) => (
                  <div className={styles.card} key={index}>
                    <MarketplaceCard
                      videoUrl={item?.meta?.videoUrl}
                      heading={item?.playerDetail?.Name}
                      loading={loading}
                      // subHeading={`playerId: ${item?.playerId}`}
                      // ranking={`Status: ${item?.playerDetail?.Status}`}
                      // img={item.img}
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
                      current="Current value"
                      price={
                        activePrice
                          ? `${(item?.value * usdPrice).toLocaleString()} USD`
                          : `${item?.value?.toLocaleString()} ADA`
                      }
                      btn="Mint Now"
                      onClick={(e) => {
                        if (!accessToken) {
                          toast.info("Please login first");
                        } else {
                          togglepopup(e, item);
                        }
                      }}
                      active={item?.isMinted}
                      activeBtn="Already Minted"
                      DetailButton="Player Detail"
                      onDetailClick={() => {
                        handleDetailData(item);
                      }}
                    />
                  </div>
                ))
              )}
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
        </div>
      </div>
    </>
  );
};

export default AllMarketplaceCard;
