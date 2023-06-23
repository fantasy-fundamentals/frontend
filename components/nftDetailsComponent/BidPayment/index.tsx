import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { sendMultiTransactions } from "../../../services/namiWalletService";
import { NftOwnershipTransferInstant } from "../../../services/nft.services";
import { store } from "../../../store";
import {
  resetTimer,
  startTimer,
  stopTimer,
} from "../../../store/reducers/timerSlice";
import { getNormalizedError } from "../../../utilty/helpers";
import styles from "./bidPayment.module.scss";

interface prop {
  setpopupvisible?: (prop?: boolean) => void;
  data?: any;
  nftDetail?: any;
  handleRefresh?: () => void;
}

const BidPayment = (prop: prop) => {
  const { data, nftDetail, handleRefresh } = prop;
  const location = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalAmount, setTotalamount] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const { namiWalletAddress } = useSelector((state: any) => state?.user);

  const handlePayments = async () => {
    try {
      setLoading(true);
      await handleRefresh();
      if (namiWalletAddress === null) {
        toast.info("Please connect your wallet first");
        setLoading(false);
        return;
      } else if (prop?.nftDetail?.walletAddress === namiWalletAddress) {
        toast.info("This NFT belongs to you");
        setLoading(false);
        return;
      }

      const transactionNumberOrHash = await sendMultiTransactions(
        prop?.nftDetail?.walletAddress,

        prop?.nftDetail?.listingPrice > 0
          ? prop?.nftDetail?.listingPrice
          : Number(prop?.nftDetail?.value * prop?.nftDetail?.listingCount),

        fee
      );

      if (transactionNumberOrHash != undefined) {
        store.dispatch(startTimer());
        prop?.setpopupvisible(true);

        const params = {
          nftId: nftDetail?.mintedNftId,
          ownerAddress: nftDetail?.walletAddress,
          buyerAddress: namiWalletAddress,
          blockChainNftId: nftDetail?.blockChainMintedNftId?.id,
          quantity: Number(nftDetail?.listingCount),
        };

        const res = await NftOwnershipTransferInstant(params);
        toast.success(res?.data?.message);
        prop?.setpopupvisible(false);
        location.push("/dashboard/nfts");
        setLoading(false);
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

  useMemo(() => {
    if (prop?.nftDetail?.listingPrice > 0) {
      let price = Number(prop?.nftDetail?.listingPrice * 0.03);
      if (price < 1) {
        setFee(1);
        setTotalamount(Number(prop?.nftDetail?.listingPrice) + 1);
      } else {
        setFee(price);
        setTotalamount(Number(prop?.nftDetail?.listingPrice) + price);
      }
    } else {
      let price =
        Number(prop?.nftDetail?.value * prop?.nftDetail?.listingCount) * 0.03;
      if (price <= 1) {
        setFee(1);
        setTotalamount(
          Number(prop?.nftDetail?.value * prop?.nftDetail?.listingCount) + 1
        );
      } else {
        setFee(price);
        setTotalamount(
          Number(prop?.nftDetail?.value * prop?.nftDetail?.listingCount) + price
        );
      }
    }
  }, [totalAmount, fee]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexWrapper}>
        <div className={styles.name}>NFT Name:</div>
        <div className={styles.value}> {prop?.nftDetail?.meta?.name}</div>
      </div>
      <div className={styles.flexWrapper}>
        <div className={styles.name}>Price:</div>
        <div className={styles.value}>
          {prop?.nftDetail?.listingPrice > 0
            ? Number(prop?.nftDetail?.listingPrice)?.toLocaleString()
            : Number(prop?.nftDetail?.value)?.toLocaleString()}{" "}
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
          {Number(totalAmount)?.toLocaleString()} ADA
        </div>
      </div>

      <div className={styles.flexWrapper}>
        <div className={styles.name}>Owner Wallet:</div>
        <div className={styles.value}>
          {prop?.nftDetail?.walletAddress?.substring(0, 10)}.....
          {prop?.nftDetail?.walletAddress?.substring(
            prop?.nftDetail?.walletAddress?.length - 6
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
          <button
            onClick={() => !loading && handlePayments()}
            disabled={loading}
          >
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

export default BidPayment;
