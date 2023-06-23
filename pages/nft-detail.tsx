import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import DetailComponent from "../components/nftDetailsComponent/detailComponent";
import Listings from "../components/nftDetailsComponent/listings";
import PriceHistory from "../components/nftDetailsComponent/priceHistory";
import Prices from "../components/nftDetailsComponent/prices";
import PrivateRoute from "../components/PrivateRoute";
import ConfirmModal from "../components/_common/currencyModal/confirmModal/confirmModal";
import Modal1 from "../components/_common/modal/modal1";
import { getMintedNfts } from "../services/paymentService";
import { saveNftDetails } from "../store/reducers/nftSlice";
import styles from "../styles/nftDetail.module.scss";
import { SocketContext } from "../utilty/context/socket";
import { SOCKET_TYPES } from "../utilty/enums/socket.enum";
import { getNormalizedError } from "../utilty/helpers";
const NftDetails = () => {
  const dispatch = useDispatch();
  const location: any = useRouter();
  const socket: Socket = useContext(SocketContext);
  const [data, setData]: any = useState();
  const [totalMinted, setTotalMinted] = useState();
  const [loading, setLoading] = useState(false);
  const [totalBiddings, setTotalBiddings] = useState();
  const { nftDetails } = useSelector((state: any) => state?.nftDetail);

  const { user } = useSelector((state: any) => state?.user);
  const bidAccepted = location?.query?.["bid-accepted"];
  const [popupvisible, setpopupvisible] = useState<boolean>(
    Boolean(bidAccepted)
  );

  const toggleData = () => {
    setpopupvisible(false);
  };

  const handleMintedNfts = async () => {
    try {
      setLoading(true);
      const res = await getMintedNfts(
        location?.query?.mintedNftId
          ? location?.query?.mintedNftId
          : location?.query?.nftId
      );

      dispatch(saveNftDetails(res?.data?.data?.nft));
      setData(res?.data?.data?.biddings?.reverse());
      setTotalMinted(res?.data?.totalMinted);
      setTotalBiddings(res?.data?.data?.biddings?.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const IntSocket = useCallback(() => {
    socket.on("connect_error", (e: any) => {});

    socket.off(SOCKET_TYPES.NFT_BIDS).on(SOCKET_TYPES.NFT_BIDS, (data: any) => {
      if (
        location?.query?.mintedNftId
          ? location?.query?.mintedNftId === data?.mintedNftId
          : location?.query?.nftId === data?.mintedNftId
      ) {
        setData(data?.data);
      }
    });
    //****transfer */
    socket
      .off(SOCKET_TYPES.NFTOWNERSHIP_TRANSFER)
      .on(SOCKET_TYPES.NFTOWNERSHIP_TRANSFER, (data: any) => {
        if (data?.data?._id === nftDetails?.mintedNftId) {
          if (
            (nftDetails?.isMintedByMe && nftDetails?.available > 0) ||
            (!nftDetails?.isMintedByMe && nftDetails?.available > 0)
          ) {
            handleMintedNfts();
          }

          if (!nftDetails?.isMintedByMe) {
            if (
              data?.data?.transfer &&
              data?.data?.success &&
              data?.data?.userEmail === user?.email
            ) {
              location.push("/dashboard/nfts");
            } else if (data?.data?.userEmail != user?.email) {
              toast.info("NFT not available");
            }
          } else {
            if (nftDetails?.available > 0) {
              toast.success("NFT sold out");
            } else {
              toast.success("NFT sold out");
              location.push("/dashboard/nfts");
            }
          }
        }
      });
    //****toggle */
    socket
      .off(SOCKET_TYPES.ACTIVE_MARKETPLACE)
      .on(SOCKET_TYPES.ACTIVE_MARKETPLACE, (data: any) => {
        if (
          !data?.data?.isMinted &&
          !data?.data?.activeMarketplace &&
          data?.data?._id === nftDetails?.mintedNftId
        ) {
          toast.error("NFT not available for purchases");
          location.push("/marketplace");
        }
      });
    //****burn */
    socket.off(SOCKET_TYPES.BURN).on(SOCKET_TYPES.BURN, (data: any) => {
      console.log("🚀 ~ file: nft-detail.tsx:99 ~ socket.off ~ data:", data);
      if (data?.data?._id === nftDetails?.mintedNftId) {
        if (nftDetails?.isMintedByMe && data?.data?.burn) {
          location.push("/dashboard/nfts");
        } else if (!nftDetails?.isMintedByMe && data?.data?.burn) {
          toast.error("NFT not available");
          location.push("/marketplace");
        }
      }
    });

    return () => {
      socket.removeListener(SOCKET_TYPES.NFT_BIDS);
    };
  }, []);

  useMemo(() => {
    if (Object.keys(location?.query)?.length === 0) {
      location.push("/404");
    }
    handleMintedNfts();
  }, []);

  useEffect(() => {
    IntSocket();
  }, []);

  return (
    <PrivateRoute>
      <Modal1 visible={popupvisible} onClose={() => toggleData()}>
        <ConfirmModal
          setpopupvisible={setpopupvisible}
          locationData={location?.query}
          bidderData={data}
        />
      </Modal1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* <div className={styles.alert}>
            One wallet address should link with one account, Not with other
            accounts.
          </div> */}
          <div className={styles.mainWrapper}>
            <div className={styles.topWrapper}>
              <div className={styles.left}>
                <div className={styles.orderWrapper}>
                  <DetailComponent
                    totalBiddings={totalBiddings}
                    nftDetail={nftDetails}
                    totalMinted={totalMinted}
                  />
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.orderWrapper}>
                  <Prices
                    loading={loading}
                    totalMinted={totalMinted}
                    currentPrice={nftDetails?.value}
                    name={nftDetails?.playerDetail?.Name}
                    showSale={false}
                    handleMintedNfts={handleMintedNfts}
                    nftDetail={nftDetails}
                  />
                </div>
                <div className={styles.orderWrapper}>
                  <Listings data={data} />
                </div>
              </div>
            </div>
            <div className={styles.middleWrapper}>
              {/* <div className={styles.left}>
                <div className={styles.orderWrapper}>
                  <Description description="-" tokenID="-" />
                </div>
                <div className={styles.orderWrapper}>
                <Properties attributes="rtyhj" />
              </div>
              </div> */}
              {/* <div className={styles.right}> */}
              {/* <div className={styles.orderWrapper}> */}
              <div className={styles.right}>
                <PriceHistory
                  data={data}
                  nftDetail={nftDetails}
                  handleRefresh={handleMintedNfts}
                />
              </div>
              {/* </div>
                <div className={styles.orderWrapper}>
                  <Offres />
                </div> */}
              {/* </div> */}
            </div>
          </div>
          {/* <div className={styles.bottomWrapper}>
            <label>
              Leave &nbsp;<span>Comments</span>
            </label>
            <Activity />
          </div> */}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default NftDetails;
