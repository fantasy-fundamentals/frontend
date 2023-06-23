import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./Detail.module.scss";
type Props = {
  totalBiddings?: number;
  nftDetail: any;
  totalMinted?: any;
};
const DetailComponent = (props: Props) => {
  const location = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <label>Player</label>
          <p>
            {props.nftDetail?.playerDetail?.Name
              ? props.nftDetail?.playerDetail?.Name
              : "-"}
          </p>
        </div>

        <div className={styles.secWrapper}>
          <span>Total Biddings</span>
          <span>{props?.totalBiddings ? props?.totalBiddings : 0}</span>
        </div>
        {props?.nftDetail?.isMintedByMe && (
          <div className={styles.secWrapper}>
            <span>Minted Counts</span>
            <span>{props.nftDetail?.count ? props.nftDetail?.count : "-"}</span>
          </div>
        )}
        <div className={styles.secWrapper}>
          <span>
            {props?.nftDetail?.isMintedByMe
              ? "Available Counts"
              : "Available for Marketplace"}
          </span>
          <span>
            {props?.nftDetail?.isMintedByMe
              ? props.nftDetail?.available
              : Number(props?.nftDetail?.count - props.nftDetail?.available)}
          </span>
        </div>
        {/* <div className={styles.secWrapper}>
          <span>Market Cap</span>
          <span>
            {props.totalMinted
              ? `${props.totalMinted * props.nftDetail?.value} ADA`
              : "-"}
          </span>
        </div> */}
        {/* <div className={styles.secMidWrapper}>
          <label>
            Birth Date{" "}
            <p>
              {props.nftDetail?.playerDetail?.BirthDateString
                ? props.nftDetail?.playerDetail?.BirthDateString
                : "-"}
            </p>
          </label>
        </div> */}
        <div className={styles.secMidWrapper}>
          <label>
            Height
            <p>
              {props.nftDetail?.playerDetail?.Height
                ? props.nftDetail?.playerDetail?.Height
                : "-"}
            </p>
          </label>
          <label>
            Weight
            <p>
              {props.nftDetail?.playerDetail?.Weight
                ? props.nftDetail?.playerDetail?.Weight
                : "-"}
            </p>
          </label>
        </div>
        <div className={styles.secMidWrapper}>
          <label>
            Experience
            <p>
              {props.nftDetail?.playerDetail?.Experience
                ? props.nftDetail?.playerDetail?.Experience
                : "-"}
            </p>
          </label>
          <label>
            Age
            <p>
              {props.nftDetail?.playerDetail?.Age
                ? props.nftDetail?.playerDetail?.Age
                : "-"}
            </p>
          </label>
        </div>
        <div className={styles.bottomWrapper}>
          <label>Current value</label>
          <p>
            {props.nftDetail?.value
              ? Number(props.nftDetail?.value)?.toLocaleString()
              : "0"}{" "}
            ADA
          </p>
        </div>
        <button
          onClick={() => {
            location.push({
              pathname: "/player-info",
              query: { playerId: props?.nftDetail?.playerId },
            });
          }}
        >
          Player Detail
        </button>
      </div>
    </div>
  );
};

export default React.memo(DetailComponent);
