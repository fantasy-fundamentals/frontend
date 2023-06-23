import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  handleNewsRecent,
  handleNewsRecentById,
} from "../../services/news.services";
import { saveTopHeading } from "../../store/reducers/homeSlice";
import { saveNewsDetails } from "../../store/reducers/newsSlice";
import styles from "../../styles/newsInfo.module.scss";
import { getNormalizedError } from "../../utilty/helpers";

const NewsInfo = () => {
  const dispatch = useDispatch();
  const location = useRouter();

  const { newsDetails } = useSelector((state: any) => state.newsDetail);
  const { latestNews, topHeading } = useSelector((state: any) => state?.home);

  const handleNews = async () => {
    try {
      const res = await handleNewsRecentById(location?.query?.index[0]);
      dispatch(saveNewsDetails(res?.data));
    } catch (error) {
      const err = getNormalizedError(error);
      toast.error(err);
    }
  };

  const getNewsRecentData = async () => {
    try {
      const headingRes = await handleNewsRecent();
      dispatch(saveTopHeading(headingRes?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    handleNews();
    getNewsRecentData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div
            className={styles.header}
            style={{
              backgroundImage: `url(${
                newsDetails?.coverImage
                  ? newsDetails?.coverImage
                  : newsDetails?.temImg
              })`,
            }}
          >
            <div className={styles.imgOver}></div>
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.paraWrap}>
              <h1>{newsDetails?.detail?.Title}</h1>
              <p>
                <div className={styles.borderWrapper} />
                {newsDetails?.detail?.OriginalSource}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: newsDetails?.detail?.Content,
                }}
              />
              <div className={styles.linkWrapper}>
                <p>Courtesy:</p>
                <a href={newsDetails?.detail?.Url} target="_blank">
                  {newsDetails?.detail?.Source}
                </a>
              </div>
            </div>
            {topHeading?.length != 0 && (
              <div className={styles.latestNewsWrap}>
                {/* <h1>Latest News</h1> */}
                <label>
                  LATEST <span>News</span>
                </label>
                {topHeading?.slice(-3)?.map((item: any, index: number) => (
                  <div
                    className={styles.card}
                    key={index}
                    onClick={() => {
                      dispatch(saveNewsDetails(item));
                      location.push({
                        pathname: `/news/${item?.slug}`,
                      });
                    }}
                  >
                    <div className={styles.topWrapper}>
                      {" "}
                      <img
                        src={item?.coverImage ? item?.coverImage : item?.temImg}
                        alt=""
                      />
                      <div className={styles.heading}>
                        {item?.detail?.Title}
                      </div>
                    </div>

                    <div className={styles.textWrapper}>
                      <div className={styles.leftWrapper}>
                        {item?.detail?.Team}
                      </div>
                      <div className={styles.rightWrapper}>
                        {moment(item?.createdAt).format("MMM Do YY")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsInfo;
