import Input from "../../../_common/Input/input";
import styles from "./offerModal.module.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  getWalletAddress,
  getWallets,
} from "../../../../services/namiWalletService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { handleMintedNfts } from "../../../../services/paymentService";
import { getNormalizedError } from "../../../../utilty/helpers";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
interface Props {
  handleMintedNftsApi?: () => void;
  setpopupvisible?: (prop: boolean) => void;
  currentPrice: number;
}
const OfferModal = (prop: Props) => {
  const { handleMintedNftsApi, setpopupvisible, currentPrice } = prop;
  const { nftDetails } = useSelector((state: any) => state?.nftDetail);
  const { user, namiWalletAddress } = useSelector((state: any) => state?.user);
  const [loading, setLoading] = useState(false);
  const countValue = nftDetails.count - nftDetails.available;
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: yup.object({
      amount: yup
        .number()
        .positive()
        .required("Amount is required")
        .min(1)
        .max(
          nftDetails?.listingPrice <= 0
            ? nftDetails.count - nftDetails.available > 0
              ? nftDetails.value * countValue
              : nftDetails.value
            : nftDetails.listingPrice
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, { resetForm });
    },
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      if (namiWalletAddress === null) {
        toast.info("Connect Wallet First");
        setLoading(false);
        setpopupvisible(false);
        return;
      }

      //  else if (
      //   nftDetails?.listingPrice > 0
      //     ? values.amount <= nftDetails?.listingPrice
      //     : values.amount <= currentPrice
      // ) {
      //   toast.error(
      //     `Enterd value must be greater then ${
      //       nftDetails?.listingPrice > 0 ? "listing Price" : "current value"
      //     }`
      //   );
      //   setLoading(false);
      //   return;
      // }

      const address = await getWalletAddress();

      let param = {
        biddingPrice: +values?.amount,
        bidderName: user?.name,
        bidderWalletAddress: address[0],
        bidderId: user?._id,
        bidderEmail: user?.email,
      };

      const res = await handleMintedNfts(nftDetails?.mintedNftId, param);
      toast.success("Your offer placed successfully");
      handleMintedNftsApi();
      setpopupvisible(false);
      resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
          <label>
            Make <span>Offer</span>
          </label>
          <div className={styles.inputWrapper}>
            {/* <div className={styles.secWrapper}>
              <Input
                type="text"
                Name="Name"
                style={{
                  backgroundColor: "black",
                  width: "100%",
                  padding: "0 5px",
                }}
                placeholder="name"
              />
            </div> */}
            <div className={styles.firstWrapper}>
              {/* <div className={styles.heading}>Available: 12.342 SOL</div> */}
              <div className={styles.input}>
                <Input
                  type="number"
                  wrapperStyle={{ rowGap: "0" }}
                  style={{
                    backgroundColor: "black",
                    width: "100%",
                    padding: "0 5px",
                  }}
                  placeholder="Enter Amount"
                  config={formik.getFieldProps("amount")}
                />
              </div>
              {formik.touched.amount && formik.errors.amount ? (
                <div className={styles.errorStyle}>{formik.errors.amount}</div>
              ) : null}
              {/* <div className={styles.heading}>Total amount Bid: 12.342 SOL</div> */}
            </div>
            {loading ? (
              <button type="button">
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="18"
                  visible={true}
                />
              </button>
            ) : (
              <button type="submit">Submit Offer</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default OfferModal;
