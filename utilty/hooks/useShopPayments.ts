import { useRouter } from "next/router";
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
import {
  handleShopPaypalOrders,
  handleShopWelletOrders,
} from "../../services/shopServices";
import { saveCardanoPrice } from "../../store/reducers/shopSlice";
import { CONSTANTS, PAYMENT } from "../constants/walletConstants";
import { getNormalizedError } from "../helpers";
import {
  getWalletAddress,
  getWallets,
  sendTransactions,
} from "../../services/namiWalletService";
import { PAYMENT_METHOD, PAYMENT_TYPE } from "../enums/payment.enum";

interface LOADING_PROPS {
  namiWallet?: boolean;
  paypal?: boolean;
  stripe?: boolean;
}

const useShopPayments = (
  data?: any,
  setpopupvisible?: (prop?: boolean) => void
) => {
  const { user, namiWalletAddress } = useSelector((state: any) => state?.user);
  const { usdPrice } = useSelector((state: any) => state?.shopDetail);
  const location = useRouter();
  const [loading, setLoading] = useState<LOADING_PROPS>({
    namiWallet: false,
    paypal: false,
    stripe: false,
  });
  const dispatch = useDispatch();
  ////*******Payment with Nami Wallet */

  const handleNameWallet = async () => {
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

      const address = await getWalletAddress();

      const txHash = await sendTransactions(
        CONSTANTS.WALLET_ADDRESS,
        data?.pricePlusDeliveryCharges
      );

      let walletParams = {
        userId: user?._id,
        walletAddress: address[0],
        productId: data?._id,
        productVariantBought: data?.hasVariants,
        productTitle: data?.title,
        productSize: data?.productSize,
        productPrice: Number(data?.pricePlusDeliveryCharges),
        transactionNumberOrHash: txHash,
        paymentType: PAYMENT_TYPE.CRYPTO,
        paymentMethod: PAYMENT_METHOD.CRYPTO,
      };

      const res = await handleShopWelletOrders(walletParams);
      toast.success(res?.data?.message);

      setLoading({
        namiWallet: false,
      });
      setpopupvisible(false);
      location.push("/shop");
    } catch (error) {
      setLoading({
        namiWallet: false,
      });
      const err = getNormalizedError(error);
      toast.error(error?.info || "Request failed");
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

      const address = await getWalletAddress();
      let params = {
        currency: PAYMENT.PAYPAL,
        total: JSON?.stringify(
          Math.round(data?.pricePlusDeliveryCharges * usdPrice)
        ),
        userId: user?._id,
        walletAddress: address[0],
        items: [
          {
            name: data?.title,
            currency: PAYMENT.PAYPAL,
            price: Number(
              Math.round(data?.pricePlusDeliveryCharges * usdPrice)
            ),
            quantity: 1,
          },
        ],
        productVariantBought: data?.hasVariants,
        productTitle: data?.title,
        productSize: data?.productSize,
        productPrice: Number(
          Math.round(data?.pricePlusDeliveryCharges * usdPrice)
        ),
        productId: data?._id,
        paymentType: PAYMENT_TYPE.PAYPAL,
        paymentMethod: PAYMENT_METHOD.CARD,
      };
      const res = await handleShopPaypalOrders(params);
      window.open(res?.data?.redirectUrl, "_blank", "noopener,noreferrer");
      setLoading({
        paypal: false,
      });
      setpopupvisible(false);
      location.push("/");
    } catch (error) {
      toast.error(error?.message);
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
    } catch (error) {
      dispatch(saveCardanoPrice(null));
    }
  };

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

export default useShopPayments;
