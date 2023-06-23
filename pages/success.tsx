import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal1 from "../components/_common/modal/modal1";
import styles1 from "../components/_common/SplashScreen/splashscreen.module.css";
import { createOrders } from "../services/paymentService";
import styles from "../styles/success.module.scss";
import { getNormalizedError } from "../utilty/helpers";
import useCreateOrder from "../utilty/hooks/useCreateOrder";
const Splash = () => {
  return (
    <>
      <div className={styles1.container}>
        <div className={styles1.wrapper}>
          <div className={styles1.logo}>
            <img src="/logo.svg" alt="" />
          </div>
          <div className={styles1.loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

const Success = () => {
  const { accessToken } = useSelector((state: any) => state?.user);
  const [popupvisible, setpopupvisible] = useState(true);
  const { isError, isLoading, isSuccess } = useCreateOrder();

  const redirect = () => {
    Router.push("404");
  };

  const handleOrders = async () => {
    let params = {
      nft: "430",
      paymentMethod: "card",
      transactionNumberOrHash: Router?.query?.paymentId,
      amount: 1,
      paymentType: "paypal",
    };
    // try {
    //   await createOrders(params);
    // } catch (error) {
    //   const err = getNormalizedError(error);
    //   toast.error(err);
    //   redirect();
    // }
  };

  useEffect(() => {
    if (isLoading === false && isError === true && isSuccess === false) {
      redirect();
    } else if (isLoading === false && isError === false && isSuccess === true) {
      handleOrders();
    }
  }, [isSuccess, isError, isLoading]);

  if (isLoading === true && isError === false && isSuccess === false) {
    return <Splash />;
  } else if (isLoading === false && isError === false && isSuccess === true) {
    return (
      <>
        <Modal1 visible={popupvisible} backgroundColor="#111112">
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <img src={"/icons/success.gif"} alt="" draggable={false} />
              <h1>Order Created Successfully</h1>
            </div>
          </div>
        </Modal1>
      </>
    );
  }
  return <></>;
};

export default Success;
