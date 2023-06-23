import React, { useEffect, useMemo, useState } from "react";
import styles from "./scoreCards.module.scss";
import { sliderData } from "./data";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiPlayFill } from "react-icons/ri";
import NoDataFound from "../../_common/noDataGif/noDataFound";
import Modal from "../../_common/modal";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { handlePlayersScore } from "../../../services/players.services";
import { saveScoreData } from "../../../store/reducers/homeSlice";
import { getNormalizedError } from "../../../utilty/helpers";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
import { saveScoreDetails } from "../../../store/reducers/scoreSlice";
const ScoreCards = ({ searchData }: any) => {
  const location = useRouter();
  const dispatch = useDispatch();
  const [popupvisible, setpopupvisible] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setTotalCount] = useState(false);
  const [data, setData]: any[] = useState([]);
  const [filterRes, setFilterRes] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglepopup = (e: any) => {
    e.preventDefault();
    setpopupvisible((preview) => !preview);
  };

  const handlePlayerScore = async () => {
    try {
      setLoading(true);
      const scoreRes = await handlePlayersScore(false, 10, page);
      if (scoreRes?.data?.data?.length === 0) {
        setTotalCount(true);
        return;
      } else {
        setData((prev) => [...prev, ...scoreRes?.data?.data]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const filteredData = useMemo(() => {
    if (searchData?.length >= 1) {
      setFilterRes(true);
      return data?.filter(
        (item: any) =>
          item?.detail?.Date?.toLowerCase().includes(
            searchData?.toLowerCase()
          ) ||
          item?.detail?.AwayTeam?.toLowerCase().includes(
            searchData?.toLowerCase()
          ) ||
          item?.detail?.HomeTeam?.toLowerCase().includes(
            searchData?.toLowerCase()
          )
      );
    } else {
      return data;
    }
  }, [searchData, data]);

  const handleLocationData = (data: any) => {
    dispatch(saveScoreDetails(data));
    location.push("/score-info");
  };

  useEffect(() => {
    handlePlayerScore();
  }, [page]);

  return (
    <>
      <Modal
        visible={popupvisible}
        showModal2
        onClose={() => setpopupvisible(false)}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=CxwJrzEdw1U"
          playing={true}
          controls={true}
          width="100%"
          height="400px"
        />
      </Modal>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {filteredData?.length === 0 && filterRes ? (
            <NoDataFound />
          ) : (
            filteredData?.map((item: any, index) => (
              <div className={styles.cardWrapper} key={index}>
                <div
                  className={styles.leftWrapper}
                  onClick={() => handleLocationData(item)}
                >
                  <div className={styles.header}>
                    <img src={"/icons/logoIcon.svg"} alt="" />
                    <label>
                      {" "}
                      {moment(item?.detail?.DateTime).format("MMM Do YY")}
                    </label>
                  </div>
                  <table cellSpacing="0">
                    <thead>
                      <tr>
                        <th>State: {item?.detail?.StadiumDetails?.State}</th>
                        <th> TV: {item?.detail?.Channel}</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          {/* <img src={item.img} alt="" /> */}
                          <div className={styles.imgHeading}>
                            {item?.detail?.HomeTeam}
                            {/* <p>{item.subHeading}</p> */}
                          </div>
                        </td>
                        <td>
                          {item?.detail?.HomeScore
                            ? item?.detail?.HomeScore
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {/* <img src={item.img} alt="" /> */}
                          <div className={styles.imgHeading}>
                            {item?.detail?.AwayTeam}
                            {/* <p>{item.subHeading}</p> */}
                          </div>
                        </td>
                        <td>
                          {item?.detail?.AwayScore
                            ? item?.detail?.AwayScore
                            : "-"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <div
                  className={styles.rightWrapper}
                  onClick={(e: any) => togglepopup(e)}
                >
                  <img src={"/images/hero6.webp"} alt="" />
                  <div className={styles.videoLoading}>
                    <div className={styles.btnWrapper}>
                      <div className={styles.btn}>HIGHLIGHTS</div>
                    </div>
                    <div className={styles.iconWrapper}>
                      <RiPlayFill className={styles.icon} />
                    </div>
                  </div>
                </div> */}
              </div>
            ))
          )}
          {count ? (
            <div className={styles.loadingHeading} style={{ cursor: "unset" }}>
              No more data
            </div>
          ) : loading ? (
            <div
              className={styles.loadingHeading}
              style={{ cursor: "pointer" }}
            >
              <RotatingLines
                strokeColor="#d80f29"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          ) : (
            <div
              className={styles.loadingHeading}
              onClick={() => setPage(page + 1)}
            >
              {/* <AiOutlineLoading3Quarters className={styles.ico} /> */}
              Load more
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ScoreCards;
