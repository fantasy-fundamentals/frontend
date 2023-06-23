import { CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  CreateWalletOrder,
  generateSecForPayment,
  getCurrencyRates,
  handlePaypalPayment,
} from "../../services/paymentService";
import { saveCardanoPrice } from "../../store/reducers/shopSlice";
import { CONSTANTS, PAYMENT } from "../constants/walletConstants";
import { getNormalizedError } from "../helpers";
import {
  getWalletAddress,
  getWallets,
  sendMultiTransactions,
  sendTransactions,
} from "../../services/namiWalletService";
import { store } from "../../store";
import { startTimer } from "../../store/reducers/timerSlice";

interface LOADING_PROPS {
  namiWallet?: boolean;
  paypal?: boolean;
  stripe?: boolean;
}

const useNftPayments = (
  data?: any,
  setpopupvisible?: (prop?: boolean) => void,
  counter?: number,
  minted?: boolean
) => {
  const { user, namiWalletAddress } = useSelector((state: any) => state?.user);
  const { usdPrice } = useSelector((state: any) => state?.shopDetail);
  const [namiUpdate, setNamiUpdate] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<LOADING_PROPS>({
    namiWallet: false,
    paypal: false,
    stripe: false,
  });

  ////*******Payment with Nami Wallet */

  const handleNameWallet = async (item?: any) => {
    try {
      setLoading({
        namiWallet: true,
      });

      if (namiWalletAddress === null) {
        toast.info("Connect Wallet First");
        setLoading({
          namiWallet: false,
        });
        return;
      }
      // const multiValue = data?.value * 0.25;
      const multiValue = data?.value * 0.25;

      let walletParams = {
        userId: user?._id,
        nftId: data?._id,
        walletAddress: namiWalletAddress,
        transactionNumberOrHash: await sendMultiTransactions(
          CONSTANTS.MAIN_WALLET_ADDRESS,
          Number(data?.value * counter),
          Number(multiValue * counter)
        ),

        amount:
          //  !minted
          //   ?
          String(Number(data?.value * counter) + multiValue),
        // : String(data?.value * counter),
        countOfNftToMint: counter,
      };

      if (walletParams?.transactionNumberOrHash === undefined) {
        setLoading({
          namiWallet: false,
        });
        setpopupvisible(false);
        return;
      }
      store.dispatch(startTimer());
      const res = await CreateWalletOrder(walletParams);
      toast.success(res?.data?.message);

      setLoading({
        namiWallet: false,
      });
      setpopupvisible(false);
    } catch (error) {
      setpopupvisible(false);
      setNamiUpdate(true);
      setLoading({
        namiWallet: false,
      });
      const err = getNormalizedError(error);
      toast.error(err || "Request failed");
    }
  };

  ////*******Payment with Paypal */

  const handlePaypalPayments = async () => {
    try {
      setLoading({
        paypal: true,
      });

      if (namiWalletAddress === null) {
        toast.info("Connect Wallet First");
        setLoading({
          namiWallet: false,
        });
        return;
      }
      const multiValue = data?.value * 0.25;
      let params = {
        currency: PAYMENT.PAYPAL,
        countOfNftToMint: counter,
        nftId: data?._id,
        userId: user?._id,
        walletAddress: namiWalletAddress,
        items: [
          {
            name: data?.playerDetail?.Name
              ? data?.playerDetail?.Name
              : data?.detail?.Name,
            currency: PAYMENT.PAYPAL,
            price: !minted
              ? Math.round(
                  ((data?.value + multiValue) * usdPrice + Number.EPSILON) * 100
                ) / 100
              : Math.round((data?.value * usdPrice + Number.EPSILON) * 100) /
                100,
            quantity: counter,
          },
        ],
      };

      const total = params.items.reduce((total, accumulatorObj) => {
        return total + accumulatorObj.price * accumulatorObj.quantity;
      }, 0);

      const res = await handlePaypalPayment({
        ...params,
        total: String(total),
      });
      window.open(res?.data?.redirectUrl, "_blank", "noopener,noreferrer");

      setLoading({
        paypal: false,
      });

      setpopupvisible(false);
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err || error?.message);
      setLoading({
        paypal: false,
      });
    }
  };

  ////*******Payment with Stripe */

  const handleSubmit = (stripe: any, elements: any) => async () => {
    const cardElement = elements.getElement(CardElement);
    let params = {
      playerId: data?._id,
      currency: PAYMENT.STRIPE,
      price: data?.value * usdPrice,
    };
    try {
      setLoading({
        stripe: true,
      });

      const resData = await generateSecForPayment(params);

      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      toast.error(paymentMethod?.error);

      const clientSecret = resData?.data?.client_secret;

      const paymentMethodId = paymentMethod?.paymentMethod?.id;

      const finalResponse = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId,
      });

      setLoading({
        stripe: false,
      });
      toast.error(finalResponse?.error?.message);
      setpopupvisible(false);
    } catch (error) {
      setLoading({
        stripe: false,
      });
      toast.error(error?.error?.message);
    }
  };

  const handleCardanoPrice = async () => {
    try {
      const res = await getCurrencyRates();
      dispatch(saveCardanoPrice(res?.data));
    } catch (error) {}
  };

  useEffect(() => {
    if (namiUpdate) {
      handleNameWallet();
    }
  }, [namiUpdate]);

  useEffect(() => {
    handleCardanoPrice();
  }, []);

  return {
    handleNameWallet,
    loading,
    handleSubmit,
    handlePaypalPayments,
  };
};

export default useNftPayments;
