import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  connetWallet,
  getWalletAddress,
  getWallets,
  sendMultiTransactions,
} from "../../../../services/namiWalletService";
import {
  GetListingBid,
  NftOwnershipTransfer,
} from "../../../../services/nft.services";
import { store } from "../../../../store";
import {
  resetTimer,
  startTimer,
  stopTimer,
} from "../../../../store/reducers/timerSlice";
import {
  resetUserState,
  saveNamiWalletAddress,
} from "../../../../store/reducers/user";
import {
  NAMIWALLET_MESSAGE,
  NAMIWALLET_NETWORKID,
} from "../../../../utilty/constants/walletConstants";
import { getNormalizedError } from "../../../../utilty/helpers";
import styles from "./confirm.module.scss";

interface prop {
  setpopupvisible?: (prop?: boolean) => void;
  locationData?: any;
  bidderData?: any;
}

const ConfirmModal = (prop: prop) => {
  const dispatch = useDispatch();
  const location = useRouter();
  const [data, setData] = useState<any>();
  const [totalAmount, setTotalamount] = useState<number>(0);

  const [fee, setFee] = useState<number>(0);
  const bidderValue = prop?.bidderData?.find(
    (item: any) => item?.bidderId === prop?.locationData?.bidId
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { nftDetails } = useSelector((state: any) => state?.nftDetail);
  const { user, namiWalletAddress } = useSelector((state: any) => state?.user);
  const totalCount = data?.mintedNftId?.count - data?.mintedNftId?.available;
  const namiWalletConnect = async () => {
    try {
      // var config: any = {
      //   method: "get",
      //   url: `${defaultConfig?.Base_URL}auth/verify-jwt`,
      //   headers: {
      //     Authorization: `Bearer ${prop?.locationData?.token}`,
      //   },
      // };
      // const response = await axios(config);
      // console.log(
      //   "🚀 ~ file: confirmModal.tsx:92 ~ namiWalletConnect ~ response",
      //   response
      // );

      let wallets = await getWallets();

      if (wallets?.length === 0) {
        toast.info("Please Install Nami Wallet & Reload the site");
        return;
      }

      const wallet = await connetWallet();
      const networkId = await wallet.getNetworkId();
      if (networkId != NAMIWALLET_NETWORKID.NETWORK) {
        toast.error(NAMIWALLET_MESSAGE.MESSAGE);
        return;
      }

      const address = await getWalletAddress();
      dispatch(saveNamiWalletAddress(address[0]));
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
      dispatch(resetUserState());
      location.push("/");
    }
  };

  const handlePayments = async () => {
    try {
      setLoading(true);
      if (namiWalletAddress === null) {
        await namiWalletConnect();
        setLoading(false);
      } else if (namiWalletAddress == data?.mintedNftId?.walletAddress) {
        toast.info("This Nft already belongs to you");
        setLoading(false);
        return;
      }

      const transactionNumberOrHash = await sendMultiTransactions(
        data?.mintedNftId?.walletAddress,
        Number(
          // data?.biddingPrice > 0
          //   ?

          data?.biddingPrice
          // : data?.mintedNftId?.listingPrice
        ),
        fee
      );
      if (transactionNumberOrHash != undefined) {
        store.dispatch(startTimer());
        prop?.setpopupvisible(true);

        const params = {
          nftId: data?.mintedNftId?._id,
          ownerAddress: data?.mintedNftId?.walletAddress,
          buyerAddress: namiWalletAddress,
          blockChainNftId: data?.mintedNftId?.mintedIds[0]?.id,
          quantity: Number(totalCount),
          // quantity: 2,
        };
        const res = await NftOwnershipTransfer(params);
        toast.success(res?.data?.message);
        location.push("/dashboard/nfts");
        setLoading(false);
        prop?.setpopupvisible(false);
      }

      setLoading(false);
    } catch (error) {
      prop?.setpopupvisible(true);
      store.dispatch(stopTimer());
      store.dispatch(resetTimer());
      const err = getNormalizedError(error);
      toast.error(err || "Request failed");
      setLoading(false);
    }
  };

  const handlenNftDetail = async () => {
    try {
      const res = await GetListingBid(prop?.locationData?.bidId);
      setData(res?.data);
      setFee(
        res?.data?.biddingPrice * 0.03 < 1 ? 1 : res?.data?.biddingPrice * 0.03
      );
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  // useMemo(() => {
  //   if (data?.mintedNftId?.listingPrice > 0) {
  //     let price = Number(data?.mintedNftId?.listingPrice * 0.03);
  //     if (price < 1) {
  //       setFee(1);
  //       setTotalamount(Number(data?.mintedNftId?.listingPrice) + 1);
  //     } else {
  //       setFee(price);
  //       setTotalamount(Number(data?.mintedNftId?.listingPrice) + price);
  //     }
  //   } else {
  //     let price =
  //       Number(
  //         data?.mintedNftId?.count === 0
  //           ? data?.biddingPrice
  //           : data?.biddingPrice * data?.mintedNftId?.count
  //       ) * 0.03;
  //     if (price <= 1) {
  //       setFee(1);
  //       setTotalamount(
  //         Number(
  //           data?.mintedNftId?.count === 0
  //             ? data?.biddingPrice
  //             : data?.biddingPrice * data?.mintedNftId?.count
  //         ) + 1
  //       );
  //     } else {
  //       setFee(price);
  //       setTotalamount(
  //         Number(
  //           data?.mintedNftId?.count === 0
  //             ? data?.biddingPrice
  //             : data?.biddingPrice * data?.mintedNftId?.count
  //         ) + price
  //       );
  //     }
  //   }
  // }, [totalAmount, fee]);

  useMemo(() => {
    handlenNftDetail();
    if (
      namiWalletAddress === undefined ||
      (namiWalletAddress === null &&
        prop?.locationData?.[`bid-accepted`] === "true" &&
        user?.accessToken != null)
    ) {
      namiWalletConnect();
    }
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.flexWrapper}>
        <div className={styles.name}>NFT Name:</div>
        <div className={styles.value}> {nftDetails?.playerDetail?.Name}</div>
      </div>
      <div className={styles.flexWrapper}>
        <div className={styles.name}>Price:</div>
        <div className={styles.value}>
          {
            // data?.biddingPrice > 0
            //   ?
            data?.biddingPrice
            // : nftDetails?.listingPrice}{" "}
          }
          ADA
        </div>
      </div>
      <div className={styles.flexWrapper}>
        <div
          className={styles.name}
          id="won"
          style={{
            cursor: "help",
            textDecoration: "underline",
          }}
        >
          Fee:?
        </div>
        <div className={styles.value}>3%</div>
      </div>
      <ReactTooltip
        anchorId="won"
        place="bottom"
        content="If the fee amount is less than 1 ADA due to network restrictions, the platform will charge you 1 ADA."
        variant="info"
      />

      <div className={styles.flexWrapper}>
        <div className={styles.name}>Total Amount:</div>
        <div className={styles.value}>
          {Number(data?.biddingPrice + fee)?.toLocaleString()} ADA
        </div>
      </div>

      <div className={styles.flexWrapper}>
        <div className={styles.name}>Owner Wallet:</div>
        <div className={styles.value}>
          {data?.mintedNftId?.walletAddress?.substring(0, 10)}.....
          {data?.mintedNftId?.walletAddress?.substring(
            data?.mintedNftId?.walletAddress?.length - 6
          )}
        </div>
      </div>
      {/* <div className={styles.flexWrapper}>
        <div className={styles.name}>Owner Name:</div>
        <div className={styles.value}>{prop?.locationData?.name}</div>
      </div> */}
      <div className={styles.flexWrapper}>
        <div className={styles.name}>Your Address:</div>
        <div className={styles.value}>
          {namiWalletAddress?.substring(0, 10)}.....
          {namiWalletAddress?.substring(namiWalletAddress?.length - 6)}
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <div className={styles.btnWrapper}>
          <button onClick={() => !loading && handlePayments()}>
            {loading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="18"
                visible={true}
              />
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConfirmModal);
