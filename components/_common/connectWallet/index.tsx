import React from "react";
import styles from "./connectWallet.module.scss";
interface Props {
  onNamiWalletClick?: (prop?: any) => void;
  onWalletConnectClick?: (prop?: any) => void;
}
const ConnectWallet = (prop: Props) => {
  const { onNamiWalletClick, onWalletConnectClick } = prop;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.walletWrapper} onClick={onNamiWalletClick}>
          <img src={"/icons/namiWallet.svg"} alt="" draggable={false} />
          <label>NAMIWALLET</label>
          <p>Connect to your Nami Wallet</p>
        </div>
        {/* <div className={styles.walletWrapper} onClick={onWalletConnectClick}>
          <img src={"/icons/walletConnect.svg"} alt="" />
          <label>Walletconnect</label>
          <p>Scan with WalletConnect to connect</p>
        </div> */}
      </div>
    </div>
  );
};

export default ConnectWallet;
