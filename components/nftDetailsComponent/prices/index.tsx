import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Modal1 from "../../_common/modal/modal1";
import WarningModal from "../../_common/warningModal";
import ListingModal from "./listingModal";
import OfferModal from "./offerModal";
import styles from "./prices.module.scss";
import useMarketlisting from "./useMarketlisting";

type Props = {
  showSale: boolean;
  name: string;
  currentPrice: number;
  handleMintedNfts?: () => void;
  nftDetail?: any;
  totalMinted?: any;
  loading?: boolean;
};

const Prices = (props: Props) => {
  const {
    popupvisible,
    listingLoading,
    togglepopup,
    setpopupvisible,
    setListingPopupvisible,
    listingPopupvisible,
    handleListingData,
    setCounter,
    counter,
    listingPricevalue,
    setListingpriceValue,
    loader,
    handleBurnNfts,
    setBurningPopupvisible,
    burningPopupvisible,
  } = useMarketlisting(props);

  const { usdPrice } = useSelector((state: any) => state?.shopDetail);
  const { nftDetails } = useSelector((state: any) => state?.nftDetail);

  return (
    <>
      <Modal1
        visible={popupvisible}
        btn
        onClose={() => setpopupvisible(false)}
        backgroundColor
      >
        <OfferModal
          handleMintedNftsApi={props.handleMintedNfts}
          setpopupvisible={setpopupvisible}
          currentPrice={props?.currentPrice}
        />
      </Modal1>
      <Modal1
        visible={burningPopupvisible}
        btn
        onClose={() => !loader && setBurningPopupvisible(false)}
      >
        <WarningModal
          setpopupvisible={setBurningPopupvisible}
          heading="This action cannot be undone once the burn takes place!"
          onClick={() => !loader && handleBurnNfts()}
          btn1="Cancel"
          btn2="Burn NFT"
          loader={loader}
        />
      </Modal1>
      <Modal1
        visible={listingPopupvisible}
        btn
        onClose={() => {
          setListingPopupvisible(false),
            setCounter(1),
            setListingpriceValue(null);
        }}
        backgroundColor
      >
        <ListingModal
          handleListingData={handleListingData}
          setCounter={setCounter}
          counter={counter}
          data={props}
          loading={listingLoading}
          setListingpriceValue={setListingpriceValue}
          listingPricevalue={listingPricevalue}
        />
      </Modal1>
      <div className={styles.headingWrapper}>
        <label>{props?.name ? props?.name : "-"}</label>
        <p>
          Total Minted NFT's:&nbsp;
          <span>
            {props?.totalMinted
              ? Number(props?.totalMinted)?.toLocaleString()
              : "-"}
          </span>
        </p>
      </div>
      {props?.loading ? (
        <div className={styles.cardWrapper}>
          <div className={styles.header}>-</div>
          <div
            className={styles.price}
            style={{
              height: "250px",
              color: "white",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            L
            <RotatingLines
              strokeColor="#fff"
              strokeWidth="5"
              animationDuration="0.75"
              width="16"
              visible={true}
            />
            ADING...
          </div>
        </div>
      ) : (
        <div className={styles.cardWrapper}>
          <div className={styles.header}>
            {/* Sale ends September 12,2022  */}
          </div>
          <div className={styles.price}>
            <div className={styles.leftWrapper}>
              {" "}
              <label>Total Value</label>
              <p>
                {/* <img src={"/icons/cardano.svg"} alt="" /> */}
                {props?.currentPrice
                  ? Number(
                      props?.nftDetail?.count === 0
                        ? props?.nftDetail?.count
                        : props?.currentPrice * props?.nftDetail?.count
                    )?.toLocaleString()
                  : "-"}
                <span>
                  {props?.currentPrice &&
                    `$ ${Number(
                      props?.nftDetail?.count === 0
                        ? props?.currentPrice * usdPrice
                        : props?.currentPrice *
                            props?.nftDetail?.count *
                            usdPrice
                    )?.toLocaleString()}`}
                </span>
              </p>
              <div className={styles.listingPrice}>
                <label>Listing Price</label>
                <p>
                  {nftDetails?.listingPrice > 0 && (
                    <img src={"/icons/cardano.svg"} alt="" />
                  )}
                  {nftDetails?.listingPrice > 0 ? (
                    Number(nftDetails?.listingPrice)?.toLocaleString()
                  ) : (
                    <span
                      style={{
                        fontSize: "14px",
                        paddingTop: "0.5rem",
                        textTransform: "uppercase",
                        color: "red",
                      }}
                    >
                      {props?.nftDetail?.activeMarketplace
                        ? "Open to any Price"
                        : "-"}
                    </span>
                  )}
                  <span>
                    {nftDetails?.listingPrice > 0 &&
                      `$${(
                        nftDetails?.listingPrice * usdPrice
                      )?.toLocaleString()}`}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.rightWrapper}>
              <label>Market Cap:</label>
              <p>
                {props?.totalMinted
                  ? `${Number(
                      props?.totalMinted * props?.currentPrice
                    )?.toLocaleString()} ADA`
                  : "-"}
              </p>
            </div>
          </div>

          <div className={styles.btnWrapper}>
            {!props?.nftDetail?.isMintedByMe && props?.nftDetail != null ? (
              <button
                onClick={togglepopup}
                // className={
                //   props?.nftDetail?.isMintedByMe ? styles.activeButton : null
                // }
              >
                Make Offer
                {/* <MdLocalOffer className={styles.icon} /> */}
              </button>
            ) : null}
            {props?.nftDetail?.activeMarketplace != undefined &&
            props?.nftDetail?.isMintedByMe === true ? (
              <div className={styles.listing}>
                {" "}
                <span>
                  Marketplace <span>Listing</span>
                </span>
                <div className={styles.toggle}>
                  {listingLoading ? (
                    <button>
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="16"
                        visible={true}
                      />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          props?.nftDetail?.activeMarketplace &&
                          handleListingData()
                        }
                        className={
                          !props?.nftDetail?.activeMarketplace
                            ? styles.activeButton
                            : null
                        }
                      >
                        Off
                      </button>
                      <button
                        onClick={() =>
                          !props?.nftDetail?.activeMarketplace &&
                          setListingPopupvisible(true)
                        }
                        className={
                          props?.nftDetail?.activeMarketplace
                            ? styles.activeButton
                            : null
                        }
                      >
                        On
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : null}
            {props?.nftDetail?.isMintedByMe === true &&
            props?.nftDetail?.activeMarketplace &&
            props?.nftDetail != null ? (
              <button
                onClick={() => setBurningPopupvisible(true)}
                className={styles.burnButton}
              >
                Burn NFT
                {/* <MdLocalOffer className={styles.icon} /> */}
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Prices);
