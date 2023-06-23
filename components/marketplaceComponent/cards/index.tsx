import React, { useEffect, useMemo, useState } from "react";
import MarketplaceCard from "../../_common/marketplaceCard";
import { data } from "./data";
import styles from "./marketplaceCard.module.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "../../_common/modal";
import CurrencyModal from "../../_common/currencyModal/nftPaymentModal";
import { RotatingLines } from "react-loader-spinner";
import { COOKIE_NAME_PRERENDER_BYPASS } from "next/dist/server/api-utils";
import Modal1 from "../../_common/modal/modal1";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
interface Props {
  btnActive?: Number;
  search?: string | any;
  data?: any[] | any;
  page?: number;
  setPage?: Function;
  loading?: boolean;
  count?: Boolean;
  handlePageChange?: () => void;
  activePrice?: boolean;
}
const MarketplaceCardsComponent = (prop: Props) => {
  const {
    btnActive,
    search,
    data,
    page,
    setPage,
    loading,
    count,
    activePrice,
    handlePageChange,
  } = prop;
  const [popupvisible, setpopupvisible] = useState(false);
  const [marketplaceData, setMarketplaceData] = useState(null);
  const { accessToken } = useSelector((state: any) => state?.user);

  const togglepopup = (e: any, item: any) => {
    e.preventDefault();
    setMarketplaceData(item);
    setpopupvisible((preview) => !preview);
  };

  const toggleData = () => {
    setpopupvisible(false);
  };

  return (
    <>
      <Modal1 visible={popupvisible} btn onClose={() => toggleData()}>
        <CurrencyModal
          data={marketplaceData}
          setpopupvisible={setpopupvisible}
        />
      </Modal1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {loading ? (
            <RotatingLines
              strokeColor="#d80f29"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          ) : (
            <>
              <div
                className={styles.cardWrapper}
                style={
                  data?.length <= 3
                    ? { justifyContent: "flex-start" }
                    : { justifyContent: "center" }
                }
              >
                {data?.map((item: any, index: number) => (
                  <div className={styles.card} key={index}>
                    <MarketplaceCard
                      heading={item?.playerDetail?.Name}
                      subHeading={`playerId: ${item?.playerId}`}
                      ranking={`Status: ${item?.playerDetail?.Status}`}
                      // img={item.img}
                      imgHeading={item?.playerDetail?.BirthDateString}
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
                      price={
                        activePrice
                          ? `${item?.value} USD`
                          : `${item?.value} ADA`
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
                    />
                  </div>
                ))}
              </div>
              {count ? (
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

export default MarketplaceCardsComponent;
