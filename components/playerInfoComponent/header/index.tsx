import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../_common/Button";
import NftPaymentModal from "../../_common/currencyModal/nftPaymentModal";
import Modal1 from "../../_common/modal/modal1";
import styles from "./header.module.scss";

interface Prop {
  playersDetails?: {} | any;
}
const PlayerInfoHeader = (props: Prop) => {
  const { playersDetails } = props;

  const { accessToken } = useSelector((state: any) => state?.user);
  const { usdPrice } = useSelector((state: any) => state?.shopDetail);
  const [popupvisible, setpopupvisible] = useState(false);
  const togglepopup = (e: any) => {
    e.preventDefault();
    setpopupvisible((preview) => !preview);
  };

  const toggleData = () => {
    setpopupvisible(false);
  };

  let params = {
    ...playersDetails?.player,
    _id: playersDetails?.nft?._id,
    value: playersDetails?.nft?.value,
    meta: {
      name: playersDetails?.nft?.meta?.name,
    },
  };

  return (
    <>
      <Modal1 visible={popupvisible} btn onClose={() => toggleData()}>
        <NftPaymentModal data={params} setpopupvisible={setpopupvisible} />
      </Modal1>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.headerWrapper}>
            {/* <img src={"/images/playerInfoHeader.webp"} alt="" /> */}
            <div className={styles.headingWrapper}>
              <label>
                {" "}
                {playersDetails?.player
                  ? `${playersDetails?.player?.detail?.Name}`
                  : "-"}
              </label>
              <p>
                Price:&nbsp;
                {playersDetails?.nft?.value
                  ? `${Number(
                      playersDetails?.nft?.value
                    )?.toLocaleString()} ADA`
                  : "-"}
              </p>
              <p>
                Player ID:
                {playersDetails?.player
                  ? playersDetails?.player?.detail?.PlayerID
                  : "-"}
              </p>
              <p>
                Team:&nbsp;
                {playersDetails?.player?.detail?.Team
                  ? `${playersDetails?.player?.detail?.Team}`
                  : "NAN"}
              </p>

              {(playersDetails?.nft?._id != undefined &&
                playersDetails?.player?.detail?.Status != "Inactive") ||
              playersDetails?.player?.detail?.CurrentStatus === "Free Agent" ? (
                <Button
                  name="Mint Now"
                  onClick={(e) => {
                    if (!accessToken) {
                      toast.info("Please login first");
                    } else {
                      togglepopup(e);
                    }
                  }}
                />
              ) : null}
            </div>
          </div>
          <div className={styles.detailWrapper}>
            <table cellSpacing="0">
              <tbody>
                <tr>
                  <td>Current value:</td>
                  <td>
                    {playersDetails?.nft
                      ? `${(
                          playersDetails?.nft?.value * usdPrice
                        ).toLocaleString()} USD`
                      : "-"}
                  </td>
                  <td>Circulated Nfts:</td>
                  <td>
                    {playersDetails?.circulatedNfts
                      ? playersDetails?.circulatedNfts
                      : "-"}
                  </td>
                  <td>Total Circulated Nfts Value:</td>
                  <td>
                    {playersDetails?.totalCirculatedNftsValue
                      ? `${Number(
                          playersDetails?.totalCirculatedNftsValue
                        )?.toLocaleString()}`
                      : "-"}
                  </td>

                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Height:</td>
                  <td>
                    {playersDetails?.player
                      ? `${playersDetails?.player?.detail?.Height}`
                      : "-"}
                  </td>
                  <td>Age:</td>
                  <td>
                    {playersDetails?.player
                      ? `${playersDetails?.player?.detail?.Age}`
                      : "-"}
                  </td>
                  <td>Date of Birth:</td>
                  <td>
                    {" "}
                    {playersDetails?.player
                      ? `${moment(
                          playersDetails?.player?.detail?.BirthDate
                        ).calendar()}`
                      : "-"}
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  {/* <td>Nickname:</td>
                  <td>
                    {" "}
                    {playersDetails?.player
                      ? `${playersDetails?.player?.detail?.ShortName}`
                      : "-"}
                  </td> */}
                  <td>Upcoming Game Week:</td>
                  <td>
                    {playersDetails?.player
                      ? `${playersDetails?.player?.detail?.UpcomingGameWeek}`
                      : "-"}
                  </td>
                  <td>Weight:</td>
                  <td>
                    {" "}
                    {playersDetails?.player
                      ? `${playersDetails?.player?.detail?.Weight} lb`
                      : "-"}
                  </td>
                  <td>Team:</td>
                  <td>
                    {" "}
                    {playersDetails?.player
                      ? `${playersDetails?.player?.detail?.CurrentTeam} `
                      : "-"}
                  </td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>College Draft Round</td>
                  <td>
                    {" "}
                    {playersDetails?.player
                      ? `${playersDetails?.player?.detail?.CollegeDraftRound} `
                      : "-"}
                  </td>
                  <td>Experience:</td>
                  <td>
                    {" "}
                    {playersDetails?.player
                      ? `${playersDetails?.player?.detail?.Experience} `
                      : "-"}
                  </td>
                  <td>CurrentStatus:</td>
                  <td>
                    {" "}
                    {playersDetails?.player
                      ? `${playersDetails?.player?.detail?.CurrentStatus} `
                      : "-"}
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className={styles.bioWrapper}>
            <label>Biography:</label>
            <p>-</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PlayerInfoHeader;
