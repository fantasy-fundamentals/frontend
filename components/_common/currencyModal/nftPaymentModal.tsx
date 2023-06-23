import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { RiPaypalFill } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { HandleNftisMinted } from "../../../services/nft.services";
import { CONSTANTS } from "../../../utilty/constants/walletConstants";
import { getNormalizedError } from "../../../utilty/helpers";
import usePayments from "../../../utilty/hooks/useNftPayments";
import styles from "./currencyModal.module.scss";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(CONSTANTS.STRIPE_ADDRESS);

interface prop {
  data?: any;
  setpopupvisible?: (prop?: boolean) => void;
  counter?: number;
}
const NftPaymentModal = (props: prop) => {
  const { data, setpopupvisible } = props;
  const { usdPrice } = useSelector((state: any) => state?.shopDetail);
  const [counter, setCounter] = useState<number>(1);
  const [active, setActive] = useState(false);
  const [stripeActive, setStripeActive] = useState(false);
  const [mintedLoading, setMintedLoading] = useState(false);
  const [minted, setMinted] = useState(true);
  const multiValue = data?.value * 0.25;
  const handleMintedNft = async () => {
    try {
      setMintedLoading(true);
      const res = await HandleNftisMinted(data?._id);
      setMinted(res?.data);
      setMintedLoading(false);
    } catch (error) {
      setMintedLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const { handleNameWallet, loading, handlePaypalPayments } = usePayments(
    data,
    setpopupvisible,
    counter,
    minted
  );

  useEffect(() => {
    handleMintedNft();
  }, []);

  return (
    <>
      {mintedLoading ? (
        <div className={styles.loadingData}>
          <RotatingLines width="40px" strokeColor="white" />
          <div className={styles.loadingHeading}>
            LOADING...<span>PLEASE WAIT</span>
          </div>
        </div>
      ) : stripeActive ? (
        <>
          <Elements stripe={stripePromise}>
            <StripeForm
              data={data}
              setpopupvisible={setpopupvisible}
              counter={counter}
            />
          </Elements>
        </>
      ) : (
        // paypal ? (
        //   <>
        //     <PaypalForm />
        //   </>
        // ) :
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {!active && (
              <div className={styles.counter}>
                <label>how much nft's you want to mint :</label>
                <div className={styles.countBtnWrapper}>
                  <button
                    className={styles.decrease}
                    onClick={() => {
                      if (counter <= 1) {
                        return 1;
                      } else {
                        !loading?.namiWallet && !mintedLoading
                          ? setCounter(counter - 1)
                          : null;
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
                    disabled={loading?.namiWallet && mintedLoading}
                    onChange={(e) => {
                      const amount = e?.target?.value;
                      const floatRegExp = /^[1-9]\d*$/;

                      if (Number(amount) === 0) {
                        return setCounter(1);
                      }

                      if (floatRegExp.test(amount)) {
                        setCounter(Number(amount));
                      }
                    }}
                  />
                  {/* {counter}
                  </input> */}
                  <button
                    className={styles.increase}
                    onClick={() =>
                      !loading?.namiWallet && !mintedLoading
                        ? setCounter(counter + 1)
                        : null
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            <div className={styles.heading}>
              {/* <label>
                {active ? "Select Payment Method" : "Select Currency Type :"}
              </label> */}
              {/* {!minted && ( */}
              <p
                style={{
                  margin: "0",
                  color: "rgb(255 79 79)",
                  fontSize: "15px",
                }}
              >
                Fee on mint:25%
              </p>
              <div className={styles.playerDetailWrapper}>
                <div className={styles.headingWrapper}>
                  NFT Name:&nbsp;{data?.meta?.name}
                </div>
                <div className={styles.priceWrapper}>
                  Fee:&nbsp;{Number(multiValue * counter)?.toLocaleString()} ADA
                  &nbsp;
                  <span>
                    ${Number(multiValue * counter * usdPrice)?.toLocaleString()}
                  </span>
                </div>
                <div className={styles.priceWrapper}>
                  Price:&nbsp;{Number(data?.value)?.toLocaleString()} ADA &nbsp;
                  <span>
                    ${Number(data?.value * usdPrice)?.toLocaleString()}
                  </span>
                </div>
                <div className={styles.priceWrapper}>
                  Total Amount:&nbsp;
                  {Number(
                    (data?.value + multiValue) * counter
                  )?.toLocaleString()}{" "}
                  ADA &nbsp;
                  <span>
                    $
                    {Number(
                      (data?.value + multiValue) * counter * usdPrice
                    )?.toLocaleString()}
                  </span>
                </div>
              </div>
              {/* )} */}
            </div>
            {active ? (
              <div className={styles.btnWrapper}>
                <button
                  className={styles.activeBtn}
                  onClick={() => setStripeActive(true)}
                >
                  Stripe
                </button>
                {/* <button
                  className={styles.activeBtn}
                  onClick={() => !loading?.paypal && handlePaypalPayments()}
                  // onClick={() => setPaypal(true)}
                >
                  {loading?.paypal ? (
                    <RotatingLines width="20px" strokeColor="white" />
                  ) : (
                    <>
                      <RiPaypalFill />
                      &nbsp; PayPal
                    </>
                  )}
                </button> */}
              </div>
            ) : (
              <div className={styles.btnWrapper}>
                {/* <button
                  onClick={() =>
                    !loading?.namiWallet && !mintedLoading
                      ? setActive(true)
                      : null
                  }
                >
                  Fiat
                </button> */}
                <button
                  onClick={() =>
                    !loading?.namiWallet && !mintedLoading
                      ? handleNameWallet()
                      : null
                  }
                >
                  {loading?.namiWallet ? (
                    <RotatingLines width="20px" strokeColor="white" />
                  ) : (
                    "Crypto"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const StripeForm = (props: prop) => {
  const { data, setpopupvisible, counter } = props;
  const { handleSubmit, loading } = usePayments(data, setpopupvisible, counter);
  const stripe = useStripe();
  const elements = useElements();

  return (
    <div className={styles.stripeFormModal}>
      <h1>Pay with Stripe</h1>
      <CardElement
        id="card-element"
        options={{
          iconStyle: "solid",
          style: {
            base: {
              fontSize: "16px",
              lineHeight: "1.5",
              "::placeholder": {
                fontSize: "14px",
                color: "white",
              },
              ":focus": {
                color: "white",
              },
            },
            empty: {
              color: "gray",
              "::placeholder": {
                color: "#a4a4a4",
              },
              ":focus": {
                color: "white",
              },
            },
            invalid: {
              color: "red",
            },
            complete: {
              backgroundColor: "transparent",
              color: "green",
            },
          },
        }}
      />
      <button
        onClick={!loading?.stripe ? handleSubmit(stripe, elements) : null}
      >
        {loading?.stripe ? (
          <RotatingLines width="20px" strokeColor="white" />
        ) : (
          "Mint Now"
        )}
      </button>
    </div>
  );
};

// const PaypalForm = () => {
//   return (
//     <div style={{ padding: "1.8rem 1rem" }}>
//       <PayPalScriptProvider
//         options={{
//           "client-id":
//             "AdEW0xw2afT-IWOhNNBiSa18ty9Y3qpsv2wEZex4H-KCt4mmTmbGgRN_lCYaX_N1muIjOuQBcnuL9kph",
//         }}
//       >
//         <PayPalButtons
//           // style={{ layout: "horizontal" }}
//           className={styles.paypalButtons}
//           createOrder={(data, actions) => {
//             return actions.order.create({
//               purchase_units: [
//                 {
//                   amount: {
//                     value: "1.99",
//                   },
//                 },
//               ],
//             });
//           }}
//           onApprove={(data, actions) => {
//             return actions?.order.capture().then((details) => {
//               console.log(
//                 "🚀 ~ file: index.tsx:178 ~ returnactions?.order.capture ~ details",
//                 details
//               );
//               const name = details?.payer?.name?.given_name;
//               alert(`Transaction completed by ${name}`);
//             });
//           }}
//         />
//       </PayPalScriptProvider>
//     </div>
//   );
// };

export default NftPaymentModal;
