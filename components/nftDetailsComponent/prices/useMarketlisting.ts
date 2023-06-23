import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  HandleBurnNfts,
  handleMarketplaceListing,
} from "../../../services/nft.services";
import { removeNftMarketListing } from "../../../services/paymentService";
import { CONSTANTS } from "../../../utilty/constants/walletConstants";
import { getNormalizedError } from "../../../utilty/helpers";
import { sendNfts } from "../../../services/namiWalletService";
import { store } from "../../../store";
import {
  resetTimer,
  startTimer,
  stopTimer,
} from "../../../store/reducers/timerSlice";
import Timer from "../../_common/Timer";
import useNavBar from "../../_common/navBar/useNavBar";

const useMarketlisting = (props) => {
  const location = useRouter();
  const { namiWalletAddress } = useSelector((state: any) => state?.user);
  const state = store.getState().timer;
  const {} = useNavBar();
  const [popupvisible, setpopupvisible] = useState(false);
  const [listingPopupvisible, setListingPopupvisible] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);
  const [counter, setCounter] = useState<number>(1);
  const [listingPricevalue, setListingpriceValue] = useState<number>(null);
  const [loader, setLoader] = useState(false);
  const [burningPopupvisible, setBurningPopupvisible] = useState(false);

  const togglepopup = (e: any) => {
    if (props?.nftDetail?.isMintedByMe) {
      toast.info("You have already minted this NFT");
    } else {
      e.preventDefault();
      setpopupvisible((preview) => !preview);
    }
  };

  const handleListingData = async () => {
    setListingLoading(true);
    if (state.running) {
      await Timer();
      setListingLoading(false);
      return;
    }
    store.dispatch(stopTimer());
    store.dispatch(resetTimer());

    try {
      if (!props?.nftDetail?.activeMarketplace) {
        if (namiWalletAddress === null) {
          toast.info("Connect Wallet First");
          setListingLoading(false);
          return;
        } else if (props?.nftDetail?.walletAddress != namiWalletAddress) {
          toast.error("This NFT is not minted by this address");
          setListingLoading(false);
          return;
        } else if (listingPricevalue != null && listingPricevalue < 1) {
          toast.error("Value cannot be less than 1");
          setListingLoading(false);
          return;
        }
        // else if (
        //   Number(
        //     props?.nftDetail?.count === 0
        //       ? listingPricevalue > props?.nftDetail?.value
        //       : listingPricevalue >
        //           props?.nftDetail?.value * props?.nftDetail?.count
        //   )
        // ) {
        //   toast.error(
        //     `Listing price must be less than from actual NFT value ${Number(
        //       props?.nftDetail?.count === 0
        //         ? props?.nftDetail?.value?.toLocaleString()
        //         : (
        //             props?.nftDetail?.value * props?.nftDetail?.count
        //           ).toLocaleString()
        //     )}`
        //   );
        //   setListingLoading(false);
        //   return;
        // }
        let params = {
          address: CONSTANTS?.MAIN_WALLET_ADDRESS,
          blockChainMintedNftId: props?.nftDetail?.blockChainMintedNftId?.id
            .split(".")
            .join(""),
          count: counter,
          payment: props?.nftDetail?.value * counter,
        };

        const txHash = await sendNfts(params);
        if (txHash != undefined) {
          const res = await handleMarketplaceListing(
            props?.nftDetail?.mintedNftId,
            counter,
            Number(listingPricevalue)
          );
          store.dispatch(startTimer());
          props.handleMintedNfts();
          toast.success(res?.data?.message);
          setListingPopupvisible(false);
        }
        setListingLoading(false);
      } else {
        if (namiWalletAddress === null) {
          toast.info("Connect Wallet First");
          setListingLoading(false);
          return;
        }

        const res = await removeNftMarketListing(
          props?.nftDetail?.mintedNftId,
          namiWalletAddress
        );

        props.handleMintedNfts();
        setListingLoading(false);
        store.dispatch(startTimer());
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setListingLoading(false);
      store.dispatch(stopTimer());
      const err = getNormalizedError(error);
      toast.error(err || error?.message);
    }
  };

  const handleBurnNfts = async () => {
    setLoader(true);
    if (state.running) {
      await Timer();
      setLoader(false);
      return;
    }
    store.dispatch(stopTimer());
    store.dispatch(resetTimer());

    try {
      if (namiWalletAddress === null) {
        setLoader(false);
        toast.info("Connect Wallet First");
        return;
      }

      const nftRes = await HandleBurnNfts(props?.nftDetail?.mintedNftId);
      toast.success(nftRes?.data?.message);
      location.push("/dashboard/nfts");
      setLoader(false);
      setpopupvisible(false);
    } catch (error) {
      setLoader(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  return {
    handleListingData,
    popupvisible,
    listingLoading,
    togglepopup,
    setpopupvisible,
    setListingPopupvisible,
    listingPopupvisible,
    setCounter,
    counter,
    setListingpriceValue,
    listingPricevalue,
    loader,
    handleBurnNfts,
    setBurningPopupvisible,
    burningPopupvisible,
  };
};

export default useMarketlisting;
