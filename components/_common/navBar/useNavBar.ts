import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  connetWallet,
  getWalletAddress,
  getWallets,
} from "../../../services/namiWalletService";
import { getCurrencyRates } from "../../../services/paymentService";
import { handleVerifyJwt } from "../../../services/user.services";
import { store } from "../../../store";
import { saveCardanoPrice } from "../../../store/reducers/shopSlice";
import {
  resetTimer,
  stopTimer,
  tickTimer,
} from "../../../store/reducers/timerSlice";
import {
  resetUserState,
  saveNamiWalletAddress,
} from "../../../store/reducers/user";
import {
  NAMIWALLET_MESSAGE,
  NAMIWALLET_NETWORKID,
} from "../../../utilty/constants/walletConstants";
import { getNormalizedError } from "../../../utilty/helpers";
const useNavBar = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const { accessToken, namiWalletAddress } = useSelector(
    (state: any) => state?.user
  );
  const timer = store.getState().timer;
  const [active, setActive] = useState(false);
  const [popupvisible, setpopupvisible] = useState(false);
  const [activeModal, setActiveModal] = useState<any>(accessToken ? 4 : 1);
  const [state, setState] = useState(0);
  const handleLogOut = async () => {
    dispatch(resetUserState());

    location.push("/");
  };
  const togglepopup = (e: any) => {
    e.preventDefault();
    setpopupvisible((preview) => !preview);
  };

  const handleClose = () => {
    setTimeout(() => {
      setActive(!active);
    }, 200);
  };

  const handleJwt = async () => {
    try {
      await handleVerifyJwt();
    } catch (error) {
      const err = getNormalizedError(error);
      dispatch(resetUserState());
    }
  };

  const toggleData = () => {
    setpopupvisible(false);
    if (accessToken) {
      setActiveModal(4);
    } else {
      setActiveModal(1);
    }
  };

  const handleConnectModal = (type?: string) => {
    if (accessToken) {
      setActiveModal(4);
    } else {
      if (type === "signUp") {
        setActiveModal(2);
      } else if (type === "forgot") {
        setActiveModal(3);
      } else if (type === "login") {
        setActiveModal(1);
      }
    }
  };

  const namiWalletConnect = async () => {
    try {
      let wallets = await getWallets();

      if (wallets?.length === 0) {
        toast.info("Please Install Nami Wallet & Reload the site");
        return;
      }

      const wallet = await connetWallet();
      const networkId = await wallet.getNetworkId();

      if (networkId != NAMIWALLET_NETWORKID.NETWORK) {
        toast.error(NAMIWALLET_MESSAGE.MESSAGE);
        return;
      }

      const address = await getWalletAddress();
      dispatch(saveNamiWalletAddress(address[0]));
      if (address) {
        setpopupvisible(false);
      }
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const handleCardanoPrice = async () => {
    try {
      const res = await getCurrencyRates();
      dispatch(saveCardanoPrice(res?.data));
    } catch (error) {
      // const err = getNormalizedError(error);
      // toast.error(err);
    }
  };

  const handleWalletDisconnect = () => {
    dispatch(saveNamiWalletAddress(null));
  };

  useEffect(() => {
    let timerId;
    if (timer.running) {
      timerId = setInterval(() => {
        store.dispatch(tickTimer());
      }, 1000);
    } else {
      store.dispatch(stopTimer());
    }

    return () => clearInterval(timerId);
  }, [timer, store.dispatch]);

  useEffect(() => {
    if (!location.asPath.includes("/dashboard") && accessToken) {
      setState(1);
    } else if (location.asPath.includes("/dashboard") && accessToken) {
      setState(0);
    } else if (!location.asPath.includes("/dashboard") && !accessToken) {
      setState(2);
    }
    setActive(false);
    setActiveModal(accessToken ? 4 : 1);
    handleCardanoPrice();
  }, [location, accessToken]);

  useEffect(() => {
    handleJwt();
    window?.addEventListener("resize", function () {
      if (window?.innerWidth > 1024) {
        setActive(false);
      }
    });
    return () => {
      window?.removeEventListener("resize", function () {
        if (window?.innerWidth > 1024) {
          setActive(false);
        }
      });
    };
  }, []);

  return {
    popupvisible,
    activeModal,
    toggleData,
    handleClose,
    togglepopup,
    setActive,
    active,
    setActiveModal,
    location,
    setpopupvisible,
    namiWalletConnect,
    handleConnectModal,
    state,
    accessToken,
    namiWalletAddress,
    handleWalletDisconnect,
    handleLogOut,
  };
};

export default useNavBar;
