import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleLatestNews,
  handleNewsRecent,
} from "../../../services/news.services";
import { saveTopHeading } from "../../../store/reducers/homeSlice";
import { saveNewsDetails } from "../../../store/reducers/newsSlice";
import { getNormalizedError } from "../../../utilty/helpers";
import { sliderData } from "./data";
import styles from "./latestNews.module.scss";
const imgArray = [
  "https://d2pm667mw7y58b.cloudfront.net/nft/NFT/1b1e5721-7c51-4ed8-ab9d-cf6850abc0e4",
  "https://d2pm667mw7y58b.cloudfront.net/nft/NFT/191dd54b-6c5c-4e49-9b49-e60af7b1b888",
  "https://d2pm667mw7y58b.cloudfront.net/nft/NFT/46e0dcfa-cef2-49eb-b56e-5ed0df5a47f4",
  "https://d2pm667mw7y58b.cloudfront.net/nft/NFT/45c78c56-25f4-4985-9d08-c042afa054ab",
  "https://d2pm667mw7y58b.cloudfront.net/nft/NFT/b2e7d743-a050-4241-af97-8d25507d77b9",
  "https://d2pm667mw7y58b.cloudfront.net/nft/NFT/a30807c5-f3e0-4870-bbfe-8d20b03f4aaa",
  "https://d2pm667mw7y58b.cloudfront.net/nft/NFT/021ace24-fc67-41fe-ac80-4735654a5c98",
  "https://d2pm667mw7y58b.cloudfront.net/nft/NFT/191dd54b-6c5c-4e49-9b49-e60af7b1b888",
  "https://d2pm667mw7y58b.cloudfront.net/nft/NFT/b2e7d743-a050-4241-af97-8d25507d77b9",
];
const LatestNews = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const [newsData, setNewsData]: any[] = useState();
  const handleData = async () => {
    try {
      const newsRes = await handleNewsRecent();
      const tempArray = newsRes?.data?.data?.map((item, i) => {
        const img = imgArray?.find((item, index) => index === i);
        return {
          ...item,
          temImg: img,
        };
      });
      dispatch(saveTopHeading(tempArray));
      setNewsData(tempArray?.slice(0, 5));
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const handleTabData = (item: any) => {
    // window.open(item?.detail?.Url, "_blank", "noopener,noreferrer");
    dispatch(saveNewsDetails(item));
    location.push({
      pathname: `news/${item?.slug}`,
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handleData();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <label>
              LATEST <span>NEWS</span>
            </label>
          </div>

          <div className={styles.cardWrapper} id="refgr">
            {newsData?.map((item, index) => (
              <div
                className={styles.card}
                key={index}
                onClick={() => handleTabData(item)}
              >
                <div className={styles.topWrapper}>
                  <img
                    src={item?.coverImage ? item?.coverImage : item?.temImg}
                    alt=""
                  />
                  <div className={styles.heading}>{item?.detail?.Title}</div>
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.leftWrapper}>
                    {" "}
                    {item?.detail?.Team}
                  </div>
                  <div className={styles.rightWrapper}>
                    {" "}
                    {moment(item?.createdAt).format("MMM Do YY")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
