import React from "react";
import Comment from "../components/nftDetailsComponent/activityComponet";
import styles from "../styles/faq.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FAQ = () => {
  const router = useRouter();
  const { accessToken, namiWalletAddress } = useSelector(
    (state: any) => state?.user
  );
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <label>
            How TO Refresh <span>Nami Wallet</span>
          </label>
          <div className={styles.cardWrapper}>
            Do these actions to update the Nami Wallet balance. &nbsp;
            <br /> 1. Go to Nami Wallet
            <br />
            2. Go to Profile
            <br />
            3. Settings
            <br />
            4. General Settings <br />
            5. Click on the Refresh Balance
          </div>
          <label>Support</label>
          <div className={styles.cardWrapper}>
            Welcome to our website! We strive to provide a user-friendly
            experience, easy navigation, and helpful support. If you have any
            questions, our team is here to assist you. Thank you for choosing
            us.
            <br />
            Please add your query by clicking on this button: &nbsp;
            <button
              onClick={() => {
                if (accessToken) {
                  router.push({
                    pathname: "/dashboard/settings",
                  });
                } else {
                  toast.info("Please login first");
                }
              }}
            >
              Click Here
            </button>
            <br /> 1: Take a screenshot from Wallet.
            <br />
            2: Attach the Screenshot with your query.
            <br />
            3: Also provide your wallet address.
          </div>
          <label>
            How <span>Burn NFT</span> will Work
          </label>
          <div className={styles.cardWrapper}>
            After burn the NFT user will recieve the refund in there wallet
            within 48 hours.
            <div className={styles.note}>
              <span>Note:</span>The NFT must be in the marketplace in order to
              start the burn process.
            </div>
          </div>
          <label>Note</label>
          <div className={styles.cardWrapper}>
            If you face that kind of Error, It means you haven't enough unbound
            ADA in your wallet.
            <br />
            <br />
            Add more ADA to your wallet.
            <br />
            <img src="/images/errorFromNami.png" alt="" />
            "1.5 ADA is bound with 1 NFT (NFT which is present in the user
            wallet), that restriction from the network side."
          </div>

          <label>
            Leave &nbsp;<span>Comments</span>
          </label>
          <Comment />
        </div>
      </div>
    </>
  );
};

export default FAQ;
