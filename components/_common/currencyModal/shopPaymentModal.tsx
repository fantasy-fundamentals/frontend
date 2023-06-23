import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { RiPaypalFill } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import { CONSTANTS } from "../../../utilty/constants/walletConstants";
import useShopPayments from "../../../utilty/hooks/useShopPayments";
import styles from "./currencyModal.module.scss";

const stripePromise = loadStripe(CONSTANTS.STRIPE_ADDRESS);

interface prop {
  data?: any;
  setpopupvisible?: (prop?: boolean) => void;
}
const ShopPaymentModal = (props: prop) => {
  const { data, setpopupvisible } = props;
  const { handleNameWallet, loading, handlePaypalPayments } = useShopPayments(
    data,
    setpopupvisible
  );
  const [active, setActive] = useState(false);
  const [stripeActive, setStripeActive] = useState(false);

  return (
    <>
      {stripeActive ? (
        <>
          <Elements stripe={stripePromise}>
            <StripeForm data={data} setpopupvisible={setpopupvisible} />
          </Elements>
        </>
      ) : (
        //  : paypalActive ? (
        //   <>
        //     <PaypalForm />
        //   </>
        // )
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.heading}>
              <label>
                {active ? "Select Payment Method" : "Select Currency Type"}
              </label>
            </div>
            {active ? (
              <div className={styles.btnWrapper}>
                <button
                  className={styles.activeBtn}
                  onClick={() => setStripeActive(true)}
                >
                  Stripe
                </button>
                <button
                  className={styles.activeBtn}
                  onClick={() => !loading?.paypal && handlePaypalPayments()}
                  // onClick={() => setPaypalActive(true)}
                >
                  {loading?.paypal ? (
                    <RotatingLines width="20px" strokeColor="white" />
                  ) : (
                    <>
                      <RiPaypalFill />
                      &nbsp; PayPal
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className={styles.btnWrapper}>
                <button onClick={() => !loading?.namiWallet && setActive(true)}>
                  Fiat
                </button>
                <button
                  onClick={() => !loading?.namiWallet && handleNameWallet()}
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
  const { data, setpopupvisible } = props;
  const { handleSubmit, loading } = useShopPayments(data, setpopupvisible);
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

export default ShopPaymentModal;
