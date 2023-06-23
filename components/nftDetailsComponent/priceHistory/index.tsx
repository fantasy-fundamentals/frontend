import React, { useCallback, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AcceptListingBid } from "../../../services/nft.services";
import { getNormalizedError } from "../../../utilty/helpers";
import DropDownTab from "../../_common/DropDownTab";
import Modal from "../../_common/modal";
import BidPayment from "../BidPayment";
import styles from "./priceHistory.module.scss";

interface Props {
  data?: any;
  nftDetail?: any;
  handleRefresh?: () => void;
}
interface LOADING_PROPS {
  namiWallet?: boolean;
  activeIndex?: number;
}

const PriceHistory = (prop: Props) => {
  const { data, nftDetail, handleRefresh } = prop;
  let acceptedBid = data?.find((item: any) => item.isActive === false);
  const { usdPrice } = useSelector((state: any) => state?.shopDetail);
  const { user } = useSelector((state: any) => state?.user);
  const [popupvisible, setpopupvisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<any>(null);

  const handleBidData = useCallback(async (item) => {
    try {
      setLoading(true);
      if (item?.isActive === false) {
        toast.error("bid already accepted");
        setLoading(false);
        return;
      }

      const res = await AcceptListingBid(nftDetail?.mintedNftId, item?._id);
      handleRefresh();
      toast.success(res?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  }, []);

  const handleBidValue = (item, index) => {
    if (!loading) {
      setActiveIndex(index), handleBidData(item);
    }
  };

  return (
    <>
      <Modal visible={popupvisible} btn onClose={() => setpopupvisible(false)}>
        <BidPayment
          data={data}
          nftDetail={nftDetail}
          setpopupvisible={setpopupvisible}
          handleRefresh={handleRefresh}
        />
      </Modal>
      {!nftDetail?.isMintedByMe &&
      nftDetail != null &&
      nftDetail?.activeMarketplace != false ? (
        <div className={styles.paymentCard}>
          <div className={styles.leftWrapper}>Instant Buy :</div>
          <div className={styles.rightWrapper}>
            <button
              style={
                acceptedBid
                  ? {
                      cursor: "not-allowed",
                      backgroundColor: "gray",
                    }
                  : null
              }
              disabled={acceptedBid}
              onClick={() => !acceptedBid && setpopupvisible(true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      ) : null}

      <div className={styles.dropDownWrapper}>
        <DropDownTab title="Offers" headerStyle={{ backgroundColor: "black" }}>
          <table cellSpacing="0">
            <tbody>
              <tr>
                <th>Price</th>
                <th>USD Price</th>
                <th>Name</th>
                <th>Email</th>
                <th>From</th>
                <th></th>
              </tr>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={"/icons/cardano.svg"} alt="" />{" "}
                    {item?.biddingPrice}
                  </td>
                  <td>{(item?.biddingPrice * usdPrice)?.toLocaleString()}</td>
                  <td>
                    {item?.bidderName.substring(0, 2)}.....
                    {item?.bidderName.substring(item?.bidderName.length - 1)}
                  </td>
                  <td>
                    {item?.bidderEmail.substring(0, 5)}.....
                    {item?.bidderEmail.substring(item?.bidderEmail.length - 6)}
                  </td>
                  {/* <td>{item?.bidderName}</td> */}
                  {/* <td>{item?.bidderEmail}</td> */}

                  <td
                    onClick={() => {
                      navigator?.clipboard?.writeText(
                        item?.bidderWalletAddress
                      );
                      toast.success("Copied");
                    }}
                  >
                    {/* {item?.bidderWalletAddress} */}
                    {item?.bidderWalletAddress.substring(0, 15)}.....
                    {item?.bidderWalletAddress.substring(
                      item?.bidderWalletAddress.length - 15
                    )}
                  </td>

                  <td>
                    {nftDetail?.isMintedByMe &&
                    nftDetail != null &&
                    nftDetail?.activeMarketplace != false ? (
                      <>
                        {item?.isActive && !acceptedBid ? (
                          <button
                            disabled={loading}
                            onClick={() => {
                              handleBidValue(item, index);
                            }}
                          >
                            {activeIndex === index ? (
                              <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="16"
                                visible={true}
                              />
                            ) : (
                              "Accept"
                            )}
                          </button>
                        ) : (
                          <button
                            className={styles.activeButton}
                            style={
                              !item?.isActive
                                ? { background: "red", border: "none" }
                                : null
                            }
                          >
                            {item?.isActive ? "Accept" : "Accepted"}
                          </button>
                        )}
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DropDownTab>
      </div>
    </>
  );
};

export default React.memo(PriceHistory);
