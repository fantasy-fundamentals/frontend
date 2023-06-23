import { useEffect, useMemo, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import styles from "./listingModal.module.scss";

interface Props {
  data: any;
  counter: number;
  setCounter: (prop: number) => void;
  handleListingData: () => void;
  loading?: boolean;
  setListingpriceValue?: (prop: number) => void;
  listingPricevalue?: number;
}
const ListingModal = (prop: Props) => {
  const {
    handleListingData,
    setCounter,
    counter,
    data,
    loading,
    listingPricevalue,
    setListingpriceValue,
  } = prop;

  const handleValue = (amount) => {
    const regex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
    if (regex.test(amount)) {
      return amount;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.counter}>
          <label>how much nft's you want to Sell :</label>
          <div className={styles.countBtnWrapper}>
            <button
              className={styles.decrease}
              onClick={() => {
                if (counter <= 1) {
                  return 1;
                } else {
                  setCounter(counter - 1);
                }
              }}
            >
              -
            </button>
            <input
              className={styles.countValue}
              min={1}
              max={1000}
              type="number"
              value={counter}
              onChange={(e) => {
                const amount = e?.target?.value;
                const floatRegExp = new RegExp(/^[1-9]\d*$/);

                if (Number(amount) === 0) {
                  return 1;
                } else if (amount > data?.nftDetail?.count) {
                  return data?.nftDetail?.count;
                } else if (floatRegExp.test(amount)) {
                  setCounter(Number(amount));
                }
              }}
            />
            {/* {counter}
                  </input> */}
            <button
              className={styles.increase}
              onClick={() => {
                if (counter >= data?.nftDetail?.count) {
                  return data?.nftDetail?.count;
                } else setCounter(counter + 1);
              }}
            >
              +
            </button>
          </div>

          <div className={styles.listingpriceBtnWrapper}>
            <input
              className={styles.listingPriceValue}
              placeholder="Listing Price"
              disabled={loading}
              type="number"
              value={listingPricevalue ? listingPricevalue : ""}
              onChange={(e) => {
                const amount = e?.target?.value;
                const res = handleValue(amount);
                setListingpriceValue(res);
              }}
            />
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button onClick={() => !loading && handleListingData()}>
            {loading ? (
              <RotatingLines width="20px" strokeColor="white" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ListingModal;
