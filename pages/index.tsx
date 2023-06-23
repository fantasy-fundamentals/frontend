import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../components/homeComponents/header";
import HeaderSlider from "../components/homeComponents/headerSlider";
import LatestNews from "../components/homeComponents/latestNews";
import NewsLetter from "../components/homeComponents/newsLetter";
import TrendingPlayers from "../components/homeComponents/trendingPlayers";
import ConnectWallet from "../components/_common/connectWallet";
import ForgotPassword from "../components/_common/forgotPassword";
import Gear from "../components/_common/GearCards";
import Login from "../components/_common/login";
import Modal from "../components/_common/modal";
import useNavBar from "../components/_common/navBar/useNavBar";
import SignUp from "../components/_common/signUp";
import { handleLatestNews, handleNewsRecent } from "../services/news.services";
import {
  handleFavotitePlayers,
  handlePlayers,
} from "../services/players.services";
import { handleArticleData, handleShopData } from "../services/shopServices";
import {
  saveblog,
  savelatestNews,
  savePlayer,
  saveTopHeading,
  toggleIsFavorite,
} from "../store/reducers/homeSlice";
import styles from "../styles/home.module.scss";
import { getNormalizedError } from "../utilty/helpers";

const Home = () => {
  const {
    popupvisible,
    toggleData,
    handleConnectModal,
    setActiveModal,
    activeModal,
    setpopupvisible,
    namiWalletConnect,
  } = useNavBar();

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.user);
  const [loading, setLoading] = useState(false);
  const [shopData, setShopData] = useState([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [shopLoading, setShopLoading] = useState(false);
  const [playerLoading, setPlayerLoading] = useState(false);

  const handleData = async () => {
    try {
      setNewsLoading(true);
      setPlayerLoading(true);
      setShopLoading(true);
      setBlogLoading(true);
      setRecentLoading(true);

      const responses: any = await Promise.all([
        handleLatestNews().catch((error) => ({ error })),
        handlePlayers(1, user?.email, "all").catch((error) => ({ error })),
        handleShopData().catch((error) => ({ error })),
        handleArticleData().catch((error) => ({ error })),
        handleNewsRecent().catch((error) => ({ error })),
      ]);

      dispatch(
        savelatestNews(responses[0].error ? [] : responses[0]?.data?.data)
      );
      setNewsLoading(false);

      dispatch(
        savePlayer(
          responses[1].error ? [] : responses[1]?.data?.data?.slice(0, 5)
        )
      );
      setPlayerLoading(false);

      if (responses[2].error) {
        setShopData([]);
      } else {
        let filterData = responses[2].data?.data?.filter(
          (item) => item?.isActive
        );
        setShopData(filterData?.slice(0, 4));
      }
      setShopLoading(false);

      dispatch(
        saveblog(responses[3].error ? [] : responses[3].data?.data?.reverse())
      );
      setBlogLoading(false);

      dispatch(
        saveTopHeading(responses[4].error ? [] : responses[4].data?.data)
      );
      setRecentLoading(false);
    } catch (error) {
      setNewsLoading(false);
      setPlayerLoading(false);
      setShopLoading(false);
      setBlogLoading(false);
      setRecentLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const handleFavData = async (data?: {
    _id?: string;
    isFavorite?: boolean;
  }) => {
    if (user === null) {
      setpopupvisible((preview) => !preview);
    } else {
      try {
        setLoading(true);
        const res = await handleFavotitePlayers(
          data?._id,
          user?.email,
          !data?.isFavorite
        );
        const playerRes = await handlePlayers(1, user?.email);
        dispatch(toggleIsFavorite(data?._id));
        toast.success(res?.data?.message);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const err = getNormalizedError(error);
        toast.error(err);
      }
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <Modal visible={popupvisible} btn onClose={() => toggleData()}>
        {activeModal === 1 ? (
          <Login
            onClick={() => handleConnectModal("signUp")}
            onClickForgot={() => handleConnectModal("forgot")}
            popupvisible={setpopupvisible}
          />
        ) : activeModal === 2 ? (
          <SignUp onClick={() => handleConnectModal("login")} />
        ) : activeModal === 3 ? (
          <ForgotPassword
            onClickSignUp={() => handleConnectModal("signUp")}
            setActiveModal={setActiveModal}
          />
        ) : activeModal === 4 ? (
          <ConnectWallet
            onNamiWalletClick={() => namiWalletConnect()}
            // onWalletConnectClick={() => coinBaseWalletConnect()}
          />
        ) : null}
      </Modal>

      <HeaderSlider />
      <div className={styles.container}>
        <Header loading={blogLoading} />
        <LatestNews loading={recentLoading} />
        <TrendingPlayers
          handleFavData={handleFavData}
          loading={loading}
          apiLoading={playerLoading}
        />
        <Gear shopData={shopData} loading={shopLoading} />
        <NewsLetter />
      </div>
    </>
  );
};

export default Home;
