import { BrowserWallet, Transaction } from "@martifylabs/mesh";
import type { Asset } from "@meshsdk/core";
import { ForgeScript } from "@meshsdk/core";
import { toast } from "react-toastify";
import Timer from "../components/_common/Timer";
import { store } from "../store";
import {
  resetTimer,
  startTimer,
  stopTimer,
} from "../store/reducers/timerSlice";
import { CONSTANTS } from "../utilty/constants/walletConstants";

const getWallets = async () => {
  const wallet = await BrowserWallet?.getInstalledWallets();
  const res = wallet?.filter((item) => item?.name === "Nami");
  return res;
};

const connetWallet = async () => {
  const wallet = await BrowserWallet?.enable("Nami");
  return wallet;
};

const getWalletBalance = async () => {
  const wallet = await BrowserWallet?.enable("Nami");
  const balance = await wallet?.getBalance();
  return balance;
};

const getWalletAddress = async () => {
  const wallet = await BrowserWallet?.enable("Nami");
  const address = await wallet?.getUsedAddresses();
  return address;
};

const sendTransactions = async (address: string, payment: any) => {
  const state = store.getState().timer;

  try {
    if (state.running && state.duration > 0) {
      await Timer();
      return;
    }
    store.dispatch(stopTimer());
    store.dispatch(resetTimer());
    const wallet: any = await BrowserWallet?.enable("Nami");
    const value = Number(Math.round(payment * 1000000));
    const tx: any = new Transaction({ initiator: wallet }).sendLovelace(
      address,
      String(value)
    );

    toast.error(tx?.info);
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    // store.dispatch(startTimer());
    toast.success("Congratulations Payment Successful!");
    return txHash;
  } catch (error) {
    const errorString: string = error?.message;
    const errorStringifiedObject = errorString.slice(
      errorString?.indexOf("{"),
      errorString?.length - 1
    );
    if (errorStringifiedObject === "") {
      const errorString: string = error?.message;
      let errorStringifiedObject = errorString.slice(
        errorString?.indexOf(":"),
        errorString?.length - 1
      );
      if (errorStringifiedObject === ": UTxO Balance Insufficient") {
        toast.error("Insufficient Balance");
      } else {
        toast.error(errorStringifiedObject);
      }
    } else {
      toast.error(JSON?.parse(errorStringifiedObject)?.info || error?.message);
    }
  }
};

function removeSpecialChars(text) {
  const pattern = /[^a-zA-Z0-9\s]/g; // define the pattern of characters to remove
  const cleanText = text.replace(pattern, ""); // use the replace method to remove the characters

  return cleanText;
}

const sendMultiTransactions = async (
  address: string,
  TotalValue: any,
  percentageValue: any
) => {
  // console.log(
  //   "🚀 ~ file: namiWalletService.ts:92 ~ percentageValue:",
  //   percentageValue
  // );
  // console.log("🚀 ~ file: namiWalletService.ts:92 ~ TotalValue:", TotalValue);
  const state = store.getState().timer;

  try {
    if (state.running && state.duration > 1) {
      await Timer();
      return;
    }

    store.dispatch(stopTimer());
    store.dispatch(resetTimer());
    const wallet: any = await BrowserWallet?.enable("Nami");
    const value = Number(Math.round(+TotalValue * 1000000));
    const percentageValues = Number(
      Math.round(Number(percentageValue < 1 ? 1 : percentageValue) * 1000000)
    );

    const tx: any = new Transaction({ initiator: wallet })
      .sendLovelace(address, String(value))
      .sendLovelace(CONSTANTS.PROFIT_WALLET_ADDRESS, String(percentageValues));

    toast.error(tx?.info);
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    // store.dispatch(startTimer());
    toast.success("Congratulations Payment Successful!");
    return txHash;
  } catch (error) {
    const errorString: string = error?.message;
    const errorStringifiedObject = errorString.slice(
      errorString?.indexOf("{"),
      errorString?.length - 1
    );
    if (errorStringifiedObject === "") {
      const errorString: string = error?.message;
      let errorStringifiedObject = errorString.slice(
        errorString?.indexOf(":"),
        errorString?.length - 1
      );
      if (errorStringifiedObject === ": UTxO Balance Insufficient") {
        toast.error("Insufficient Balance");
      } else {
        toast.error(errorStringifiedObject);
      }
    } else {
      toast.error(JSON?.parse(errorStringifiedObject)?.info || error?.message);
    }
  }
};

const sendNfts = async (params: {
  address: string;
  payment: number;
  blockChainMintedNftId: string;
  count: number;
}) => {
  const state = store.getState().timer;
  /*********nft transfer dataObject example
   * let dataObject = {
    unit: '64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e',
    quantity: '1',
  };
  */
  try {
    if (state.running && state.duration > 1) {
      await Timer();
      return;
    }
    store.dispatch(stopTimer());
    store.dispatch(resetTimer());
    const wallet = await BrowserWallet?.enable("Nami");
    const tx: any = new Transaction({ initiator: wallet })
      .sendLovelace(params?.address, `${String(1 * 1000000)}`)
      .sendAssets(CONSTANTS.WALLET_ADDRESS, [
        {
          unit: params?.blockChainMintedNftId,
          quantity: String(params?.count),
        },
      ]);
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    // store.dispatch(startTimer());
    return txHash;
  } catch (error) {
    const errorString: string = error?.message;
    const errorStringifiedObject = errorString.slice(
      errorString?.indexOf("{"),
      errorString?.length - 1
    );
    if (errorStringifiedObject === "") {
      const errorString: string = error?.message;
      let errorStringifiedObject = errorString.slice(
        errorString?.indexOf(":"),
        errorString?.length - 1
      );
      // errorStringifiedObject = "Balance Insufficient";

      toast.error(errorStringifiedObject);
    } else if (errorStringifiedObject != "") {
      const errorObj = JSON?.parse(errorStringifiedObject);
      toast.error(errorObj?.info);
    } else {
      toast.error(error?.message);
    }
  }
};

const BurnNfts = async (params: {
  address: string;
  blockChainMintedNftId: string;
  count: number | string;
}) => {
  try {
    const forgingScript = ForgeScript.withOneSignature(params.address);
    const wallet = await BrowserWallet?.enable("Nami");
    const tx: any = new Transaction({ initiator: wallet });
    const assetObject: Asset = {
      unit: params.blockChainMintedNftId,
      quantity: "1",
      // quantity: String(params.count),
    };
    tx.burnAsset(forgingScript, assetObject);
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    return txHash;
  } catch (error) {
    toast.error(error?.message);
  }
};

export {
  getWallets,
  connetWallet,
  getWalletBalance,
  sendTransactions,
  getWalletAddress,
  sendNfts,
  BurnNfts,
  sendMultiTransactions,
};
